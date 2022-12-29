<template>
    <PagePanel>
        <Board full>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="辽信通" name="sjzx">
                </el-tab-pane>
                <el-tab-pane label="市综服" name="zjfw">
                </el-tab-pane>
            </el-tabs>
            <finance-partner-config v-if="activeName === 'sjzx'"></finance-partner-config>
            <finance-partner-config v-else-if="activeName === 'zjfw'"></finance-partner-config>
        </Board>
    </PagePanel>
</template>

<script lang="ts" setup>
import { activeName, getPageList, filterObject, mode, resetFilterObject } from '@/views/finance/partner/components/finance-partner';
import type { TabsPaneContext } from 'element-plus';
import { onMounted } from 'vue';
import type { FinancePartnerTabType } from '@/types/finance/finance-parnter.type';
import FinancePartnerConfig from './components/finance-partner-config.vue';

async function handleClick(tab: TabsPaneContext) {
    mode.value = 'list';
    filterObject.value.searchInput = '';
    await getPageList({
        tab: tab.paneName as FinancePartnerTabType
    });
}

onBeforeMount(() => {
    mode.value = 'list';
    activeName.value = 'sjzx';
    resetFilterObject();
});

onMounted(async() => {
    await getPageList({
        tab: activeName.value
    });
});
</script>

<style scoped lang="scss">
</style>
