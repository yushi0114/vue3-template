<template>
    <Board full>
        <ListQueryControl
            v-model="filterObject"
            :filterRowVisible="false"
            :searchConfig="{
                label: '请输入机构名称进行查询',
                field: 'searchInput',
            }">
            <template v-slot:search-rest>
                <el-button type="primary" :icon="Plus" @click="showDialog">新建</el-button>
            </template>
        </ListQueryControl>
        <LoadingBoard :loading="loading" :empty="!listData.list.length">
            <CommonTable
                :data="listData.list"
                @sort-change="handleSortChange"
                :default-sort="{ prop: 'updateTime', order: 'descending' }"
            >
                <el-table-column prop="orgName" label="所属机构"/>
                <el-table-column label="分类">
                    <template #default>
                        <el-tag type="success">银行</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="LOGO">
                    <template #default="scope">
                        <el-image :src="scope.row.logoContent" style="height: 40px"></el-image>
                    </template>
                </el-table-column>
                <TableOperatorColumn
                    width="120"
                    @[ItemOperate.edit]="(scope: any) => handleEditItem(scope.row)"
                    @[ItemOperate.delete]="(scope: any) => handleRemoveItem(scope.row)"
                    :operators="[
                        { name: '编辑', value: ItemOperate.edit, icon: 'ep-edit-pen' },
                        { name: '删除', value: ItemOperate.delete, icon: 'ep-delete' },
                    ]">
                </TableOperatorColumn>
            </CommonTable>
            <CommonPagination
                v-model:current-page="filterObject.currentPage"
                v-model:page-size="filterObject.currentSize"
                :total="listData.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </CommonPagination>
        </LoadingBoard>
    </Board>
    <logo-form-modal
        v-if="isDialogShow"
        v-model="isDialogShow"
        :currentLogo="currentLogo"
        :type="dialogType"
        @close="handleDialogClose"
    ></logo-form-modal>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue';
import { LoadingService } from '@/views/system/loading-service';
import { filterObject, getPageList, listData, resetFilterObject, loading } from './finance-logo';
import LogoFormModal from '@/views/finance/logo/components/logo-form-modal.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { deleteLogoApi } from '@/api/finance/finance-logo';
import { ItemOperate } from '@/components';

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

async function handleDialogClose(update: boolean) {
    isDialogShow.value = false;
    if (update) {
        await handleClear();
    }
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
        `确定删除“${params.orgName}”的机构LOGO吗？`,
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
    filterObject.value.currentPage = 1;
    filterObject.value.currentSize = 10;
    filterObject.value.sortField = params.prop;
    filterObject.value.sortType = formatSortType(params.order);
    await getPageList();
}

async function handleSearchList() {
    filterObject.value.currentPage = 1;
    await getPageList();
}

async function handleClear() {
    resetFilterObject();
    await getPageList();
}


async function handleCurrentChange(item: number) {
    filterObject.value.currentPage = item;
    await getPageList();
}

async function handleSizeChange(item: number) {
    filterObject.value.currentPage = 1;
    filterObject.value.currentSize = item;
    await getPageList();
}

watch(() => filterObject.value.searchInput, handleSearchList);

onMounted(() => {
    getPageList();
    resetFilterObject();
});
</script>

<style scoped lang="scss">
.search-box {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;

    .search-input {
        width: 350px;
    }
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
