<template>
  <role-list-content></role-list-content>
  <role-form :form="form" :form-type="formType" :menu-list="dataSource"></role-form>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import RoleForm from './role-form.vue';
import { TreeItemType} from '@/views/system-manage/type/route-list.type';
import {routeTree} from '@/views/system-manage/mock/route-tree';
import type {RoleFormType} from '@/views/system-manage/type/role-list.type';
import RoleListContent from '@/views/system-manage/role-list/role-list-content.vue';

const dataSource = ref<TreeItemType[]>();


const form = ref<RoleFormType>();
const formType = ref<'create' | 'edit'>('edit');


async function getTreeData(): Promise<void> {
    dataSource.value = routeTree;
}


onMounted(async() => {
    await getTreeData();
});

</script>

<style scoped>

</style>
