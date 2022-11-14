<script lang="ts" setup>
import statisticsTable from './components/StatisticsTable.vue';
</script>

<template>
    <PagePanel class="statistics-wrapper">
        <Layout>
            <el-row class="page-header">
                <el-col :span="24">
                    <div class="page-title">首页统计数据</div>
                </el-col>
            </el-row>
            <Board class="board">
                <statistics-table></statistics-table>
            </Board>
        </Layout>
    </PagePanel>
</template>

<style lang="scss" scoped>
.statistics-wrapper {

    .page-header {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 20px;
    };

    .board {
        min-height: calc(100vh - 204px);
        padding: 20px;
    }
}
</style>
