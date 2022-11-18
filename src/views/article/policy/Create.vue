<script lang="ts" setup>
import ArticlePublish from '../components/ArticlePublish.vue';
import { ARTICLE_MODULE } from '@/enums';

</script>

<template>
    <PagePanel>
        <Board class="article-create">
            <article-publish :module="ARTICLE_MODULE.POLICY_LXT"></article-publish>
        </Board>
    </PagePanel>
</template>

<style lang="postcss">
.article-create {
    @apply;
}
</style>
