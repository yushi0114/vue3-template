<template>
    <PagePanel>
        <Board full>
            <FinancelogoContentList />
        </Board>
    </PagePanel>
</template>

<script lang="ts" setup>

import FinancelogoContentList from './components/finance-logo-content-list.vue';
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
