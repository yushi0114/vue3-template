<template>
  <PageContent>
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

import UserConfig from '@/views/system-manage/user-list/user-config.vue';
import type {TabsPaneContext} from 'element-plus';
import {getUserListData, activeName, getRoleListData} from '@/views/system-manage/user-list/user-list';


const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
};

onMounted(async() => {
    await getUserListData({
        tab: activeName.value
    });
    await getRoleListData({
        tab: activeName.value
    });
});
</script>

<style lang="scss" scoped>

</style>
