<template>
    <el-tree
        ref="menuTree"
        :data="typeMenuTree"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="institutionItemData.menuIdArr">
    </el-tree>
    <div>
        <el-button>
            重置
        </el-button>
        <el-button type="primary" @click="handleUpdate">
            确定
        </el-button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { institutionItemData, updateOrg, typeMenuTree, treeToArr } from '../finance-institution';
import type { TreeNodeData } from 'element-plus/lib/components/tree/src/tree.type';
import { LoadingService } from '@/views/system/loading-service';

const menuTree = ref();

async function handleUpdate() {
    let checkedNodeIds = menuTree.value?.getCheckedNodes(false, true)
        .map((item: TreeNodeData) => item.id as string);
    if (!checkedNodeIds || !institutionItemData.value) {
        return;
    }
    const newTreeData = treeToArr(typeMenuTree.value);
    const newTreeMenu = newTreeData.map((items) => {
        let selected = 0;
        if (checkedNodeIds.includes(items.id)) {
            selected = 1;
        }
        return { ...items, selected };
    });
    LoadingService.getInstance().loading();
    await updateOrg({
        id: institutionItemData.value?.id,
        orgLevel: institutionItemData.value?.orgLevel,
        orgDictionaryId: institutionItemData.value?.orgDictionaryId,
        desc: institutionItemData.value?.desc,
        sort: institutionItemData.value?.sort,
        status: institutionItemData.value?.status,
        menuArr: newTreeMenu
    });
    LoadingService.getInstance().stop();
}
</script>

<style scoped lang="scss">
.user-manage-container {
    padding: 24px;
    width: 30%;
    max-width: 40%;
}

.footer {
    text-align: left;
    margin: 40px 0;
}
</style>
