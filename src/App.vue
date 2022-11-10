<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useRouteGuard } from './composables';
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const buttonConfig = reactive({
    autoInsertSpace: true,
});

const locale = zhCn;

// useRouteGuard();
</script>

<template>
    <el-config-provider :button="buttonConfig" :locale="locale">
        <RouterView />
    </el-config-provider>
</template>

<style lang="postcss">

</style>
