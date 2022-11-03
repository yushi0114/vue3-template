<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useRouteGuard } from './composables';

useRouteGuard();
</script>

<template>
    <RouterView />
</template>

<style lang="postcss">

</style>
