<script lang="ts" setup>
import ArticleWrapper from '../components/ArticleWrapper.vue';
import { ARTICLE_MODULE } from '@/enums';
</script>

<template>
    <div class="publish">
        <article-wrapper :module="ARTICLE_MODULE.POLICY_LXT"></article-wrapper>
    </div>
</template>

<style lang="postcss">
.publish {
    @apply;
}
</style>
