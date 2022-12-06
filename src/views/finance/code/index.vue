<template>
    <PagePanel>
        <Board full>
            <template v-if="mode === 'list'">
                <code-list-content></code-list-content>
            </template>
            <template v-if="mode === 'form'">
                <code-form></code-form>
            </template>
        </Board>
    </PagePanel>
</template>

<script lang="ts" setup>
import CodeForm from './components/code-form.vue';
import CodeListContent from './components/code-list-content.vue';
import { mode, setFinanceCodeList } from './components/code-list';
import { LoadingService } from '@/views/system/loading-service';

onMounted(async() => {
    LoadingService.getInstance().loading();
    await setFinanceCodeList();
    LoadingService.getInstance().stop();
});
</script>

<style scoped lang="scss">

</style>
