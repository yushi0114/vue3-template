<template>
    <PagePanel>
        <Board full>
            <finance-report-content-list></finance-report-content-list>
        </Board>
    </PagePanel>
</template>

<script lang="ts" setup>

import FinanceReportContentList from './components/finance-logo-content-list.vue';
import { LoadingService } from '@/views/system/loading-service';
import { getPageList } from './components/finance-logo';

onMounted(async() => {
    LoadingService.getInstance().loading();
    await getPageList();
    LoadingService.getInstance().stop();
});
</script>


<style scoped lang="scss">

</style>
