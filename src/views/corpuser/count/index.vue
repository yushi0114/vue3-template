<script lang="ts" setup>
import { StatisticsTabType } from '@/types/statistics';
import statisticsTable from './components/StatisticsTable.vue';
import ZjftStatisticsTable from './components/ZjfwStatistics.vue';

const activeName = ref<StatisticsTabType>(StatisticsTabType.lxt);
onUnmounted(() => {
    activeName.value = StatisticsTabType.lxt;
});
</script>

<template>
    <PagePanel>
        <Board full>
            <el-tabs v-model="activeName">
                <el-tab-pane label="辽信通" name="lxt"></el-tab-pane>
                <el-tab-pane label="市综服" name="zjfw"></el-tab-pane>
            </el-tabs>
            <statistics-table v-if="activeName==='lxt'"></statistics-table>
            <ZjftStatisticsTable v-if="activeName==='zjfw'"></ZjftStatisticsTable>
        </Board>
    </PagePanel>
</template>
