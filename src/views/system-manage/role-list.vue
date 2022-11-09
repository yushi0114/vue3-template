<template>
  <test-layout>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="金融端" name="flib">
        <div style="padding: 15px;">
          <dms-role-config></dms-role-config>
        </div>
      </el-tab-pane>
      <el-tab-pane label="DMS" name="second">Config</el-tab-pane>
      <el-tab-pane label="征信端" name="third">Role</el-tab-pane>
    </el-tabs>
  </test-layout>
</template>

<script lang="ts" setup>

import DmsRoleConfig from '@/views/system-manage/role-list/dms-role-config.vue';
import {ref} from 'vue';
import {TabsPaneContext} from 'element-plus';
import TestLayout from '@/views/system-manage/test-layout.vue';

const activeName = ref('flib');

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
};
</script>

<style lang="scss" scoped>

</style>
