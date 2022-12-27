<template>
    <div class="menu-tree-container">
        <div class="menu-tree-header">
            <el-input placeholder="请输入菜单名称进行查询" clearable v-model="filterText" :prefix-icon="Search">
            </el-input>
            <el-tooltip
                    content="新建路由"
                    placement="top">
                    <Icon class="add-menu-btn outline-none" :name="'ep:plus'" @click="handleAddNewMenu"></Icon>
                </el-tooltip>
            <!-- <el-button text class="add-menu-btn" @click="handleAddNewMenu" title="新建路由">
                <template #icon>
                    <Icon :name="'ep:plus'"></Icon>
                </template>
            </el-button> -->
        </div>
        <el-tree
            ref="treeRef"
            class="left-tree"
            :data="menuTreeData"
            node-key="id"
            default-expand-all
            @node-click="handleNodeClick"
            :filter-node-method="filterNode"
            :expand-on-click-node="false">
            <template #default="{ node, data }">
                <div class="tree-wrap">
                    <span style="font-size:14px;" :class="{'line-through':  node.status }">{{ node.label }} </span>
                    <ListOperator
                        class="tree-operator"
                        :class="[data.id === activeId && 'tree-operator--block']"
                        tooltip-disabled
                        :max-out-count="0"
                        @operate="(opt) => handleOperateTreeItem(data, opt.value)"
                        :operators="[
                            { name: '新建', value: ItemOperate.create, icon: 'ep-plus', hidden: data.parentId !== '0' },
                            { name: '编辑', value: ItemOperate.edit, icon: 'ep-edit-pen', },
                            { name: '删除', value: ItemOperate.delete, icon: 'ep-delete', },
                        ]"
                    />
                </div>
            </template>
        </el-tree>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TreeItemType } from '@/types/system-manage';
import Icon from '@/components/Icon.vue';
import { Search } from '@element-plus/icons-vue';
import {
    goCreateFormView,
    goDetailFormView,
    goEditFormView,
    goTreeView,
    menuDetailData,
    menuTreeData,
    removeMenus
} from './menu-list';
import { ElMessageBox, type ElTree } from 'element-plus';
import { LoadingService } from '@/views/system/loading-service';
import { ItemOperate } from '@/components';


const activeId = ref();
const treeRef = ref<InstanceType<typeof ElTree>>();
const filterText = ref('');
watch(filterText, (val) => {
    treeRef.value!.filter(val);
});
defineExpose({
    treeRef
});

function filterNode(value: string, data: any) {
    if (!value) return true;
    return (data as TreeItemType).label.includes(value);
}

function handleAddNewMenu() {
    goCreateFormView();
}

function lookForAllId(data: TreeItemType[], arr: { id: string }[]) {
    for (let item of data) {
        arr.push({ id: item.id });
        if (item.children && item.children.length) lookForAllId(item.children, arr);
    }
    return arr;
}

async function handleOperateTreeItem(item: TreeItemType, type: ItemOperate) {
    let willDeleteList: { id: string }[] | undefined;
    if (type === ItemOperate.edit) {
        await goEditFormView(item.id);
        await nextTick(() => {
            treeRef.value?.setCurrentKey(item.id);
        });
    }
    if (type === ItemOperate.create) {
        await goCreateFormView(item.id);
    }
    if (type === ItemOperate.delete) {
        willDeleteList = lookForAllId([item], []);
        ElMessageBox.confirm(
            '确定要删除当前菜单吗？',
            '警告',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(async() => {
                if (!willDeleteList || !willDeleteList?.length) {
                    return;
                }
                LoadingService.getInstance().loading();
                const status = await removeMenus(willDeleteList.map(item => item.id));
                if (status) {
                    await goTreeView();
                }
                LoadingService.getInstance().stop();
            })
            .catch(() => {});
    }
}


async function handleNodeClick(data: TreeItemType) {
    console.log('data: ', data);
    activeId.value = data.id;
    menuDetailData.value = await goDetailFormView(data.id);
    await nextTick(() => {
        treeRef.value?.setCurrentKey(data.id);
    });
}

// function handleMouseEnter(event: string) {
//     activeId.value = event;
// }

// function handleMouseLeave(event: string) {
//     activeId.value = event;
// }

</script>

<style scoped lang="scss">
.menu-tree-container {
    .menu-tree-header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        box-sizing: border-box;

        .add-menu-btn {
            width: 1.5rem;
            height: 1.5rem;
            cursor: pointer;
            margin-left: 5px;
            color: #606266;
        }
    }

    .left-tree {
        margin-top: 15px;
        width: 100%;
        flex: 1;
        box-sizing: border-box;

        :deep(.el-tree-node.is-current > .el-tree-node__content) {
            background-color: transparent !important;
            color: $color-primary-light-3;
        }

        :deep(.el-tree-node__label) {
            display: block;
            width: 100%;
        }

        .tree-wrap {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 4px;
            box-sizing: border-box;
            &:hover .tree-operator {
                display: block;
            }
            .tree-operator {
                display: none;

                &--block {
                    display: block;
                }
            }
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
    min-width: 100px !important;
}

.popover-list {
    width: 100%;

    .custom-btn {
        width: 100%;
        margin: 0;
        color: #606266;
        font-size: 14px;
    }
}
</style>
