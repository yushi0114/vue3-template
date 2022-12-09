<template>
    <ListQueryControl
        v-model="financeFilterObject"
        :filterRowVisible="false"
        :searchConfig="{
            label: '请输入关键字进行查询',
            field: 'searchInput',
        }">
        <template v-slot:search-rest>
            <el-button type="primary" @click="handleCreateNewRole">
                <template #icon>
                    <Icon :name="'ep:plus'"></Icon>
                </template>
                新建
            </el-button>
        </template>
    </ListQueryControl>
    <LoadingBoard :loading="loading" :empty="!categoryList.list">
        <el-table
            :data="categoryList.list"
            style="width: 100%"
            @sort-change="handleSortChange"
            :default-sort="{ prop: 'updateTime', order: 'descending' }"
            :header-cell-style="{
                        color: '#595959',
                        'background-color': '#f3f4f8'
                    }">
            <el-table-column prop="name" label="名称" width="180"/>
            <el-table-column prop="desc" label="描述" width="180"/>
            <el-table-column prop="sort" label="排序" width="180"/>
            <el-table-column prop="createBy" label="创建者" width="180"/>
            <el-table-column prop="createTime" sortable label="创建时间"/>
            <el-table-column prop="updateTime" sortable label="更新时间"/>
            <el-table-column label="操作" width="180">
                <template #default="scope">
                    <el-button
                        type="primary"
                        size="small"
                        @click.prevent="handleEditRoleItem(scope.row)"
                    >
                        <template #icon>
                            <Icon :name="'ep:edit'"></Icon>
                        </template>
                    </el-button>
                    <el-button
                        type="danger"
                        size="small"
                        @click.prevent="handleRemoveRoleItem(scope.row)"
                    >
                        <template #icon>
                            <Icon :name="'ep:delete'"></Icon>
                        </template>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </LoadingBoard>
    <CommonPagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="financeFilterObject.currentPage"
        :total="categoryList.total" />
</template>

<script lang="ts" setup>
import type { RoleListItemType } from '@/types/system-manage/role-list.type';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
    categoryList,
    financeFilterObject,
    deleteFinanceCategory,
    goCreateFormView,
    goEditFormView,
    setFinanceCategoryList,
    loading
} from './category-list';
import type { FinanceCategoryListItemType } from '@/types/finance';

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

async function handleCreateNewRole() {
    await goCreateFormView();
}

function handleRemoveRoleItem(item: RoleListItemType) {
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
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            });
        });
}

watch(() => financeFilterObject.searchInput, handleSearchList);
onMounted(setFinanceCategoryList);
</script>

<style scoped lang="scss">
</style>
