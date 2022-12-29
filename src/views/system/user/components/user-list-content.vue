<template>
    <ListQueryControl
        v-model="userFilterObject"
        :filter-row-visible="false"
        :searchConfig="{
            label: '请输入姓名、手机号进行查询',
            field: 'searchInput',
        }">

        <template #search-rest>
            <el-button type="primary" @click="handleCreateNewItem">
                <template #icon>
                    <Icon :name="'ep:plus'"></Icon>
                </template>
                新建
            </el-button>
        </template>
    </ListQueryControl>
    <LoadingBoard :loading="loading" :empty="!userTableData.list.length">
        <CommonTable :data="userTableData.list"
                     @sort-change="handleSortChange"
                     :default-sort="{ prop: 'updateTime', order: 'descending' }">
                <el-table-column label="手机号" width="180">
                    <template #default="scope">
                    <TextHoverable underline size="sm" @click="handleToDetail(scope.row)">{{
                            scope.row.account
                        }}
                    </TextHoverable>
                </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="roleName" label="角色" width="180"></el-table-column>
            <el-table-column prop="createTime" sortable label="创建时间"/>
            <el-table-column prop="updateTime" sortable label="更新时间"/>
            <el-table-column prop="createBy" label="创建人"/>
            <TableOperatorColumn
                width="180"
                @[ItemOperate.delete]="(scope: any) => handleRemoveItem(scope.row)"
                @[ItemOperate.edit]="(scope: any) => handleEditItem(scope.row)"
                :operators="[
                    { name: '编辑', value: ItemOperate.edit, icon: 'ep-edit-pen' },
                    { name: '删除', value: ItemOperate.delete, icon: 'ep-delete' },
                ]">
            </TableOperatorColumn>
        </CommonTable>
        <CommonPagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="userFilterObject.currentPage"
            :total="userTableData.total"/>
    </LoadingBoard>
    <user-detail
        v-model="isDrawerShow"
        :data-detail="dataDetail"
        :before-close="handleDrawerClose"></user-detail>
    <user-form-dialog
        v-model:dialog-visible="isDialogShow"
        @close="handleCloseDialog"></user-form-dialog>
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import { ElMessageBox } from 'element-plus';
import {
    activeName,
    currentUserId,
    deleteUser,
    form,
    formType,
    getUserListData, handleGoBack,
    loading,
    resetUserForm,
    userFilterObject,
    userTableData
} from '@/views/system/user/components/user-list';
import type { UserListItemType } from '@/types/system-manage';
import UserDetail from '@/views/system/user/components/user-detail.vue';
import { ItemOperate } from '@/components';
import UserFormDialog from '@/views/system/user/components/user-form-dialog.vue';

const dataDetail = ref<UserListItemType>();
const isDrawerShow = ref<boolean>(false);

const isDialogShow = ref<boolean>(false);

async function handleCloseDialog() {
    isDialogShow.value = false;
    await handleGoBack();
}

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'updateTime' | 'createTime', order: string }) {
    userFilterObject.value.currentPage = 0;
    userFilterObject.value.currentSize = 10;
    userFilterObject.value.sortField = params.prop;
    userFilterObject.value.sortType = formatSortType(params.order);
    await getUserListData({
        tab: activeName.value
    });
}

async function handleSearchList() {
    userFilterObject.value.currentPage = 0;
    userFilterObject.value.currentSize = 10;
    await getUserListData({
        tab: activeName.value
    });
}

function handleEditItem(item: UserListItemType) {
    isDialogShow.value = true;
    formType.value = 'edit';
    form.value.roleId = item.roleId;
    form.value.account = item.account;
    form.value.name = item.name;
    form.value.status = item.status === 1;
    currentUserId.value = item.id;
}

async function handleCreateNewItem() {
    isDialogShow.value = true;
    formType.value = 'create';
    currentUserId.value = '';
    resetUserForm();
}

async function handleCurrentChange(item: number) {
    userFilterObject.value.currentPage = item;
    await getUserListData({
        tab: activeName.value
    });
}

async function handleSizeChange(item: number) {
    userFilterObject.value.currentSize = item;
    await getUserListData({
        tab: activeName.value
    });
}

function handleRemoveItem(item: UserListItemType) {
    ElMessageBox.confirm(
        '确定要删除当前用户吗？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async() => {
            await deleteUser({
                account: item.account,
                id: item.id
            });
            await getUserListData({
                tab: activeName.value
            });
        })
        .catch(() => {});
}

function handleToDetail(item: UserListItemType) {
    dataDetail.value = item;
    isDrawerShow.value = true;
}

function handleDrawerClose() {
    isDrawerShow.value = false;
}

watch(() => userFilterObject.value.searchInput, handleSearchList);
</script>

