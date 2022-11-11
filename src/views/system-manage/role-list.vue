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
import {getRolePageList, roleFilterObject} from '@/views/system-manage/role-list/role-list';

const activeName = ref<RouteTabType>('dms');

const handleClick = (tab: TabsPaneContext) => {
    getRolePageList({
        tab: tab.paneName as RouteTabType
    });
};

onMounted(() => {
    roleFilterObject.currentSize = 10;
    roleFilterObject.currentPage = 0;
    console.log('----------');
    getRolePageList({
        tab: activeName.value
    });
});
</script>

<style lang="scss" scoped>

</style>
