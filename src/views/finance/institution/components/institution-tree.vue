<template>
    <div class="menu-tree-container">
        <div class="menu-tree-header">
            <el-input placeholder="请输入搜索内容" v-model="filterText" clearable>
            </el-input>
            <el-button text class="add-menu-btn" @click="handleAddNewMenu" title="新建机构">
                <template #icon>
                    <Icon :name="'ep:plus'"></Icon>
                </template>
            </el-button>
        </div>
        <el-tree
            ref="treeRef"
            class="left-tree"
            :data="institutionTreeData"
            node-key="id"
            default-expand-all
            @node-click="handleNodeClick"
            :filter-node-method="filterNode"
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
                                link
                                class="custom-btn"
                                size="small">
                                <template #icon>
                                    <Icon :name="'ep:plus'"></Icon>
                                </template>
                                新建
                            </el-button>
                            <el-button
                                @click="handleOperateTreeItem(data, 'edit')"
                                link
                                size="small"
                                class="custom-btn">
                                <template #icon>
                                    <Icon :name="'ep:edit'"></Icon>
                                </template>
                                编辑
                            </el-button>
                            <el-button
                                @click="handleOperateTreeItem(data, 'remove')"
                                link
                                class="custom-btn"
                                size="small">
                                <template #icon>
                                    <Icon :name="'ep:delete'"></Icon>
                                </template>
                                删除
                            </el-button>
                        </div>
                        <template #reference>
                            <Icon style="transform: rotate(90deg)" :name="'ep:more'"></Icon>
                        </template>
                    </el-popover>
                </div>
            </template>
        </el-tree>
        <institution-remove-dialog
            v-if="isDeleteOrgModelShow"
            :org-name="willDeleteOrgName"></institution-remove-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Icon from '@/components/Icon.vue';
import {
    selectOrgItem,
    goCreateChildLevelFormView,
    goCreateFirstLevelFormView,
    goEditFormView,
    openRemoveView,
    institutionTreeData,
    isDeleteOrgModelShow,
    willDeleteOrgName
} from './finance-institution';
import { LoadingService } from '@/views/system/loading-service';
import InstitutionRemoveDialog from '@/views/finance/institution/components/institution-remove-dialog.vue';
import type { FinanceInstitutionTreeItemType } from '@/types/finance';
import type { ElTree } from 'element-plus';

const activeId = ref();
const treeRef = ref<InstanceType<typeof ElTree>>();
const filterText = ref('');

watch(filterText, (val) => {
    treeRef.value!.filter(val);
});

const filterNode = (value: string, data: FinanceInstitutionTreeItemType) => {
    if (!value) return true;
    return data.orgName.includes(value);
};

async function handleAddNewMenu() {
    LoadingService.getInstance().loading();
    await goCreateFirstLevelFormView();
    LoadingService.getInstance().stop();
}

async function handleOperateTreeItem(item: FinanceInstitutionTreeItemType, type: 'edit' | 'remove' | 'create') {
    if (type === 'remove') {
        openRemoveView(item);
    }
    if (type === 'edit') {
        LoadingService.getInstance().loading();
        await goEditFormView(item.id);
        LoadingService.getInstance().stop();
    }
    if (type === 'create') {
        LoadingService.getInstance().loading();
        await goCreateChildLevelFormView(item.id);
        LoadingService.getInstance().stop();
    }
}

async function handleNodeClick(data: FinanceInstitutionTreeItemType) {
    LoadingService.getInstance().loading();
    await selectOrgItem(data.id);
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
