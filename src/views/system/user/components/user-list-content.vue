<template>
    <div class="search-box">
        <el-input
            class="search-input"
            size="large"
            placeholder="请输入关键字进行搜索"
            @clear="handleClear"
            clearable
            @keyup.enter="handleSearchList"
            v-model="userFilterObject.searchInput">
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
    <el-table :data="userTableData.list" style="width: 100%"
              @sort-change="handleSortChange"
              :default-sort="{ prop: 'updateTime', order: 'descending' }"
              :header-cell-style="{
                    color: '#595959',
                    'background-color': '#f3f4f8'
                }">
        <el-table-column label="姓名">
            <template #default="scope">
                <TextHoverable underline size="sm" @click="handleToDetail(scope.row)">{{
                        scope.row.name
                    }}
                </TextHoverable>
            </template>
        </el-table-column>
        <el-table-column prop="account" label="手机号" width="180"/>
        <el-table-column prop="roleName" label="角色" width="180"></el-table-column>
        <el-table-column prop="createTime" sortable label="创建时间"/>
        <el-table-column prop="updateTime" sortable label="更新时间"/>
        <el-table-column prop="createBy" label="创建人"/>
        <el-table-column label="操作" width="180">
            <template #default="scope">
                <el-button
                    type="primary"
                    size="small"
                    @click.prevent="handleEditItem(scope.row)"
                >
                    <template #icon>
                        <Icon :name="'ep:edit'"></Icon>
                    </template>
                </el-button>
                <el-button
                    type="danger"
                    size="small"
                    @click.prevent="handleRemoveItem(scope.row
            )"
                >
                    <template #icon>
                        <Icon :name="'ep:delete'"></Icon>
                    </template>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <CommonPagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userFilterObject.currentPage"
        :total="userTableData.total"/>
    <user-detail
        :drawer-visible="isDrawerShow"
        :data-detail="dataDetail"
        @close="handleDrawerClose"></user-detail>
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
    activeName,
    currentUserId,
    deleteUser,
    form,
    formType,
    getUserListData,
    mode,
    resetUserFilterObject,
    resetUserForm,
    userFilterObject,
    userTableData
} from '@/views/system/user/components/user-list';
import type { UserListItemType } from '@/types/system-manage';
import { LoadingService } from '@/views/system/loading-service';
import UserDetail from '@/views/system/user/components/user-detail.vue';

const dataDetail = ref<UserListItemType>();
const isDrawerShow = ref<boolean>(false);


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
        .then(async () => {
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

function handleToDetail(item: UserListItemType) {
    dataDetail.value = item;
    isDrawerShow.value = true;
}

function handleDrawerClose() {
    isDrawerShow.value = false;
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
