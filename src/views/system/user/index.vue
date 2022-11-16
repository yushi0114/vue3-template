<template>
  <PageContent :title="'用户管理'">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="DMS" name="dms">
          <user-config></user-config>
      </el-tab-pane>
      <el-tab-pane label="征信端" name="cre">
        <user-config></user-config>
      </el-tab-pane>
    </el-tabs>
  </PageContent>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue';
import UserConfig from '@/views/system/user/components/user-config.vue';
import type {TabsPaneContext} from 'element-plus';
import {getUserListData, activeName, getRoleListData} from '@/views/system/user/components/user-list';
import type {UserTabType} from '@/views/system/type/user-list.type';
import {LoadingService} from '@/views/system/loading-service';


const handleClick = (tab: TabsPaneContext, event: Event) => {
    LoadingService.getInstance().loading();
    getUserListData({
        tab: tab.paneName as UserTabType
    });
    LoadingService.getInstance().stop();
};

onMounted(async() => {
    LoadingService.getInstance().loading();
    await getUserListData({
        tab: activeName.value
    });
    await getRoleListData({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
});
</script>

<style lang="scss" scoped>

</style>
