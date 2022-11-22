<script lang="ts" setup>
import ArticleWrapper from '../components/ArticleWrapper.vue';
import { ARTICLE_MODULE } from '@/enums';
</script>

<template>
    <PagePanel>
        <Board class="publish">
            <article-wrapper :module="ARTICLE_MODULE.POLICY_LXT"></article-wrapper>
        </Board>
    </PagePanel>
</template>

<style lang="postcss">
.publish {
    @apply  h-full;
}
</style>
