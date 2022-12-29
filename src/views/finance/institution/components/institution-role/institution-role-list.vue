<template>
    <ListQueryControl
        v-model="roleFilterObject"
        :filterRowVisible="false"
        :searchConfig="{
            label: '请输入角色名称、角色描述进行搜索',
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
    <LoadingBoard :empty="roleList.list.length === 0" :loading="loading.listLoading">
        <CommonTable
            :data="roleList.list"
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
            <el-table-column prop="createTime" sortable label="创建时间"/>
            <el-table-column prop="updateTime" sortable label="更新时间"/>
            <el-table-column prop="createBy" label="创建人"/>
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
            v-if="roleList.list.length"
            class="margin-20-20"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="roleFilterObject.currentPage"
            :total="roleList.total"/>
    </LoadingBoard>
    <institution-role-detail
        :drawer-visible="isDrawerShow"
        :data-detail="dataDetail"
        @close="handleDrawerClose"></institution-role-detail>
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import type { RoleListItemType } from '@/types/system-manage/role-list.type';
import { ElMessageBox } from 'element-plus';
import {
    deleteRole,
    getOrgRoleMenuIds,
    getRolePageList,
    goCreateFormView,
    goEditFormView,
    roleFilterObject,
    roleList,
    getTreeData,
} from './institution-role';
import { loading } from '../finance-institution';
import { currentInstitutionId } from '@/views/finance/institution/components/finance-institution';
import { ItemOperate } from '@/components';
import InstitutionRoleDetail from '@/views/finance/institution/components/institution-role/institution-role-detail.vue';

const dataDetail = ref<RoleListItemType & { menuIdArr: string[] }>();
const isDrawerShow = ref<boolean>(false);

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'update_time' | 'create_time', order: string }) {
    loading.listLoading = true;
    roleFilterObject.value.currentPage = 1;
    roleFilterObject.value.currentSize = 10;
    roleFilterObject.value.sortField = params.prop;
    roleFilterObject.value.sortType = formatSortType(params.order);
    await getRolePageList(currentInstitutionId.value);
    loading.listLoading = false;
}

async function handleSearchRoleList() {
    loading.listLoading = true;
    roleFilterObject.value.currentPage = 1;
    roleFilterObject.value.currentSize = 10;
    await getRolePageList(currentInstitutionId.value);
    loading.listLoading = false;
}

async function handleCreateNewRole() {
    loading.listLoading = true;
    await goCreateFormView();
    loading.listLoading = false;
}

async function handleEditRoleItem(item: RoleListItemType) {
    loading.listLoading = true;
    await goEditFormView(item);
    loading.listLoading = false;
}

async function handleCurrentChange(item: number) {
    roleFilterObject.value.currentPage = item;
    loading.listLoading = true;
    await getRolePageList(currentInstitutionId.value);
    loading.listLoading = false;
}

async function handleSizeChange(item: number) {
    roleFilterObject.value.currentSize = item;
    loading.listLoading = true;
    await getRolePageList(currentInstitutionId.value);
    loading.listLoading = false;
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
            await deleteRole(item.id);
            loading.listLoading = true;
            await getRolePageList(currentInstitutionId.value);
            loading.listLoading = false;
        })
        .catch(() => {});
}


async function handleToDetail(item: RoleListItemType) {
    await getTreeData();
    const menuList = await getOrgRoleMenuIds(item.id);
    // if (!menuList?.length) {
    //     return;
    // }
    dataDetail.value = {
        ...item,
        menuIdArr: menuList!
    };
    isDrawerShow.value = true;
}

function handleDrawerClose() {
    isDrawerShow.value = false;
}

watch(() => roleFilterObject.value.searchInput, handleSearchRoleList);
onMounted(handleSearchRoleList);

</script>

<style scoped lang="scss">
</style>
