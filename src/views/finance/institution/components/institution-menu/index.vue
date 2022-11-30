<template>
    <div class="user-manage-container">
        <el-tree
            ref="menuTreeTemplateRef"
            :data="typeMenuTree"
            show-checkbox
            node-key="id"
            :default-expand-all="true"
            :default-checked-keys="defaultCheckedKey">
        </el-tree>
        <div class="footer">
            <el-button>
                重置
            </el-button>
            <el-button type="primary" @click="handleUpdate">
                确定
            </el-button>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { currentInstitutionId, institutionItemData, treeToArr, typeMenuTree, updateOrg } from '../finance-institution';
import type { TreeNodeData } from 'element-plus/lib/components/tree/src/tree.type';
import { LoadingService } from '@/views/system/loading-service';
import { ref, watchEffect } from 'vue';
import { getOrgMenuCheckedIdsApi } from '@/api/finance/finance-institution';
import { ElMessage } from 'element-plus';

const menuTreeTemplateRef = ref();
const defaultCheckedKey = ref<string[]>([]);

watchEffect(() => {
    if (currentInstitutionId.value) {
        getOrgMenuCheckedIdsApi({ id: currentInstitutionId.value }).then((data) => {
            console.log(data);
            menuTreeTemplateRef.value?.setCheckedKeys([]);
            defaultCheckedKey.value = data;
        });
    }
});

async function handleUpdate() {
    let checkedNodeIds = menuTreeTemplateRef.value?.getCheckedNodes(false, true)
        .map((item: TreeNodeData) => item.id as string);
    if (!checkedNodeIds || !institutionItemData.value) {
        ElMessage({
            type: 'error',
            message: '请至少配置一个菜单'
        });
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
