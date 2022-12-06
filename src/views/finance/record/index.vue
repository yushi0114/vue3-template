<template>
    <PagePanel>
        <Board full>
            <finance-report-content-list></finance-report-content-list>
        </Board>
    </PagePanel>
</template>

<script lang="ts" setup>

import FinanceReportContentList from '@/views/finance/record/components/finance-report-content-list.vue';
import { onMounted } from 'vue';
import { LoadingService } from '@/views/system/loading-service';
import { getPageList } from './components/finance-report';

onMounted(async() => {
    LoadingService.getInstance().loading();
    await getPageList();
    LoadingService.getInstance().stop();
});
</script>


<style scoped lang="scss">

</style>
