<template>
    <PagePanel>
        <Board full>
            <template v-if="mode === 'list'">
                <category-list-content></category-list-content>
            </template>
            <div class="form-content" v-if="mode === 'form'">
                <category-form></category-form>
            </div>
        </Board>
    </PagePanel>
</template>

<script lang="ts" setup>
import CategoryForm from './components/category-form.vue';
import CategoryListContent from './components/category-list-content.vue';

import { mode, setFinanceCategoryList } from './components/category-list';
import { LoadingService } from '@/views/system/loading-service';

onMounted(async() => {
    LoadingService.getInstance().loading();
    await setFinanceCategoryList();
    LoadingService.getInstance().stop();
});
</script>

<style scoped lang="scss">
.form-content {
    margin-left: 24px;
    padding: 48px 24px 24px;
    height: 100%;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    flex: 1;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    overflow-y: auto;
}
</style>
