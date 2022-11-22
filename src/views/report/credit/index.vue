<script lang="ts" setup>
import ReportTable from './components/ReportTable.vue';
</script>

<template>
    <PagePanel class="corp-wrapper">
        <Layout>
            <el-row class="page-header">
                <el-col :span="24">
                    <div class="page-title">征信报告</div>
                </el-col>
            </el-row>
            <Board class="board">
                <ReportTable></ReportTable>
            </Board>
        </Layout>
    </PagePanel>
</template>

<style lang="scss" scoped>
.corp-wrapper {

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
