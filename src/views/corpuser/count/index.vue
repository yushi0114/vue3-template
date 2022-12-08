<script lang="ts" setup>
import statisticsTable from './components/StatisticsTable.vue';
import ZjftStatisticsTable from './components/ZjfwStatistics.vue';

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
    <PagePanel>
        <Board full>
            <PlatformTab />
            <template v-if="isLxtstatistics">
                <statistics-table></statistics-table>
            </template>
            <template v-else>
                <ZjftStatisticsTable></ZjftStatisticsTable>
            </template>
        </Board>
    </PagePanel>
</template>

<style lang="scss" scoped>

</style>
