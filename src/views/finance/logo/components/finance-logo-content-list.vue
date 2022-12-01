<template>
    <div class="search-box">
        <el-input
            class="search-input"
            placeholder="请输入搜索内容"
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
        <el-button @click="showDialog" type="primary">
            <template #icon>
                <Icon :name="'ep:plus'"></Icon>
            </template>
            新建
        </el-button>
    </div>
    <el-table
        :data="listData.list" style="width: 100%"
        @sort-change="handleSortChange"
        :default-sort="{ prop: 'updateTime', order: 'descending' }"
        :header-cell-style="{
                    color: '#595959',
                    'background-color': '#f3f4f8'
                }">
        <el-table-column prop="orgName" label="所属机构"/>
        <el-table-column label="分类">
            <template #default>
                <el-tag type="success">银行</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="logo">
            <template #default="scope">
                <el-image :src="scope.row.logoContent" style="height: 40px"></el-image>
            </template>
        </el-table-column>
        <el-table-column>
            <template #header>
                <span class="header-options">操作</span>
            </template>
            <template #default="scope">
                <el-button
                    text
                    @click.prevent="handleEditItem(scope.row)"
                >
                    <template #icon>
                        <Icon :name="'ep:edit'"></Icon>
                    </template>
                </el-button>
                <el-button
                    text
                    @click.prevent="handleRemoveItem(scope.row)">
                    <template #icon>
                        <Icon :name="'ep:delete'"></Icon>
                    </template>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="page-content">
        <el-pagination
            class="margin-20-20"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="filterObject.currentPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listData.total">
        </el-pagination>
    </div>
    <logo-form-modal
        v-if="isDialogShow"
        :dialog-visible="isDialogShow"
        :currentLogo="currentLogo"
        :type="dialogType"
        @close="handleDialogClose"
    ></logo-form-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Icon from '@/components/Icon.vue';
import { LoadingService } from '@/views/system/loading-service';
import { filterObject, getPageList, listData, resetFilterObject } from './finance-logo';
import LogoFormModal from '@/views/finance/logo/components/logo-form-modal.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { deleteLogoApi } from '@/api/finance/finance-logo';

const isDialogShow = ref<boolean>(false);
const dialogType = ref<'create' | 'edit'>('create');
const currentLogo = ref<{
    logoContent: string;
    orgId: string;
    orgName: string;
    orgLogoId: string;
    sort: number;
}>();

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

function showDialog() {
    dialogType.value = 'create';
    isDialogShow.value = true;
    currentLogo.value = undefined;
}

async function handleDialogClose() {
    isDialogShow.value = false;
    await handleClear();
}

function handleEditItem(params: {
    logoContent: string;
    orgId: string;
    orgName: string;
    orgLogoId: string;
    sort: number;
}) {
    dialogType.value = 'edit';
    isDialogShow.value = true;
    currentLogo.value = params;
}

function handleRemoveItem(params: {
    logoContent: string;
    orgId: string;
    orgName: string;
    orgLogoId: string;
    sort: number;
}) {
    ElMessageBox.confirm(
        '确定要删除当前logo吗？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async() => {
            await deleteLogoApi({
                id: params.orgLogoId,
                orgId: params.orgId
            });
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            LoadingService.getInstance().loading();
            await getPageList();
            LoadingService.getInstance().stop();
        })
        .catch(() => {});
}

async function handleSortChange(params: { prop: 'create_time', order: string }) {
    LoadingService.getInstance().loading();
    filterObject.value.currentPage = 1;
    filterObject.value.currentSize = 10;
    filterObject.value.sortField = params.prop;
    filterObject.value.sortType = formatSortType(params.order);
    await getPageList();
    LoadingService.getInstance().stop();
}

async function handleSearchList() {
    LoadingService.getInstance().loading();
    filterObject.value.currentPage = 1;
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

</script>

<style scoped lang="scss">
.search-box {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;

    .search-input {
        max-width: 220px;
    }
}

.page-content {
    display: flex;
    justify-content: right;
    padding-top: 10px;
}

.header-options {
    padding-left: 8px;
}

.el-table {
    :deep(.el-button) {
        padding: 8px;
    }

    :deep(.el-icon) {
        font-size: 16px;
    }

    :deep(.el-button + .el-button) {
        margin-left: 0;
    }
}
</style>
