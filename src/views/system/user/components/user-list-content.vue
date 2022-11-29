<template>
    <div class="search-box">
        <el-input
            class="search-input"
            placeholder="请输入搜索内容"
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
        <el-table-column prop="name" label="姓名" width="180"/>
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
    <div class="page-content">
        <el-pagination
            class="margin-20-20"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="userFilterObject.currentPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userTableData.total">
        </el-pagination>
    </div>
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
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
import type { UserListItemType } from '@/views/system/type/user-list.type';
import { LoadingService } from '@/views/system/loading-service';

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

.page-content {
    display: flex;
    justify-content: right;
    padding-top: 10px;
}
</style>
