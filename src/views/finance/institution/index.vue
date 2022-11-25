<template>
    <PageContent :title="'机构管理'">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in categoryList" :key="item.id" :label="item.name" :name="item.code">
                <institution-config v-if="activeName === item.code"></institution-config>
            </el-tab-pane>
        </el-tabs>
    </PageContent>
</template>

<script lang="ts" setup>
import {
    activeName,
    categoryList,
    getCategoryList,
    getInstitutionTree, mode,
    setTypeMenuTree
} from './components/finance-institution';
import type { TabsPaneContext } from 'element-plus';
import { LoadingService } from '@/views/system/loading-service';
import { onMounted } from 'vue';
import InstitutionConfig from '@/views/finance/institution/components/institution-config.vue';

async function handleClick(tab: TabsPaneContext) {
    mode.value = 'board';
    LoadingService.getInstance().loading();
    await getInstitutionTree(tab.paneName as string);
    await setTypeMenuTree({
        id: categoryList.value?.find(item => item.code === tab.paneName as string)?.id!
    });
    LoadingService.getInstance().stop();
}

onMounted(async () => {
    LoadingService.getInstance().loading();
    await getCategoryList();
    if (categoryList.value) {
        await setTypeMenuTree({
            id: categoryList.value[0].id
        });
    }
    activeName.value = categoryList.value ? categoryList.value[0].code : '';
    await getInstitutionTree();
    LoadingService.getInstance().stop();
});
</script>

<style scoped lang="scss">
.el-tabs {
    position: relative;
    width: 100%;
    height: 100%;
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
