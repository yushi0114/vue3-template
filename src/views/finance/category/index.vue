<template>
  <PageContent :title="'机构分类'">
    <template v-if="mode === 'list'">
      <category-list-content></category-list-content>
    </template>
    <template v-if="mode === 'form'">
      <category-form></category-form>
    </template>
  </PageContent>
</template>

<script lang="ts" setup>
import CategoryForm from './components/category-form.vue';
import CategoryListContent from './components/category-list-content.vue';

import {mode, setFinanceCategoryList} from './components/category-list';
import {LoadingService} from '@/views/system/loading-service';

onMounted(async() => {
    LoadingService.getInstance().loading();
    await setFinanceCategoryList();
    LoadingService.getInstance().stop();
});
</script>

<style scoped lang="scss">

</style>
