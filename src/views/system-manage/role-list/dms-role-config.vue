<template>
  <template v-if="mode === 'list'">
    <role-list-content @create="handleCreateNewRole" @edit="handleEditRoleItem"></role-list-content>
  </template>
  <template v-if="mode === 'form'">
    <role-form :form="form" :form-type="formType" :menu-list="dataSource" @goBack="handleGoBack"></role-form>
  </template>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import RoleForm from './role-form.vue';
import type { TreeItemType} from '@/views/system-manage/type/route-list.type';
import {routeTree} from '@/views/system-manage/mock/route-tree';
import type {RoleFormType} from '@/views/system-manage/type/role-list.type';
import RoleListContent from '@/views/system-manage/role-list/role-list-content.vue';

const dataSource = ref<TreeItemType[]>();

const mode = ref<'form' | 'list'>('list');
const currentRoleId = ref();

const form = ref<RoleFormType>();
const formType = ref<'create' | 'edit'>('edit');


async function getTreeData(): Promise<void> {
    dataSource.value = routeTree;
}

function handleEditRoleItem(id: string){
    mode.value = 'form';
    currentRoleId.value = id;
}

function handleGoBack() {
    mode.value = 'list';
    currentRoleId.value = undefined;
}

function handleCreateNewRole(){
    mode.value = 'form';
}

onMounted(async() => {
    await getTreeData();
});

</script>

<style scoped lang="scss">

</style>
