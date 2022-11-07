<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useRouteGuard } from './composables';

const config = reactive({
    autoInsertSpace: true,
});

useRouteGuard();
</script>

<template>
    <el-config-provider :button="config">
        <RouterView />
    </el-config-provider>
</template>

<style lang="postcss">

</style>
