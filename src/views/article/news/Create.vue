<script lang="ts" setup>
import ArticlePublish from '../components/ArticlePublish.vue';
import { ARTICLE_MODULE } from '@/enums';

</script>

<template>
    <div class="article-create">
        <article-publish :module="ARTICLE_MODULE.NEWS_LXT"></article-publish>
    </div>
</template>

<style lang="postcss">
.article-create {
    @apply;
}
</style>
