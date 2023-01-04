<script lang="ts" setup>
import ArticleWrapper from '../components/ArticleWrapper.vue';
import { ARTICLE_MODULE, PlatformType } from '@/enums';

const route = useRoute();
const platform = ref<PlatformType>(Number(route.params.type));
function handleTabChange(plat: PlatformType) {
    platform.value = plat;
}
</script>

<template>
    <PagePanel full>
        <Board focus-full>
            <PlatformTab @tab-change="handleTabChange"></PlatformTab>
            <Layout>
            <article-wrapper class="flex-1 flex flex-col" v-show="platform === PlatformType.LiaoXinTong" tab-position="left" :module="ARTICLE_MODULE.POLICY_LXT"></article-wrapper>
            <article-wrapper class="flex-1 flex flex-col" v-show="platform === PlatformType.ShiZongFu" tab-position="left" :module="ARTICLE_MODULE.POLICY_ZJFW"></article-wrapper>
            </Layout>
        </Board>
    </PagePanel>
</template>

<style lang="scss">

</style>
