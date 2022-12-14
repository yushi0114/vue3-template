<template>
    <PagePanel full>
        <Board focus-full>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane v-for="item in categoryList" :key="item.id" :label="item.name" :name="item.code">
                </el-tab-pane>
            </el-tabs>
            <institution-config></institution-config>
        </Board>
    </PagePanel>
</template>

<script lang="ts" setup>
import { activeName, categoryList, changeOrgTypeView, initInstitutionPage } from './components/finance-institution';
import type { TabsPaneContext } from 'element-plus';
import { LoadingService } from '@/views/system/loading-service';
import { onMounted } from 'vue';
import InstitutionConfig from '@/views/finance/institution/components/institution-config.vue';

async function handleClick(tab: TabsPaneContext) {
    LoadingService.getInstance().loading();
    await changeOrgTypeView(tab.paneName as string);
    LoadingService.getInstance().stop();
}

onMounted(async() => {
    LoadingService.getInstance().loading();
    await initInstitutionPage();
    LoadingService.getInstance().stop();
});
</script>
