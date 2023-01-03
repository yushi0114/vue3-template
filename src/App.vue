<script setup lang="ts">
import { Boot } from '@wangeditor/editor';
import attachmentModule from '@wangeditor/plugin-upload-attachment';
import { RouterView } from 'vue-router';
import { useRouteGuard } from './composables';
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const buttonConfig = reactive({
    autoInsertSpace: true,
});

const locale = zhCn;

// 注册上传附件插件。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
Boot.registerModule(attachmentModule);

useRouteGuard();
</script>

<template>
    <el-config-provider :button="buttonConfig" :locale="locale">
        <RouterView />
    </el-config-provider>
</template>

<style lang="scss">

</style>
