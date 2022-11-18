<script lang="ts" setup>
import LxtReportRecordTable from './components/LxtReportRecordTable.vue';
import ZjfwReportRecordTable from './components/ZjfwReportRecordTable.vue';

const route = useRoute();
const isLxtstatistics = ref(true);

onMounted(() => {
    route.params.type === '0' ? isLxtstatistics.value = true : isLxtstatistics.value = false;
});

watch(route, (val) => {
    val.params.type === '0' ? isLxtstatistics.value = true : isLxtstatistics.value = false;
});

</script>

<template>
    <PagePanel class="statistics-wrapper">
        <Layout>
            <el-row class="page-header">
                <el-col :span="24">
                    <div class="page-title">征信报告查询记录</div>
                </el-col>
            </el-row>
            <Board class="board">
                <PlatformTab />
                <template v-if="isLxtstatistics">
                    <LxtReportRecordTable></LxtReportRecordTable>
                </template>
                <template v-else>
                    <ZjfwReportRecordTable></ZjfwReportRecordTable>
                </template>
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
