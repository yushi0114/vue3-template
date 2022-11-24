<template>
    <PageContent :title="'机构用户总览'">
        <finance-report-content-list></finance-report-content-list>
    </PageContent>
</template>

<script lang="ts" setup>

import FinanceReportContentList from './components/finance-org-user-content-list.vue';
import { onMounted } from 'vue';
import { LoadingService } from '@/views/system/loading-service';
import { getPageList } from './components/finance-org-user';

onMounted(async() => {
    LoadingService.getInstance().loading();
    await getPageList();
    LoadingService.getInstance().stop();
});
</script>


<style scoped lang="scss">

</style>
