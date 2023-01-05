<template>
    <div class="menu-tree" v-loading="loading.treeLoading">
        <div class="menu-tree-container">
            <div class="menu-tree-header">
                <el-input placeholder="请输入搜索内容" v-model="filterText" clearable :prefix-icon="Search">
                </el-input>
                <el-tooltip
                    content="新建机构"
                    placement="top">
                    <Icon class="add-menu-btn outline-none" :name="'ep:plus'" @click="handleAddNewMenu"></Icon>
                </el-tooltip>
                <!-- <el-button class="add-menu-btn" @click="handleAddNewMenu" title="新建机构">
                    <template #icon>
                        <Icon :name="'ep:plus'"></Icon>
                    </template>
                </el-button> -->
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
                    <div class="tree-wrap" @mouseenter="handleMouseEnter(node.id)">
                        <span style="font-size:14px;" :class="{'line-through':  node.status }">{{ data.orgName }} </span>
                        <ListOperator
                            placement="right"
                            tooltip-disabled
                            v-if="node.id === activeId"
                            :max-out-count="0"
                            @operate="(opt) => handleOperateTreeItem(data, opt.value)"
                            :operators="[
                                { name: '新建', value: ItemOperate.create, icon: 'ep-plus' },
                                { name: '编辑', value: ItemOperate.edit, icon: 'ep-edit-pen', },
                                { name: '删除', value: ItemOperate.delete, icon: 'ep-delete', },
                            ]"
                        />
                    </div>
                </template>
            </el-tree>
            <institution-remove-dialog
                :org-name="willDeleteOrgName"></institution-remove-dialog>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Icon from '@/components/Icon.vue';
import { Search } from '@element-plus/icons-vue';
import {
    selectOrgItem,
    goCreateChildLevelFormView,
    goCreateFirstLevelFormView,
    goEditFormView,
    openRemoveView,
    institutionTreeData,
    willDeleteOrgName,
    loading,
} from './finance-institution';
import InstitutionRemoveDialog from '@/views/finance/institution/components/institution-remove-dialog.vue';
import type { FinanceInstitutionTreeItemType } from '@/types/finance';
import type { ElTree } from 'element-plus';
import { ItemOperate } from '@/components';

const activeId = ref();
const treeRef = ref<InstanceType<typeof ElTree>>();
const filterText = ref('');

watch(filterText, (val) => {
    treeRef.value!.filter(val);
});

const filterNode = (value: string, data: any) => {
    if (!value) return true;
    return (data as FinanceInstitutionTreeItemType).orgName.includes(value);
};

async function handleAddNewMenu() {
    loading.detailLoading = true;
    await goCreateFirstLevelFormView();
    loading.detailLoading = false;
}

async function handleOperateTreeItem(item: FinanceInstitutionTreeItemType, type: ItemOperate) {
    if (type === ItemOperate.delete) {
        openRemoveView(item);
    }
    if (type === ItemOperate.edit) {
        loading.detailLoading = true;
        await selectOrgItem(item.id);
        await goEditFormView(item.id);
        loading.detailLoading = false;
    }
    if (type === ItemOperate.create) {
        loading.detailLoading = true;
        await selectOrgItem(item.id);
        await goCreateChildLevelFormView(item.id);
        loading.detailLoading = false;
    }
}

async function handleNodeClick(data: FinanceInstitutionTreeItemType) {
    loading.detailLoading = true;
    await selectOrgItem(data.id);
    loading.detailLoading = false;
}

function handleMouseEnter(event: string) {
    activeId.value = event;
}

</script>

<style scoped lang="scss">
.menu-tree {
    width: 350px;
    height: 100%;
    overflow-y: overlay;
    min-width: 350px;
    border: $border;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 15px;
    &::-webkit-scrollbar {
        width: 0;
    }

    &:hover {
        &::-webkit-scrollbar {
            width: 8px;
        }
    }
}
.menu-tree-container {
    .menu-tree-header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;

        .add-menu-btn {
            width: 1.25rem;
            height: 1.25rem;
            cursor: pointer;
            margin-left: $gap-xs;
            margin-right: $gap-xs;
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
