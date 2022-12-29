<template>
    <ListQueryControl
        v-model="roleFilterObject"
        :filter-row-visible="false"
        :searchConfig="{
            label: '请输入角色名称、角色描述进行查询',
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
        <el-table-column label="名称">
            <template #default="scope">
                <TextHoverable underline size="sm" @click="handleToDetail(scope.row)">
                    {{ scope.row.name }}
                </TextHoverable>
            </template>
        </el-table-column>
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
    <role-detail
        :model-value="isDrawerShow"
        :data-detail="dataDetail"
        @close="handleDrawerClose"></role-detail>
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import type { RoleListItemType } from '@/types/system-manage';
import { ElMessageBox } from 'element-plus';
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
import type { FinanceCategoryListItemType } from '@/types/finance';
import RoleDetail from '@/views/system/role/components/role-detail.vue';
import { ItemOperate } from '@/components';

const dataDetail = ref<RoleListItemType & { menuIdArr: string[] }>();
const isDrawerShow = ref<boolean>(false);


function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'updateTime' | 'createTime', order: string }) {
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

async function handleToDetail(item: FinanceCategoryListItemType) {
    await getTreeData();
    const menuList = await getRoleMenuIdsApi({
        tab: activeName.value,
        roleId: item.id
    });
    dataDetail.value = {
        ...item,
        menuIdArr: menuList
    };
    isDrawerShow.value = true;
}

function handleDrawerClose() {
    isDrawerShow.value = false;
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
        .catch(() => {});
}

watch(() => roleFilterObject.value.searchInput, handleSearchRoleList);
</script>

<style scoped lang="scss">

</style>
