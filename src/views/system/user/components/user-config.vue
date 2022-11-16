<template>
  <template v-if="mode === 'list'">
    <user-list-content></user-list-content>
  </template>
  <template v-if="mode === 'form'">
    <user-form ></user-form>
  </template>
</template>

<script lang="ts" setup>

import UserForm from './user-form.vue';

import UserListContent from '@/views/system/user/components/user-list-content.vue';

import {mode} from './user-list';
</script>

<style scoped lang="scss">

</style>
