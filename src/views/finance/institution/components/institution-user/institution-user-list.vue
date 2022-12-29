<template>
    <ListQueryControl
        v-model="filterObject"
        :filterRowVisible="false"
        :searchConfig="{
            label: '请输入角色名称、角色描述进行搜索',
            field: 'searchInput',
        }">
        <template v-slot:search-rest>
            <el-button type="primary" @click="handleCreateNewItem">
                <template #icon>
                    <Icon :name="'ep:plus'"></Icon>
                </template>
                新建
            </el-button>
            <DownloadButton :api="exportUserExcel" :download-options="downloadOptions"></DownloadButton>
        </template>
    </ListQueryControl>
    <LoadingBoard :empty="listData.list.length === 0" :loading="loading.listLoading">
        <CommonTable :data="listData.list"
              @sort-change="handleSortChange"
              :default-sort="{ prop: 'updateTime', order: 'descending' }"
        >
            <el-table-column label="手机号">
                <template #default="scope">
                    <TextHoverable underline size="sm" @click="handleToDetail(scope.row)">{{
                            scope.row.account
                        }}
                    </TextHoverable>
                </template>
            </el-table-column>
            <el-table-column  prop="name" label="姓名">
            </el-table-column>
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
        v-if="listData.list.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filterObject.currentPage"
        :total="listData.total" />
    </LoadingBoard>
    <institution-user-detail
        :drawer-visible="isDrawerShow"
        :data-detail="dataDetail"
        @close="handleDrawerClose"></institution-user-detail>
</template>

<script lang="ts" setup>
import { exportUserExcel } from '@/api/finance/finance-institution';
import Icon from '@/components/Icon.vue';
import { ElMessageBox } from 'element-plus';
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
    resetUserForm,
    downloadOptions
} from './institution-user';
import { loading } from '../finance-institution';
import type { UserListItemType } from '@/types/system-manage/user-list.type';
import { currentInstitutionId } from '@/views/finance/institution/components/finance-institution';
import { ItemOperate } from '@/components';
import InstitutionUserDetail from '@/views/finance/institution/components/institution-user/institution-user-detail.vue';

const dataDetail = ref<UserListItemType>();
const isDrawerShow = ref<boolean>(false);

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'update_time' | 'create_time', order: string }) {
    loading.listLoading = true;
    filterObject.value.currentPage = 0;
    filterObject.value.currentSize = 10;
    filterObject.value.sortField = params.prop;
    filterObject.value.sortType = formatSortType(params.order);
    await getUserPageList(currentInstitutionId.value);
    loading.listLoading = false;
}

async function handleSearchList() {
    loading.listLoading = true;
    filterObject.value.currentPage = 0;
    filterObject.value.currentSize = 10;
    await getUserPageList(currentInstitutionId.value);
    loading.listLoading = false;
}

async function handleEditItem(item: UserListItemType) {
    loading.listLoading = true;
    mode.value = 'form';
    formType.value = 'edit';
    form.value.roleId = item.roleId;
    form.value.account = item.account;
    form.value.name = item.name;
    form.value.status = item.status === 1;
    currentUserId.value = item.id;
    await getRoleListData();
    loading.listLoading = false;
}

async function handleCreateNewItem() {
    mode.value = 'form';
    formType.value = 'create';
    currentUserId.value = '';
    resetUserForm();
    loading.listLoading = true;
    await getRoleListData();
    loading.listLoading = false;
}

async function handleCurrentChange(item: number) {
    filterObject.value.currentPage = item;
    loading.listLoading = true;
    await getUserPageList(currentInstitutionId.value);
    loading.listLoading = false;
}

async function handleSizeChange(item: number) {
    filterObject.value.currentSize = item;
    loading.listLoading = true;
    await getUserPageList(currentInstitutionId.value);
    loading.listLoading = false;
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
        .catch(() => {});
}

function handleToDetail(item: UserListItemType) {
    dataDetail.value = item;
    isDrawerShow.value = true;
}

function handleDrawerClose() {
    isDrawerShow.value = false;
}

watch(() => filterObject.value.searchInput, handleSearchList);


</script>

<style scoped lang="scss">

</style>
