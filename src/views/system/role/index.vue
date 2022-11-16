<template>
  <PageContent :title="'角色管理'">
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
import {onMounted} from 'vue';
import RoleConfig from '@/views/system/role/components/role-config.vue';
import type {TabsPaneContext} from 'element-plus';
import type {RoleTabType} from '@/views/system/type/role-list.type';
import {
    getRolePageList,
    roleFilterObject,
    activeName,
    mode
} from '@/views/system/role/components/role-list';
import {LoadingService} from '@/views/system/loading-service';

const handleClick = async(tab: TabsPaneContext) => {
    LoadingService.getInstance().loading();
    mode.value = 'list';
    await getRolePageList({
        tab: tab.paneName as RoleTabType
    });
    LoadingService.getInstance().stop();
};

onMounted(async() => {
    LoadingService.getInstance().loading();
    roleFilterObject.currentSize = 10;
    roleFilterObject.currentPage = 0;
    await getRolePageList({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
});
</script>

<style lang="scss" scoped>

</style>
