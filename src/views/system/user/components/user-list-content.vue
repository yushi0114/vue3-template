<template>
    <ListQueryControl
        v-model="userFilterObject"
        :filter-row-visible="false"
        :searchConfig="{
            label: '请输入关键字进行查询',
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
        <el-table :data="userTableData.list" style="width: 100%"
              @sort-change="handleSortChange"
              :default-sort="{ prop: 'updateTime', order: 'descending' }"
              :header-cell-style="{
                    color: '#595959',
                    'background-color': '#f3f4f8'
                }">
            <el-table-column prop="name" label="姓名" width="180"/>
            <el-table-column prop="account" label="手机号" width="180"/>
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
        </el-table>
    </LoadingBoard>
    <CommonPagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userFilterObject.currentPage"
        :total="userTableData.total" />
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
    loading,
    activeName,
    currentUserId, deleteUser,
    formType,
    getUserListData,
    mode,
    resetUserFilterObject, resetUserForm,
    userFilterObject,
    form,
    userTableData
} from '@/views/system/user/components/user-list';
import type { UserListItemType } from '@/types/system-manage';
import { LoadingService } from '@/views/system/loading-service';
import { ItemOperate } from '@/components';

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'updateTime' | 'createTime', order: string }) {
    console.log(params);
    LoadingService.getInstance().loading();
    userFilterObject.value.currentPage = 0;
    userFilterObject.value.currentSize = 10;
    userFilterObject.value.sortField = params.prop;
    userFilterObject.value.sortType = formatSortType(params.order);
    await getUserListData({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
}

async function handleSearchList() {
    LoadingService.getInstance().loading();
    userFilterObject.value.currentPage = 0;
    userFilterObject.value.currentSize = 10;
    await getUserListData({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
}

async function handleClear() {
    LoadingService.getInstance().loading();
    resetUserFilterObject();
    await getUserListData({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
}

function handleEditItem(item: UserListItemType) {
    mode.value = 'form';
    form.value.roleId = item.roleId;
    form.value.account = item.account;
    form.value.name = item.name;
    form.value.status = item.status === 1;
    currentUserId.value = item.id;
}

async function handleCreateNewItem() {
    mode.value = 'form';
    formType.value = 'create';
    currentUserId.value = '';
    resetUserForm();
}

async function handleCurrentChange(item: number) {
    userFilterObject.value.currentPage = item;
    LoadingService.getInstance().loading();
    await getUserListData({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
}

async function handleSizeChange(item: number) {
    userFilterObject.value.currentSize = item;
    LoadingService.getInstance().loading();
    await getUserListData({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
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
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            });
        });
}

watch(() => userFilterObject.value.searchInput, handleSearchList);
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
