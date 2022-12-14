<template>
    <ListQueryControl
        v-model="filterObject"
        :filterRowVisible="false"
        :searchConfig="{
            label: '请输入机构名称进行查询',
            field: 'searchInput',
        }">
        <template v-slot:search-rest>
            <el-button type="primary" :icon="Plus" @click="handleCreateNewItem">新建</el-button>
        </template>
    </ListQueryControl>
    <LoadingBoard :loading="loading" :empty="!listData.list.length">
        <CommonTable
            :data="listData.list"
            @sort-change="handleSortChange"
            :default-sort="{ prop: 'updateTime', order: 'descending' }"
        >
            <el-table-column prop="name" label="合作伙伴"/>
            <el-table-column prop="imgUrl" label="LOGO">
                <template #default="scope">
                    <el-image style="height: 40px;" :src="scope.row.imgUrl"></el-image>
                </template>
            </el-table-column>
            <TableOperatorColumn
                width="180"
                @[ItemOperate.edit]="(scope: any) => handleEditItem(scope.row)"
                @[ItemOperate.delete]="(scope: any) => handleRemoveItem(scope.row)"
                :operators="[
                    { name: '编辑', value: ItemOperate.edit, icon: 'ep-edit-pen' },
                    { name: '删除', value: ItemOperate.delete, icon: 'ep-delete' },
                ]">
            </TableOperatorColumn>
        </CommonTable>
    </LoadingBoard>
    <div class="page-content">
        <CommonPagination
            v-model:current-page="filterObject.currentPage"
            v-model:page-size="filterObject.currentSize"
            :total="listData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </CommonPagination>
    </div>
    <finance-partner-form-modal
        v-if="isDialogShow"
        :dialog-visible="isDialogShow"
        @close="handleDialogClose"></finance-partner-form-modal>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import {
    loading,
    activeName,
    currentId,
    fileList,
    filterObject,
    form,
    formType,
    getPageList,
    listData,
    remove,
    resetForm
} from '@/views/finance/partner/components/finance-partner';
import type { FinancePartnerListItemType } from '@/types/finance';
import { dataURLToFile } from '@/utils';
import { ItemOperate } from '@/components';
import FinancePartnerFormModal from '@/views/finance/partner/components/finance-partner-form-modal.vue';

const isDialogShow = ref<boolean>(false);
const dialogType = ref<'create' | 'edit'>('create');

function showDialog() {
    dialogType.value = 'create';
    isDialogShow.value = true;
}

async function handleDialogClose() {
    isDialogShow.value = false;
    await getPageList({
        tab: activeName.value
    });
}

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'updateTime' | 'createTime', order: string }) {
    filterObject.value.currentPage = 0;
    filterObject.value.currentSize = 10;
    filterObject.value.sortField = params.prop;
    filterObject.value.sortType = formatSortType(params.order);
    await getPageList({
        tab: activeName.value
    });
}

async function handleSearchList() {
    filterObject.value.currentPage = 1;
    await getPageList({
        tab: activeName.value
    });
}

function handleEditItem(item: FinancePartnerListItemType) {
    formType.value = 'edit';
    form.value.name = item.name;
    form.value.imgUrl = item.imgUrl;
    fileList.value = [
        {
            name: dataURLToFile(item.imgUrl).name,
            url: item.imgUrl
        }
    ];
    form.value.status = item.status === 1;
    currentId.value = item.id;
    showDialog();
}

async function handleCreateNewItem() {
    formType.value = 'create';
    currentId.value = '';
    resetForm();
    showDialog();
}

async function handleCurrentChange(item: number) {
    filterObject.value.currentPage = item;
    await getPageList({
        tab: activeName.value
    });
}

async function handleSizeChange(item: number) {
    filterObject.value.currentPage = 1;
    filterObject.value.currentSize = item;
    await getPageList({
        tab: activeName.value
    });
}

function handleRemoveItem(item: FinancePartnerListItemType) {
    ElMessageBox.confirm(
        `确定删除“${item.name}”的合作伙伴吗？`,
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async() => {
            await remove({
                id: item.id
            });
            await getPageList({
                tab: activeName.value
            });
        })
        .catch(() => {});
}

watch(() => filterObject.value.searchInput, handleSearchList);
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
    padding-left: 15px;
}
</style>
