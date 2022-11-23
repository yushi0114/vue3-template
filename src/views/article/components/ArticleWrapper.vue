<script lang="ts" setup>
import { TAB_LIST } from '../constants';
import ArticleList from './ArticleList.vue';
import { ARTICLE_MODULE, ARTICLE_STATUS } from '@/enums';

const props = withDefaults(
    defineProps<{
        module: ARTICLE_MODULE;
        tabValue?: ARTICLE_STATUS;
    }>(),
    {
        module: ARTICLE_MODULE.NEWS_LXT,
        tabValue: ARTICLE_STATUS.ALL,
    }
);

const activeName = ref(props.tabValue);
</script>

<template>
    <div class="article-wrapper">
        <el-tabs
            class="h-full flex flex-col"
            v-model="activeName">
            <el-tab-pane
                class="h-full"
                v-for="tab in TAB_LIST"
                :label="tab.title"
                :name="tab.value"
                :key="tab.title">
                <slot
                    :tab="tab"
                    :module="module">
                    <article-list
                        :tab="tab"
                        :module="module"></article-list>
                </slot>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style lang="postcss" scoped>
.article-wrapper {
    @apply h-full;
}
:deep(.el-tabs__content) {
    flex: 1;
}
</style>
