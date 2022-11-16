<template>
    <PageContent :title="'菜单管理'">
        <el-tabs v-model="activeName" class="demo-tabs" style="height: 100%" @tab-click="handleClick">
          <el-tab-pane label="金融端" name="fin">
              <menu-config :tab="'fin'"></menu-config>
          </el-tab-pane>
          <el-tab-pane label="DMS" name="dms">
              <menu-config :tab="'dms'"></menu-config>
          </el-tab-pane>
          <el-tab-pane label="征信端" name="cre">
              <menu-config :tab="'cre'"></menu-config>
          </el-tab-pane>
        </el-tabs>
    </PageContent>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import type { TabsPaneContext } from 'element-plus';
import MenuConfig from '@/views/system/menu/components/menu-config.vue';
import {activeName, getMenuData, getTreeData} from './components/menu-list';
import type {MenuTabType} from '@/views/system/type/menu-list.type';
import {LoadingService} from '@/views/system/loading-service';


async function handleClick(tab: TabsPaneContext) {
    LoadingService.getInstance().loading();
    await getTreeData(tab.paneName as MenuTabType);
    LoadingService.getInstance().stop();
}

onMounted(async() => {
    LoadingService.getInstance().loading();
    await getTreeData();
    await getMenuData();
    LoadingService.getInstance().stop();
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
