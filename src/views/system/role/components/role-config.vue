<template>
  <template v-if="mode === 'list'">
    <role-list-content></role-list-content>
  </template>
  <template v-if="mode === 'form'">
    <role-form></role-form>
  </template>
</template>

<script lang="ts" setup>
import RoleForm from './role-form.vue';
import RoleListContent from '@/views/system/role/components/role-list-content.vue';

import {mode} from './role-list';
import type {PropType} from 'vue';
import type {MenuTabType} from '@/views/system/type/menu-list.type';
defineProps({
    tab: {
        type: String as PropType<MenuTabType>,
    }
});


</script>

<style scoped lang="scss">

</style>
