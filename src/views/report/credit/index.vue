<script lang="ts" setup>
import ReportTable from './components/ReportTable.vue';
</script>

<template>
    <PagePanel full>
        <Board class="report">
            <ReportTable></ReportTable>
        </Board>
    </PagePanel>
</template>

<style lang="postcss" scoped>
.report {
    @apply  h-full;
}
</style>
