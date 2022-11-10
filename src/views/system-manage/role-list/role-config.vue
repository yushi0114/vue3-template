<template>
  <template v-if="mode === 'list'">
    <role-list-content @create="handleCreateNewRole" @edit="handleEditRoleItem"></role-list-content>
  </template>
  <template v-if="mode === 'form'">
    <role-form  @goBack="handleGoBack"></role-form>
  </template>
</template>

<script lang="ts" setup>
import RoleForm from './role-form.vue';
import RoleListContent from '@/views/system-manage/role-list/role-list-content.vue';

import {mode, currentRoleId, getTreeData} from './role-list';

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
