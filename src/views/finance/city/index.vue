<script lang="ts" setup>
import cityTable from './components/CityTable.vue';
</script>

<template>
    <PagePanel class="city-wrapper">
        <Layout>
            <el-row class="page-header">
                <el-col :span="24">
                    <div class="page-title">城市管理</div>
                </el-col>
            </el-row>
            <Board class="board">
                <cityTable></cityTable>
            </Board>
        </Layout>
    </PagePanel>
</template>

<style lang="scss" scoped>
.city-wrapper {

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
