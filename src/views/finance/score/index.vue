<template>
  <PageContent :title="'信用评分查询记录'">
        <finance-score-content-list></finance-score-content-list>
  </PageContent>
</template>

<script lang="ts" setup>

import FinanceScoreContentList from '@/views/finance/score/components/finance-score-content-list.vue';
import { onMounted } from 'vue';
import { LoadingService } from '@/views/system/loading-service';
import { getPageList } from './components/finance-score';

onMounted(async() => {
    LoadingService.getInstance().loading();
    await getPageList();
    LoadingService.getInstance().stop();
});
</script>

<style scoped lang="scss">

</style>
