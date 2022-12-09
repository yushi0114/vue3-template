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
        :default-sort="{ prop: 'createTime', order: 'descending' }"
        :header-cell-style="{
                    color: '#595959',
                    'background-color': '#f3f4f8'
                }">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column prop="orgName" label="机构名称"/>
        <el-table-column prop="inquiry" label="查询账号"/>
        <el-table-column prop="corpName" label="企业名称"/>
        <el-table-column prop="corpCode" label="统一信用代码"/>
        <el-table-column prop="createTime" sortable label="查询时间"/>
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
import { deleteItems, filterObject, getPageList, listData, resetFilterObject } from './finance-report';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FinanceReportListItemType } from '@/types/finance';

const isDeleteEnabled = ref<boolean>(true);
const willDeleteList = ref<string[]>([]);


function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'createTime', order: string }) {
    console.log(params);
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


async function handleSelectionChange(list: FinanceReportListItemType[]) {
    isDeleteEnabled.value = false;
    willDeleteList.value = list.map(item => item.id);
    if (list.length === 0) {
        isDeleteEnabled.value = true;
    }
}

async function handleDeleteItems() {
    ElMessageBox.confirm(
        '确定要删除选中的查询记录吗？',
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

async function handleDeleteItem(item: FinanceReportListItemType) {
    ElMessageBox.confirm(
        '确定要删除当前查询记录吗？',
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
    align-items: center;
    padding-bottom: 20px;

    .search-input {
        max-width: 350px;
    }
}
</style>
