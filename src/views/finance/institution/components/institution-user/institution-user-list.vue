<template>
    <div class="search-box">
        <el-input
            size="large"
            class="search-input"
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
        <el-button type="primary" @click="handleCreateNewItem">
            <template #icon>
                <Icon :name="'ep:plus'"></Icon>
            </template>
            新建
        </el-button>
    </div>
    <CommonTable :data="listData.list"
              @sort-change="handleSortChange"
              :default-sort="{ prop: 'updateTime', order: 'descending' }"
    >
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="account" label="手机号"/>
        <el-table-column prop="roleName" label="角色"></el-table-column>
        <el-table-column prop="createTime" sortable label="创建时间"/>
        <el-table-column prop="updateTime" sortable label="更新时间"/>
        <el-table-column prop="createBy" label="创建人"/>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filterObject.currentPage"
        :total="listData.total" />
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
    currentUserId,
    deleteUser,
    filterObject,
    form,
    formType,
    getRoleListData,
    getUserPageList,
    listData,
    mode,
    resetFilterObject,
    resetUserForm
} from './institution-user';
import type { UserListItemType } from '@/types/system-manage/user-list.type';
import { LoadingService } from '@/views/system/loading-service';
import { currentInstitutionId } from '@/views/finance/institution/components/finance-institution';
import { ItemOperate } from '@/components';

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'update_time' | 'create_time', order: string }) {
    LoadingService.getInstance().loading();
    filterObject.value.currentPage = 0;
    filterObject.value.currentSize = 10;
    filterObject.value.sortField = params.prop;
    filterObject.value.sortType = formatSortType(params.order);
    await getUserPageList(currentInstitutionId.value);
    LoadingService.getInstance().stop();
}

async function handleSearchList() {
    LoadingService.getInstance().loading();
    filterObject.value.currentPage = 0;
    filterObject.value.currentSize = 10;
    await getUserPageList(currentInstitutionId.value);
    LoadingService.getInstance().stop();
}

async function handleClear() {
    LoadingService.getInstance().loading();
    resetFilterObject();
    await getUserPageList(currentInstitutionId.value);
    LoadingService.getInstance().stop();
}

async function handleEditItem(item: UserListItemType) {
    LoadingService.getInstance().loading();
    mode.value = 'form';
    formType.value = 'edit';
    form.value.roleId = item.roleId;
    form.value.account = item.account;
    form.value.name = item.name;
    form.value.status = item.status === 1;
    currentUserId.value = item.id;
    await getRoleListData();
    LoadingService.getInstance().stop();
}

async function handleCreateNewItem() {
    mode.value = 'form';
    formType.value = 'create';
    currentUserId.value = '';
    resetUserForm();
    LoadingService.getInstance().loading();
    await getRoleListData();
    LoadingService.getInstance().stop();
}

async function handleCurrentChange(item: number) {
    filterObject.value.currentPage = item;
    LoadingService.getInstance().loading();
    await getUserPageList(currentInstitutionId.value);
    LoadingService.getInstance().stop();
}

async function handleSizeChange(item: number) {
    filterObject.value.currentSize = item;
    LoadingService.getInstance().loading();
    await getUserPageList(currentInstitutionId.value);
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
            await getUserPageList(currentInstitutionId.value);
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
    padding: 10px 0;

    .search-input {
        max-width: 350px;
    }
}

.page-content {
    display: flex;
    justify-content: right;
    padding-top: 10px;
}
</style>
