<script lang="ts" setup>
import ArticleDetail from '../components/ArticleDetail.vue';
import { ARTICLE_MODULE } from '@/enums';
</script>

<template>
    <PagePanel>
        <Board class="article-detail">
            <article-detail :module="ARTICLE_MODULE.POLICY_ZJFW"></article-detail>
        </Board>
    </PagePanel>
</template>

<style lang="postcss">
.article-detail {
    @apply;
}
</style>
