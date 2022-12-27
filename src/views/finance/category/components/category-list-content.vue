<template>
    <ListQueryControl
        v-model="financeFilterObject"
        :filterRowVisible="false"
        :searchConfig="{
            label: '请输入关键字进行查询',
            field: 'searchInput',
        }">
        <template v-slot:search-rest>
            <el-button type="primary" @click="handleCreateNewItem">
                <template #icon>
                    <Icon :name="'ep:plus'"></Icon>
                </template>
                新建
            </el-button>
        </template>
    </ListQueryControl>
    <LoadingBoard :loading="loading" :empty="!categoryList.list">
        <CommonTable
            :data="categoryList.list"
            @sort-change="handleSortChange"
            :default-sort="{ prop: 'updateTime', order: 'descending' }"
        >
            <el-table-column label="名称">
                <template #default="scope">
                    <TextHoverable underline size="sm" @click="handleToDetail(scope.row)">{{
                            scope.row.name
                        }}
                    </TextHoverable>
                </template>
            </el-table-column>
            <el-table-column prop="desc" label="描述" width="180"/>
            <el-table-column prop="sort" label="排序" width="180"/>
            <el-table-column prop="createBy" label="创建者" width="180"/>
            <el-table-column prop="createTime" sortable label="创建时间"/>
            <el-table-column prop="updateTime" sortable label="更新时间"/>
            <TableOperatorColumn
                width="120"
                @[ItemOperate.edit]="(scope: any) => handleEditRoleItem(scope.row)"
                @[ItemOperate.delete]="(scope: any) => handleRemoveRoleItem(scope.row)"
                :operators="[
                    { name: '编辑', value: ItemOperate.edit, icon: 'ep-edit-pen' },
                    { name: '删除', value: ItemOperate.delete, icon: 'ep-delete' },
                ]">
            </TableOperatorColumn>
        </CommonTable>
        <CommonPagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="financeFilterObject.currentPage"
            :total="categoryList.total"/>
    </LoadingBoard>
    <category-detail
        :drawer-visible="isDrawerShow"
        :data-detail="dataDetail"
        @close="handleDrawerClose"></category-detail>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus';
import {
    categoryList,
    deleteFinanceCategory,
    financeFilterObject,
    goCreateFormView,
    goEditFormView,
    loading,
    setFinanceCategoryList
} from './category-list';
import type { FinanceCategoryListItemType } from '@/types/finance';
import CategoryDetail from '@/views/finance/category/components/category-detail.vue';
import { ItemOperate } from '@/components';

const dataDetail = ref<FinanceCategoryListItemType>();
const isDrawerShow = ref<boolean>(false);


function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleEditRoleItem(item: FinanceCategoryListItemType) {
    await goEditFormView(item);
}

async function handleSortChange(params: { prop: 'updateTime' | 'createTime', order: string }) {
    financeFilterObject.currentSize = 10;
    financeFilterObject.currentPage = 1;
    financeFilterObject.sortField = params.prop === 'updateTime' ? 'update_time' : 'create_time';
    financeFilterObject.sortType = formatSortType(params.order);
    await setFinanceCategoryList();
}

async function handleSearchList() {
    financeFilterObject.currentSize = 10;
    financeFilterObject.currentPage = 1;
    await setFinanceCategoryList();
}

async function handleCurrentChange(item: number) {
    financeFilterObject.currentPage = item;
    await setFinanceCategoryList();
}

async function handleSizeChange(item: number) {
    financeFilterObject.currentSize = item;
    await setFinanceCategoryList();
}

async function handleCreateNewItem() {
    await goCreateFormView();
}

function handleToDetail(item: FinanceCategoryListItemType) {
    dataDetail.value = item;
    isDrawerShow.value = true;
}

function handleDrawerClose() {
    isDrawerShow.value = false;
}

function handleRemoveRoleItem(item: FinanceCategoryListItemType) {
    ElMessageBox.confirm(
        '确定要删除当前机构分类吗？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async() => {
            await deleteFinanceCategory(item.id);
            await setFinanceCategoryList();
        })
        .catch(() => {});
}

watch(() => financeFilterObject.searchInput, handleSearchList);
onMounted(setFinanceCategoryList);
</script>

<style scoped lang="scss">
</style>
