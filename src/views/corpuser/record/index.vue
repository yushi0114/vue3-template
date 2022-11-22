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
    <PagePanel>
        <Board class="record">
            <PlatformTab />
            <template v-if="isLxtstatistics">
                <LxtReportRecordTable></LxtReportRecordTable>
            </template>
            <template v-else>
                <ZjfwReportRecordTable></ZjfwReportRecordTable>
            </template>
        </Board>
    </PagePanel>
</template>

<style lang="postcss" scoped>
.record {
    @apply  h-full;
}
</style>
