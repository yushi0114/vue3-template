<template>
    <ListQueryControl
        v-model="roleFilterObject"
        :filter-row-visible="false"
        :searchConfig="{
            label: '请输入关键字进行查询',
            field: 'searchInput',
        }">

        <template #search-rest>
            <el-button type="primary" @click="handleCreateNewRole">
                <template #icon>
                    <Icon :name="'ep:plus'"></Icon>
                </template>
                新建
            </el-button>
        </template>
    </ListQueryControl>
    <CommonTable
        :data="roleList.list"
        @sort-change="handleSortChange"
        :default-sort="{ prop: 'updateTime', order: 'descending' }"
    >
        <el-table-column prop="name" label="名称" width="180"/>
        <el-table-column prop="desc" label="描述" width="180"/>
        <el-table-column prop="createTime" sortable label="创建时间"/>
        <el-table-column prop="updateTime" sortable label="更新时间"/>
        <el-table-column prop="createBy" label="创建人"/>
        <TableOperatorColumn
            width="180"
            @[ItemOperate.delete]="(scope: any) => handleRemoveRoleItem(scope.row)"
            @[ItemOperate.edit]="(scope: any) => handleEditRoleItem(scope.row)"
            :operators="[
                { name: '编辑', value: ItemOperate.edit, icon: 'ep-edit-pen' },
                { name: '删除', value: ItemOperate.delete, icon: 'ep-delete' },
            ]">
        </TableOperatorColumn>
    </CommonTable>
    <CommonPagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="roleFilterObject.currentPage"
        :total="roleList.total"/>
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import type { RoleListItemType } from '@/types/system-manage';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
    activeName,
    currentRoleId,
    deleteRole,
    formType,
    getRolePageList,
    getTreeData,
    mode,
    resetRoleForm,
    roleFilterObject,
    roleForm,
    roleList
} from './role-list';
import { getRoleMenuIdsApi } from '@/api/system-manage';
import { LoadingService } from '@/views/system/loading-service';
import { ItemOperate } from '@/components';

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'updateTime' | 'createTime', order: string }) {
    console.log(params);
    roleFilterObject.value.currentPage = 1;
    roleFilterObject.value.currentSize = 10;
    roleFilterObject.value.sortField = params.prop;
    roleFilterObject.value.sortType = formatSortType(params.order);
    await getRolePageList({
        tab: activeName.value
    });
}

async function handleSearchRoleList() {
    roleFilterObject.value.currentPage = 1;
    roleFilterObject.value.currentSize = 10;
    await getRolePageList({
        tab: activeName.value
    });
}

async function handleEditRoleItem(item: RoleListItemType) {
    LoadingService.getInstance().loading();
    mode.value = 'form';
    formType.value = 'edit';
    currentRoleId.value = item.id;
    await getTreeData();
    const menuList = await getRoleMenuIdsApi({
        tab: activeName.value,
        roleId: item.id
    });
    roleForm.value = {
        name: item.name,
        desc: item.desc ?? '',
        menuIdArr: menuList as unknown as string[]
    };
    LoadingService.getInstance().stop();
}

async function handleCurrentChange(item: number) {
    roleFilterObject.value.currentPage = item;
    await getRolePageList({
        tab: activeName.value
    });
}

async function handleSizeChange(item: number) {
    roleFilterObject.value.currentSize = item;
    await getRolePageList({
        tab: activeName.value
    });
}

async function handleCreateNewRole() {
    mode.value = 'form';
    formType.value = 'create';
    resetRoleForm();
    await getTreeData();
}

function handleRemoveRoleItem(item: RoleListItemType) {
    ElMessageBox.confirm(
        '确定要删除当前角色吗？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async() => {
            await deleteRole({
                roleId: item.id,
                tab: activeName.value
            });
            await getRolePageList({
                tab: activeName.value
            });
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            });
        });
}

watch(() => roleFilterObject.value.searchInput, handleSearchRoleList);
</script>

<style scoped lang="scss">

</style>
