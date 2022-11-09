<template>
  <el-table :data="roleList" style="width: 100%">
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
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import type {RoleListItemType} from '@/views/system-manage/type/role-list.type';

const tableData = [
    {
        id: '1',
        createAt: '2016-05-03',
        name: 'Tom',
        desc: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: '2',
        createAt: '2016-05-02',
        name: 'Tom',
        desc: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: '3',
        createAt: '2016-05-04',
        name: 'Tom',
        desc: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: '4',
        createAt: '2016-05-01',
        name: 'Tom',
        desc: 'No. 189, Grove St, Los Angeles',
    },
];


const roleList = ref<RoleListItemType[]>([]);

async function getRoleListData(){
    roleList.value = tableData;
}

function handleEditRoleItem(item: RoleListItemType){

}

function handleRemoveRoleItem(item: RoleListItemType){

}

onMounted(async() => {
    await getRoleListData();
});
</script>

<style scoped>

</style>
