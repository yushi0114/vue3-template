<script lang="ts" setup>
import ArticlePublish from '../components/ArticlePublish.vue';
import { ARTICLE_MODULE } from '@/enums';
</script>

<template>
    <PagePanel>
        <Board class="article-create">
            <article-publish :module="ARTICLE_MODULE.NEWS_LXT"></article-publish>
        </Board>
    </PagePanel>
</template>

<style lang="scss">
.article-create {
    height: 100%;
}
</style>
