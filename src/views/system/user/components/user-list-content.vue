<template>
  <div class="search-box">
    <el-input class="search-input" placeholder="请输入搜索内容" v-model="userFilterObject.searchInput">
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
    <el-button :icon="Plus" type="primary" @click="handleCreateNewRole">新建</el-button>
  </div>
  <el-table :data="userTableData.list" style="width: 100%">
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="account" label="手机号" width="180" />
    <el-table-column prop="roleName" label="角色" width="180">
      <template #default="scope">
        <el-tag
            :type="'success'"
            disable-transitions
        >{{ scope.row.roleName }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="createAt" label="创建时间" />
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button
            type="primary"
            size="small"
            @click.prevent="handleEditRoleItem(scope.row)"
        >
          编辑
        </el-button>
        <el-button
            type="danger"
            size="small"
            @click.prevent="handleRemoveRoleItem(scope.row
            )"
        >
          删除
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
import {ElMessage, ElMessageBox} from 'element-plus';
import {Search, Plus} from '@element-plus/icons-vue';
import {
    currentUserId,
    mode,
    userTableData,
    userFilterObject, userForm, activeName, formType
} from '@/views/system/user/components/user-list';
import type {UserListItemType} from '@/views/system/type/user-list.type';
import {deleteUser} from '@/api/system-manage';

function handleEditRoleItem(item: UserListItemType){
    mode.value = 'form';
    userForm.value.roleId = item.roleId;
    userForm.value.name = item.name;
    userForm.value.status = item.status === 1;
    currentUserId.value = item.id;
}

async function handleCreateNewRole(){
    mode.value = 'form';
    formType.value = 'create';
    currentUserId.value = '';
}

function handleCurrentChange(item: number) {
    userFilterObject.currentPage = item;
}

function handleSizeChange(item: number) {
    userFilterObject.currentSize = item;
}

function handleRemoveRoleItem(item: UserListItemType) {
    ElMessageBox.confirm(
        '确定要删除当前用户吗？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            deleteUser({
                menuName: '',
                accountList: [item.account],
                idList: [item.id],
                tab: activeName.value
            }).then(() => {
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                });
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
.search-box{
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
