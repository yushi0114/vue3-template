<template>
    <div class="search-box">
        <el-input class="search-input"
                  size="large"
                  placeholder="请输入关键字进行搜索"
                  @clear="handleClear"
                  @keyup.enter="handleSearchRoleList"
                  clearable
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
    </CommonTable>
    <CommonPagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="roleFilterObject.currentPage"
        :total="roleList.total"/>
    <role-detail
        :drawer-visible="isDrawerShow"
        :data-detail="dataDetail"
        @close="handleDrawerClose"></role-detail>
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
    resetRoleFilterObject,
    resetRoleForm,
    roleFilterObject,
    roleForm,
    roleList
} from './role-list';
import { getRoleMenuIdsApi } from '@/api/system-manage';
import { LoadingService } from '@/views/system/loading-service';
import type { FinanceCategoryListItemType } from '@/types/finance';
import RoleDetail from '@/views/system/role/components/role-detail.vue';

const dataDetail = ref<RoleListItemType>();
const isDrawerShow = ref<boolean>(false);


function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'updateTime' | 'createTime', order: string }) {
    console.log(params);
    LoadingService.getInstance().loading();
    roleFilterObject.value.currentPage = 1;
    roleFilterObject.value.currentSize = 10;
    roleFilterObject.value.sortField = params.prop;
    roleFilterObject.value.sortType = formatSortType(params.order);
    await getRolePageList({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
}

async function handleSearchRoleList() {
    LoadingService.getInstance().loading();
    roleFilterObject.value.currentPage = 1;
    roleFilterObject.value.currentSize = 10;
    await getRolePageList({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
}

async function handleClear() {
    LoadingService.getInstance().loading();
    resetRoleFilterObject();
    await getRolePageList({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
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
    LoadingService.getInstance().loading();
    await getRolePageList({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
}

async function handleSizeChange(item: number) {
    roleFilterObject.value.currentSize = item;
    LoadingService.getInstance().loading();
    await getRolePageList({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
}

async function handleCreateNewRole() {
    mode.value = 'form';
    formType.value = 'create';
    resetRoleForm();
    LoadingService.getInstance().loading();
    await getTreeData();
    LoadingService.getInstance().stop();
}

async function handleToDetail(item: FinanceCategoryListItemType) {
    LoadingService.getInstance().loading();
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
    LoadingService.getInstance().stop();
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
    padding-bottom: 20px;

    .search-input {
        max-width: 350px;
    }
}
</style>
