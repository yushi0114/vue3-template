<script lang="ts" setup>
import { CorpReportRecordTabType } from '@/types/corpReportRecord';
import { activeName, loading, getPageList, resetFilterObject } from '@/views/corpuser/record/components/reportRecord';
import ReportRecordTable from '@/views/corpuser/record/components/ReportRecordTable.vue';
import type { TabsPaneContext } from 'element-plus';

const handleClick = async(tab: TabsPaneContext) => {
    resetFilterObject();
    await getPageList({
        tab: tab.paneName as CorpReportRecordTabType
    });
};

onMounted(async() => {
    resetFilterObject();
    await getPageList({
        tab: activeName.value
    });
});

onUnmounted(() => {
    activeName.value = CorpReportRecordTabType.lxt;
});
</script>

<template>
    <PagePanel>
        <Board full v-loading="loading">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="辽信通" name="lxt"></el-tab-pane>
                <el-tab-pane label="市综服" name="zjfw"></el-tab-pane>
            </el-tabs>
            <ReportRecordTable v-if="activeName==='lxt'"></ReportRecordTable>
            <ReportRecordTable v-if="activeName==='zjfw'"></ReportRecordTable>
        </Board>
    </PagePanel>
</template>
