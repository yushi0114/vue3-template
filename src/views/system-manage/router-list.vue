<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="User" name="first">
      <div class="route-content">
        <el-tree
            class="left-tree"
            :data="dataSource"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
          <template #default="{ node, data }">
            <div class="tree-wrap" @mouseenter="handleMouseEnter(node.id)" @mouseleave="handleMouseLeave">
              <span style="font-size:14px;" :class="{'line-through':  node.data.status }">{{ node.label }} </span>
              <el-popover placement="right-start" trigger="hover" :width="120">
                  <div style="width:max-content;display:flex;flex-flow:column nowrap;justify-content:center;">
                      <el-button
                          text
                          :icon="Plus"
                          style="margin:0;color: #606266;font-size:14px;"
                          size="small">
                          新建
                    </el-button>
                    <el-button
                        text
                        :icon="Edit"
                          size="small"
                          style="margin:0;color: #606266;font-size:14px;">
                          编辑
                    </el-button>
                    <el-button
                        text
                        :icon="Delete"
                        style="margin:0;color: #606266;font-size:14px;"
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
        <div class="content"></div>
      </div>

    </el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import type { TabsPaneContext } from 'element-plus';
import type Node from 'element-plus/es/components/tree/src/model/node';

interface Tree {
  id: number
  label: string
  children?: Tree[]
}
let id = 1000;
const activeName = ref('first');
const activeId = ref();

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
};

function handleMouseEnter(event: string){
    activeId.value = event;
}

function handleMouseLeave(){
    activeId.value = undefined;
}

const dataSource = ref<Tree[]>([
    {
        id: 1,
        label: 'Level one 1',
        children: [
            {
                id: 4,
                label: 'Level two 1-1',
                children: [
                    {
                        id: 9,
                        label: 'Level three 1-1-1',
                    },
                    {
                        id: 10,
                        label: 'Level three 1-1-2',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: 'Level one 2',
        children: [
            {
                id: 5,
                label: 'Level two 2-1',
            },
            {
                id: 6,
                label: 'Level two 2-2',
            },
        ],
    },
    {
        id: 3,
        label: 'Level one 3',
        children: [
            {
                id: 7,
                label: 'Level two 3-1',
            },
            {
                id: 8,
                label: 'Level two 3-2',
            },
        ],
    },
]);

const append = (data: Tree) => {
    const newChild = { id: id++, label: 'testtest', children: [] };
    if (!data.children) {
        data.children = [];
    }
    data.children.push(newChild);
    dataSource.value = [...dataSource.value];
};

const remove = (node: Node, data: Tree) => {
    const parent = node.parent;
    const children: Tree[] = parent.data.children || parent.data;
    const index = children.findIndex((d) => d.id === data.id);
    children.splice(index, 1);
    dataSource.value = [...dataSource.value];
};
</script>

<style scoped lang="scss">

.route-content {
  display: flex;
  gap: 20px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.left-tree {
  border-right: 1px solid #ccc;
  &::v-deep(.el-tree-node__label) {
    display: block;
    width: 100%;
    min-width: 220px;
  }
}

.line-through {
  text-decoration: line-through;
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
<style>
.el-popover {
  min-width: 100px;
}
</style>
