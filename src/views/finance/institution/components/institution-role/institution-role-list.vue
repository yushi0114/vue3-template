<template>
    <div class="search-box">
        <el-input size="large" class="search-input" placeholder="请输入关键字进行搜索" @clear="handleClear" clearable
                  v-model="roleFilterObject.searchInput">
            <template #append>
                <el-button @click="handleSearchRoleList">
                    <template #icon>
                        <Icon :name="'ep:search'"></Icon>
                    </template>
                </el-button>
            </template>
        </el-input>
        <el-button type="primary" @click="handleCreateNewRole">
            <template #icon>
                <Icon :name="'ep:plus'"></Icon>
            </template>
            新建
        </el-button>
    </div>
    <CommonTable
        :data="roleList.list"
        @sort-change="handleSortChange"
        :default-sort="{ prop: 'updateTime', order: 'descending' }"
    >
        <el-table-column prop="name" label="名称"/>
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
        class="margin-20-20"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="roleFilterObject.currentPage"
        :total="roleList.total" />
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import type { RoleListItemType } from '@/types/system-manage/role-list.type';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
    deleteRole,
    getRolePageList,
    goCreateFormView, goEditFormView,
    resetRoleFilterObject,
    roleFilterObject,
    roleList
} from './institution-role';
import { LoadingService } from '@/views/system/loading-service';
import { currentInstitutionId } from '@/views/finance/institution/components/finance-institution';
import { ItemOperate } from '@/components';

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'update_time' | 'create_time', order: string }) {
    LoadingService.getInstance().loading();
    roleFilterObject.value.currentPage = 0;
    roleFilterObject.value.currentSize = 10;
    roleFilterObject.value.sortField = params.prop;
    roleFilterObject.value.sortType = formatSortType(params.order);
    await getRolePageList(currentInstitutionId.value);
    LoadingService.getInstance().stop();
}

async function handleSearchRoleList() {
    LoadingService.getInstance().loading();
    roleFilterObject.value.currentPage = 0;
    roleFilterObject.value.currentSize = 10;
    await getRolePageList(currentInstitutionId.value);
    LoadingService.getInstance().stop();
}

async function handleClear() {
    LoadingService.getInstance().loading();
    resetRoleFilterObject();
    await getRolePageList(currentInstitutionId.value);
    LoadingService.getInstance().stop();
}

async function handleCreateNewRole() {
    LoadingService.getInstance().loading();
    await goCreateFormView();
    LoadingService.getInstance().stop();
}

async function handleEditRoleItem(item: RoleListItemType) {
    LoadingService.getInstance().loading();
    await goEditFormView(item);
    LoadingService.getInstance().stop();
}

async function handleCurrentChange(item: number) {
    roleFilterObject.value.currentPage = item;
    LoadingService.getInstance().loading();
    await getRolePageList(currentInstitutionId.value);
    LoadingService.getInstance().stop();
}

async function handleSizeChange(item: number) {
    roleFilterObject.value.currentSize = item;
    LoadingService.getInstance().loading();
    await getRolePageList(currentInstitutionId.value);
    LoadingService.getInstance().stop();
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
            LoadingService.getInstance().loading();
            await getRolePageList(currentInstitutionId.value);
            LoadingService.getInstance().stop();
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
</style>
