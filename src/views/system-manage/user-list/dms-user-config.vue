<template>
  <template v-if="mode === 'list'">
    <user-list-content @create="handleCreateNewRole" @edit="handleEditRoleItem"></user-list-content>
  </template>
  <template v-if="mode === 'form'">
    <user-form :form="form" :form-type="formType" :role-list="dataSource" @goBack="handleGoBack"></user-form>
  </template>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import UserForm from './user-form.vue';
import {roleList} from '@/views/system-manage/mock/route-tree';
import type {UserFormType} from '@/views/system-manage/type/user-list.type';
import UserListContent from '@/views/system-manage/user-list/user-list-content.vue';
import type {RoleListItemType} from '@/views/system-manage/type/role-list.type';

const dataSource = ref<RoleListItemType[]>();

const mode = ref<'form' | 'list'>('list');
const currentRoleId = ref();

const form = ref<UserFormType>();
const formType = ref<'create' | 'edit'>('edit');


async function getRoleListData(): Promise<void> {
    dataSource.value = roleList;
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
    await getRoleListData();
});

</script>

<style scoped lang="scss">

</style>
