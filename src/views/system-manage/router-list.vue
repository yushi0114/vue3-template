<template>
    <PageContent :title="'路由管理'" :desc="'路由管理包括DMS、金融端和征信端'">
        <el-tabs v-model="activeName" class="demo-tabs" style="height: 100%" @tab-click="handleClick">
          <el-tab-pane label="金融端" name="fin">
              <route-config :data-source="dataSource" :tab="'fin'"></route-config>
          </el-tab-pane>
          <el-tab-pane label="DMS" name="dms">
              <route-config :data-source="dataSource" :tab="'dms'"></route-config>
          </el-tab-pane>
          <el-tab-pane label="征信端" name="cre">
              <route-config :data-source="dataSource" :tab="'cre'"></route-config>
          </el-tab-pane>
        </el-tabs>
    </PageContent>
</template>

<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus';
import RouteConfig from '@/views/system-manage/route-list/route-config.vue';
import {activeName, dataSource, getRouteData, getTreeData} from './route-list/route-list';
import type {RouteTabType} from '@/views/system-manage/type/route-list.type';

async function handleClick(tab: TabsPaneContext, event: Event) {
    console.log(tab, event);
    await getTreeData(tab.paneName as RouteTabType);
}

onMounted(async() => {
    await getTreeData();
    await getRouteData();
});
</script>

<style scoped lang="scss">

.el-tabs {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  background: #ffffff;
  overflow-y: auto;
}

.el-tabs ::v-deep .el-tabs__header {
  height: 40px;
  min-height: 40px;
  width: 100%;
}

.el-tabs ::v-deep .el-tabs__content {
  flex: 1;
  width: 100%;
}

.el-tab-pane {
  height: 100%;
}


</style>
<style>
.el-popover {
  min-width: 100px;
}
</style>
