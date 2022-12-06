<template>
    <PagePanel>
        <Board full>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="辽信通" name="sjzx">
                    <finance-partner-config v-if="activeName === 'sjzx'"></finance-partner-config>
                </el-tab-pane>
                <el-tab-pane label="市综服" name="zjfw">
                    <finance-partner-config v-if="activeName === 'zjfw'"></finance-partner-config>
                </el-tab-pane>
            </el-tabs>
        </Board>
    </PagePanel>
</template>

<script lang="ts" setup>
import { activeName, getPageList, filterObject, mode } from '@/views/finance/partner/components/finance-partner';
import type { TabsPaneContext } from 'element-plus';
import { LoadingService } from '@/views/system/loading-service';
import { onMounted } from 'vue';
import type { FinancePartnerTabType } from '@/types/type/finance-parnter.type';
import FinancePartnerConfig from './components/finance-partner-config.vue';

async function handleClick(tab: TabsPaneContext) {
    LoadingService.getInstance().loading();
    mode.value = 'list';
    filterObject.value.searchInput = '';
    await getPageList({
        tab: tab.paneName as FinancePartnerTabType
    });
    LoadingService.getInstance().stop();
}

onMounted(async() => {
    LoadingService.getInstance().loading();
    await getPageList({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
});
</script>

<style scoped lang="scss">
.el-tabs {
    position: relative;
    height: 100%;
    width: 100%;
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
