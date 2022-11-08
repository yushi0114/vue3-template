<template>
  <div class="route-tree-container">
    <div class="route-tree-header">
      <el-input placeholder="请输入搜索内容" prefix-icon="el-icon-search" clearable v-model="filterText">
      </el-input>
      <el-button text class="add-route-btn" @click="addNewRoute" :icon="Plus" title="新建路由">
      </el-button>
    </div>
    <el-tree
        class="left-tree"
        :data="dataSource"
        node-key="id"
        default-expand-all
        @node-click="handleNodeClick"
        :expand-on-click-node="false">
      <template #default="{ node, data }">
        <div class="tree-wrap" @mouseenter="handleMouseEnter(node.id)" @mouseleave="handleMouseLeave">
          <span style="font-size:14px;" :class="{'line-through':  data.status }">{{ node.label }} </span>
          <el-popover v-if="node.id === activeId" class="custom-popover" placement="right-start" trigger="hover" :width="100">
            <div class="popover-list">
              <el-button
                  text
                  :icon="Plus"
                  @click="append"
                  class="custom-btn"
                  size="small">
                新建
              </el-button>
              <el-button
                  text
                  :icon="Edit"
                  size="small"
                  class="custom-btn">
                编辑
              </el-button>
              <el-button
                  text
                  :icon="Delete"
                  @click="remove"
                  class="custom-btn"
                  size="small">
                删除
              </el-button>
            </div>
            <template #reference>
              <el-icon><More /></el-icon>
            </template>
          </el-popover>
        </div>
      </template>
    </el-tree>

  </div>
</template>

<script lang="ts" setup>
import { ref} from 'vue';
import type { PropType } from 'vue';
import { Delete, Edit, Plus } from '@element-plus/icons-vue';
import type Node from 'element-plus/es/components/tree/src/model/node';

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const props = defineProps({
    dataSource: {
        type: Array as PropType<Tree[]>,
        default: () => []
    }
});

const activeId = ref();

const filterText = ref('');
const currentNodeLevel = ref();
const currentKey = ref();
function addNewRoute(){

}

function handleNodeClick(data) {

}

function handleMouseEnter(event: string){
    activeId.value = event;
}

function handleMouseLeave(){
    activeId.value = undefined;
}


const append = (data: Tree) => {
    // todo
};

const remove = (node: Node, data: Tree) => {
    // todo
};
</script>

<style scoped lang="scss">
.route-tree-container {
  .route-tree-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    .add-route-btn {
      height: 32px;
      line-height: 32px;
      text-align: center;
      display: flex;
      align-items: center;
      margin-left: 15px;
      justify-content: center;
      color: #606266;
      box-sizing: border-box;
      padding-right: 4px;
    }
  }
  .left-tree {
    margin-top: 15px;
    width: 100%;
    flex: 1;
    box-sizing: border-box;

    &::v-deep( .el-tree-node.is-current > .el-tree-node__content) {
      background-color: transparent !important;
      //color: $--link-hover-color;
    }
    &::v-deep(.el-tree-node__label) {
      display: block;
      width: 100%;
      //min-width: 220px;
    }

    .tree-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 4px;
      box-sizing: border-box;
    }
  }
}

.line-through {
  text-decoration: line-through;
}


.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
<style lang="scss">
//.custom-popover {
//
//}
.el-popover.el-popper {
  min-width: 100px!important;
}
.popover-list {
  width:100%;
  .custom-btn {
    width: 100%;
    margin:0;
    color: #606266;
    font-size:14px;
  }
}
</style>
