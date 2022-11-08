<template>
  <div>
    <div style="height: 65px; width: 100%; border-bottom: 1px solid #ccc;">

    </div>
    <div style="height: calc(100vh - 65px); display: flex;">
      <div style="width: 220px; border-right: 1px solid #ccc"></div>
      <div style="flex: 1; padding: 30px;">
        <div><h1>菜单管理</h1> </div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="金融端" name="first">
            <div style="padding: 15px;">
              <flib-route-config ></flib-route-config>
            </div>

          </el-tab-pane>
          <el-tab-pane label="DMS" name="second">Config</el-tab-pane>
          <el-tab-pane label="征信端" name="third">Role</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import FlibRouteConfig from '@/views/system-manage/route-list/flib-route-config.vue';
const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
};

</script>

<style scoped lang="scss">

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}


</style>
<style>
.el-popover {
  min-width: 100px;
}
</style>
