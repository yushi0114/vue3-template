<template>
  <test-layout>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="DMS" name="dms">
        <div style="padding: 15px;">
          <dms-user-config></dms-user-config>
        </div>
      </el-tab-pane>
      <el-tab-pane label="征信端" name="clib"></el-tab-pane>
    </el-tabs>
  </test-layout>
</template>

<script lang="ts" setup>

import DmsUserConfig from '@/views/system-manage/user-list/dms-user-config.vue';
import {ref} from 'vue';
import type {TabsPaneContext} from 'element-plus';
import TestLayout from '@/views/system-manage/test-layout.vue';

const activeName = ref('dms');

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
};
</script>

<style lang="scss" scoped>

</style>
