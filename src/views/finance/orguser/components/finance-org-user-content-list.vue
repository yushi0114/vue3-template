<template>
    <div class="search-box">
        <el-input
            class="search-input"
            size="large"
            placeholder="请输入关键字进行搜索"
            @clear="handleClear"
            clearable
            @keyup.enter="handleSearchList"
            v-model="filterObject.searchInput">
            <template #append>
                <el-button @click="handleSearchList">
                    <template #icon>
                        <Icon :name="'ep:search'"></Icon>
                    </template>
                </el-button>
            </template>
        </el-input>
        <el-button type="danger" :disabled="isDeleteEnabled" @click="handleDeleteItems">
            <template #icon>
                <Icon :name="'ep:delete'"></Icon>
            </template>
            批量删除
        </el-button>
    </div>
    <el-table
        :data="listData.list" style="width: 100%"
        @sort-change="handleSortChange"
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'updateTime', order: 'descending' }"
        :header-cell-style="{
            color: '#595959',
            'background-color': '#f3f4f8'
        }">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column prop="orgName" label="所属机构" width="260"/>
        <el-table-column prop="account" label="手机号码"/>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column label="状态" align="center">
            <template #default="scope">
                <el-switch
                    v-model="scope.row.status"
                    :active-value="1"
                    :inactive-value="0"
                    disabled
                ></el-switch>
            </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建人"/>
        <el-table-column prop="createTime" sortable label="创建时间"/>
        <el-table-column prop="updateTime" sortable label="更新时间"/>
        <el-table-column>
            <template #header>
                <span class="header-options">操作</span>
            </template>
            <template #default="scope">
                <el-button
                    text
                    @click="handleDeleteItem(scope.row)">
                    <template #icon>
                        <Icon :name="'ep:delete'"></Icon>
                    </template>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <CommonPagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filterObject.currentPage"
        :total="listData.total"/>
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import { LoadingService } from '@/views/system/loading-service';
import { deleteItems, filterObject, getPageList, listData, resetFilterObject } from './finance-org-user';
import type { FinanceOrgUserListItemType } from '@/types/finance';
import { ElMessage, ElMessageBox } from 'element-plus';

const isDeleteEnabled = ref<boolean>(true);
const willDeleteList = ref<string[]>([]);

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'create_ime', order: string }) {
    LoadingService.getInstance().loading();
    filterObject.value.currentPage = 0;
    filterObject.value.currentSize = 10;
    filterObject.value.sortField = 'create_time';
    filterObject.value.sortType = formatSortType(params.order);
    await getPageList();
    LoadingService.getInstance().stop();
}

async function handleSearchList() {
    LoadingService.getInstance().loading();
    filterObject.value.currentPage = 0;
    filterObject.value.currentSize = 10;
    await getPageList();
    LoadingService.getInstance().stop();
}

async function handleClear() {
    LoadingService.getInstance().loading();
    resetFilterObject();
    await getPageList();
    LoadingService.getInstance().stop();
}


async function handleCurrentChange(item: number) {
    filterObject.value.currentPage = item;
    LoadingService.getInstance().loading();
    await getPageList();
    LoadingService.getInstance().stop();
}

async function handleSizeChange(item: number) {
    filterObject.value.currentSize = item;
    LoadingService.getInstance().loading();
    await getPageList();
    LoadingService.getInstance().stop();
}

async function handleSelectionChange(list: FinanceOrgUserListItemType[]) {
    isDeleteEnabled.value = false;
    willDeleteList.value = list.map(item => item.id);
    if (list.length === 0) {
        isDeleteEnabled.value = true;
    }
}

async function handleDeleteItems() {
    ElMessageBox.confirm(
        '确定要删除选中的机构用户吗？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            LoadingService.getInstance().loading();
            await deleteItems(willDeleteList.value);
            await getPageList();
            LoadingService.getInstance().stop();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            });
        });
}

async function handleDeleteItem(item: FinanceOrgUserListItemType) {
    ElMessageBox.confirm(
        '确定要删除当前机构用户吗？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            LoadingService.getInstance().loading();
            await deleteItems([item.id]);
            await getPageList();
            LoadingService.getInstance().stop();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            });
        });
}

</script>

<style scoped lang="scss">
.search-box {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    align-items: center;

    .search-input {
        max-width: 350px;
    }
}

.page-content {
    display: flex;
    justify-content: right;
    padding-top: 10px;
}
</style>
