<script lang="ts" setup>
import ArticlePublish from '../components/ArticlePublish.vue';
import { ARTICLE_MODULE, PlatformType } from '@/enums';
const route = useRoute();
const platform = ref<PlatformType>(Number(route.params.type));
function handleTabChange(plat: PlatformType) {
    platform.value = plat;
}
</script>

<template>
    <PagePanel>
        <Board class="article-create">
            <PlatformTab @tab-change="handleTabChange"></PlatformTab>
            <article-publish v-if="platform === PlatformType.LiaoXinTong" :module="ARTICLE_MODULE.NEWS_LXT"></article-publish>
            <article-publish v-if="platform === PlatformType.ShiZongFu" :module="ARTICLE_MODULE.NEWS_ZJFW"></article-publish>
        </Board>
    </PagePanel>
</template>

<style lang="scss">
.article-create {
    height: 100%;
}
</style>
