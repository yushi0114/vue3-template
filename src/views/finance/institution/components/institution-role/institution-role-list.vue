<template>
    <div class="search-box">
        <el-input class="search-input" placeholder="请输入搜索内容" @clear="handleClear" clearable
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
    <el-table
        :data="roleList.list" style="width: 100%"
        @sort-change="handleSortChange"
        :default-sort="{ prop: 'updateTime', order: 'descending' }"
        :header-cell-style="{
            color: '#595959',
            'background-color': '#f3f4f8'
        }">
        <el-table-column prop="name" label="名称"/>
        <el-table-column prop="desc" label="描述" width="180"/>
        <el-table-column prop="createTime" sortable label="创建时间"/>
        <el-table-column prop="updateTime" sortable label="更新时间"/>
        <el-table-column prop="createBy" label="创建人"/>
        <el-table-column label="操作" width="180">
            <template #default="scope">
                <el-button
                    type="primary"
                    size="small"
                    @click.prevent="handleEditRoleItem(scope.row)">
                    <template #icon>
                        <Icon :name="'ep:edit'"></Icon>
                    </template>
                </el-button>
                <el-button
                    type="danger"
                    size="small"
                    @click.prevent="handleRemoveRoleItem(scope.row)">
                    <template #icon>
                        <Icon :name="'ep:delete'"></Icon>
                    </template>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <CommonPagination
        class="margin-20-20"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="roleFilterObject.currentPage"
        :total="roleList.total" />
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import type { RoleListItemType } from '@/views/system/type/role-list.type';
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
        .then(async () => {
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
    padding: 10px 0;

    .search-input {
        max-width: 220px;
    }
}
</style>
