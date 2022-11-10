<template>
  <div class="search-box">
    <el-input class="search-input" placeholder="请输入搜索内容" v-model="filterObject.searchInput">
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
    <el-button :icon="Plus" type="primary" @click="handleCreateNewRole">新建</el-button>
  </div>
  <el-table :data="roleTableData.list" style="width: 100%">
    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column prop="desc" label="创建者" width="180" />
    <el-table-column prop="createAt" label="创建时间" />
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button
            type="primary"
            size="small"
            @click.prevent="handleEditRoleItem(scope.$index)"
        >
          编辑
        </el-button>
        <el-button
            type="danger"
            size="small"
            @click.prevent="handleRemoveRoleItem(scope.$index)"
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
        :current-page="roleTableData.currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="roleTableData.total">
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive} from 'vue';
import type {RoleListItemType} from '@/views/system-manage/type/role-list.type';
import {ElMessage, ElMessageBox} from 'element-plus';
import {tableData} from '../mock/route-tree';
import {Search, Plus} from '@element-plus/icons-vue';

const roleTableData = ref<{
  list: RoleListItemType[],
  total: number,
  currentPage: number
}>({
    list: [],
    total: 0,
    currentPage: 0
});

const filterObject = reactive({
    searchInput: '',
    currentSize: 0,
    currentPage: 0
});

const emit = defineEmits(['edit', 'create']);

function handleEditRoleItem(item: RoleListItemType){
    emit('edit', item.id);
}

function handleCurrentChange(item: number) {
    filterObject.currentPage = item;
}

function handleSizeChange(item: number){
    filterObject.currentSize = item;
}

function handleCreateNewRole(){
    emit('create');
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
        .then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            });
        });
}

async function getRoleListData(){
    roleTableData.value = {
        list: tableData,
        total: 4,
        currentPage: 1
    };
}

onMounted(async() => {
    await getRoleListData();
});
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
