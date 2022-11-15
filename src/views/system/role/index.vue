<template>
  <PageContent :title="'角色管理'" v-loading="isLoading">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="DMS" name="dms">
        <role-config :tab="'dms'"></role-config>
      </el-tab-pane>
      <el-tab-pane label="征信端" name="cre">
        <role-config :tab="'cre'"></role-config>
      </el-tab-pane>
    </el-tabs>
  </PageContent>
</template>

<script lang="ts" setup>

import RoleConfig from '@/views/system-manage/role-list/role-config.vue';
import type {TabsPaneContext} from 'element-plus';
import type {RoleTabType} from '@/views/system-manage/type/role-list.type';
import {
    getRolePageList,
    roleFilterObject,
    activeName,
    mode,
    isLoading,
    setRoleListLoading
} from '@/views/system-manage/role-list/role-list';

const handleClick = async(tab: TabsPaneContext) => {
    mode.value = 'list';
    setRoleListLoading(true);
    await getRolePageList({
        tab: tab.paneName as RoleTabType
    });
    setRoleListLoading(false);
};

onMounted(async() => {
    roleFilterObject.currentSize = 10;
    roleFilterObject.currentPage = 0;
    await getRolePageList({
        tab: activeName.value
    });
});
</script>

<style lang="scss" scoped>

</style>
