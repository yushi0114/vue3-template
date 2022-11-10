<template>
  <PageContent :title="'角色管理'">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="DMS" name="dms">
        <role-config :tab="'dms'"></role-config>
      </el-tab-pane>
      <el-tab-pane label="征信端" name="cre">
        <role-config :tab="'cre'"></role-config>
      </el-tab-pane>
      <el-tab-pane label="金融端" name="fin">
        <role-config :tab="'fin'"></role-config>
      </el-tab-pane>
    </el-tabs>
  </PageContent>
</template>

<script lang="ts" setup>

import RoleConfig from '@/views/system-manage/role-list/role-config.vue';
import {ref} from 'vue';
import type {TabsPaneContext} from 'element-plus';
import type {RouteTabType} from '@/views/system-manage/type/route-list.type';

const activeName = ref<RouteTabType>('dms');

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
};

onMounted(() => {

})
</script>

<style lang="scss" scoped>

</style>
