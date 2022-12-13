<template>
    <role-list-content v-if="mode === 'list'"></role-list-content>
    <role-form v-if="mode === 'form'"></role-form>
</template>

<script lang="ts" setup>
import RoleForm from './role-form.vue';
import RoleListContent from '@/views/system/role/components/role-list-content.vue';
import { mode } from './role-list';
</script>

