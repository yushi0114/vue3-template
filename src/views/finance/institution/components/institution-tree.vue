<template>
    <div class="menu-tree-container">
        <div class="menu-tree-header">
            <el-input placeholder="请输入搜索内容" clearable>
                <template #append>
                    <el-button @click="handleSearchMenuTree">
                        <template #icon>
                            <Icon :name="'ep:search'"></Icon>
                        </template>
                    </el-button>
                </template>
            </el-input>
            <el-button class="add-menu-btn" @click="handleAddNewMenu" title="新建机构">
                <template #icon>
                    <Icon :name="'ep:plus'"></Icon>
                </template>
            </el-button>
        </div>
        <el-tree
            class="left-tree"
            :data="institutionTreeData"
            node-key="id"
            default-expand-all
            @node-click="handleNodeClick"
            :expand-on-click-node="false">
            <template #default="{ node, data }">
                <div class="tree-wrap" @mouseenter="handleMouseEnter(node.id)" @mouseleave="handleMouseLeave(node.id)">
                    <span style="font-size:14px;" :class="{'line-through':  node.status }">{{ data.orgName }} </span>
                    <el-popover v-if="node.id === activeId" class="custom-popover" placement="right-start"
                                trigger="hover"
                                :width="100">
                        <div class="popover-list">
                            <el-button
                                @click="handleOperateTreeItem(data, 'create')"
                                text
                                class="custom-btn"
                                size="small">
                                <template #icon>
                                    <Icon :name="'ep:plus'"></Icon>
                                </template>
                                新建
                            </el-button>
                            <el-button
                                @click="handleOperateTreeItem(data, 'edit')"
                                text
                                size="small"
                                class="custom-btn">
                                <template #icon>
                                    <Icon :name="'ep:edit'"></Icon>
                                </template>
                                编辑
                            </el-button>
                            <el-button
                                @click="handleOperateTreeItem(data, 'remove')"
                                text
                                class="custom-btn"
                                size="small">
                                <template #icon>
                                    <Icon :name="'ep:delete'"></Icon>
                                </template>
                                删除
                            </el-button>
                        </div>
                        <template #reference>
                            <Icon :name="'ep:more'"></Icon>
                        </template>
                    </el-popover>
                </div>
            </template>
        </el-tree>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TreeItemType } from '@/views/system/type/menu-list.type';
import Icon from '@/components/Icon.vue';
import {
    getInstitutionItem,
    getInstitutionTree,
    institutionTreeData,
    mode,
    resetInstitutionForm,
    setCurrentMenuId
} from './finance-institution';
import { getRolePageList } from '@/views/finance/institution/components/institution-role/institution-role';
import { getUserPageList } from '@/views/finance/institution/components/institution-user/institution-user';
import { LoadingService } from '@/views/system/loading-service';


const activeId = ref();

function handleAddNewMenu() {
    mode.value = 'form';
    resetInstitutionForm();
}

async function handleSearchMenuTree() {
    await getInstitutionTree();

}

function lookForAllId(data: TreeItemType[], arr: { id: string }[]) {
    for (let item of data) {
        arr.push({ id: item.id });
        if (item.children && item.children.length) lookForAllId(item.children, arr);
    }
    return arr;
}

function handleOperateTreeItem(item: TreeItemType, type: 'edit' | 'remove' | 'create') {
    let willDeleteList: { id: string }[] | undefined;
    if (type === 'remove') {
        willDeleteList = lookForAllId([item], []);
        console.log(willDeleteList, '--------待删除');
    }
    if (type === 'edit') {
        getInstitutionItem(item.id);
        mode.value = 'form';
    }
    // todo
}


async function handleNodeClick(data: TreeItemType) {
    setCurrentMenuId(data.id);
    LoadingService.getInstance().loading();
    await getInstitutionItem(data.id);
    // await setFinanceInstitutionMenuTree({ id: data.id });
    await getRolePageList();
    await getUserPageList();
    LoadingService.getInstance().stop();
}

function handleMouseEnter(event: string) {
    activeId.value = event;
}

function handleMouseLeave(event: string) {
    activeId.value = event;
}

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
            height: 32px;
            line-height: 32px;
            text-align: center;
            display: flex;
            align-items: center;
            margin-left: 15px;
            justify-content: center;
            color: #606266;
            box-sizing: border-box;
        }
    }

    .left-tree {
        margin-top: 15px;
        width: 100%;
        flex: 1;
        box-sizing: border-box;

        &::v-deep( .el-tree-node.is-current > .el-tree-node__content) {
            background-color: transparent !important;
            color: $color-primary-light-3;
        }

        &::v-deep(.el-tree-node__label) {
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
