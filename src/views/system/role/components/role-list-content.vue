<template>
  <div class="search-box">
    <el-input class="search-input" placeholder="请输入搜索内容" v-model="roleFilterObject.searchInput">
      <template #append>
        <el-button>
          <template #icon>
            <Icon :name="'ep-search'"></Icon>
          </template>
        </el-button>
      </template>
    </el-input>
    <el-button  type="primary" @click="handleCreateNewRole">
      <template #icon>
        <Icon :name="'ep-plus'"></Icon>新建
      </template>
    </el-button>
  </div>
  <el-table :data="roleList.list" style="width: 100%">
    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column prop="desc" label="创建者" width="180" />
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
            @click.prevent="handleRemoveRoleItem(scope.row)"
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
        :current-page="roleFilterObject.currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="roleList.total">
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import type {RoleListItemType} from '@/views/system/type/role-list.type';
import {ElMessage, ElMessageBox} from 'element-plus';
import {
    activeName,
    currentRoleId, formType, getRolePageList,
    getTreeData,
    mode,
    roleFilterObject,
    roleForm,
    roleList
} from './role-list';
import {deleteRole, getRoleMenuIds} from '@/api/system-manage';
import {LoadingService} from '@/views/system/loading-service';

async function handleEditRoleItem(item: RoleListItemType) {
    LoadingService.getInstance().loading();
    mode.value = 'form';
    formType.value = 'edit';
    currentRoleId.value = item.id;
    await getTreeData();
    const menuList = await getRoleMenuIds({
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

function handleCurrentChange(item: number) {
    roleFilterObject.currentPage = item;
}

function handleSizeChange(item: number){
    roleFilterObject.currentSize = item;
}

async function handleCreateNewRole(){
    mode.value = 'form';
    formType.value = 'create';
    await getTreeData();
}

function handleRemoveRoleItem(item: RoleListItemType){
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
                tab: activeName.value,
                menuName: ''
            });
            ElMessage({
                type: 'success',
                message: '删除成功',
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
