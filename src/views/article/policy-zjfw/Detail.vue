<script lang="ts" setup>
import ArticleDetail from '../components/ArticleDetail.vue';
import { ARTICLE_MODULE } from '@/enums';
</script>

<template>
    <PagePanel full>
        <Board class="article-detail">
            <article-detail :module="ARTICLE_MODULE.POLICY_ZJFW"></article-detail>
        </Board>
    </PagePanel>
</template>

<style lang="scss">
.article-detail {
    height: 100%;
}
</style>
