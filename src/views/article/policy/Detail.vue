<script lang="ts" setup>
import ArticleDetail from '../components/ArticleDetail.vue';
import { ARTICLE_MODULE, PlatformType } from '@/enums';

const route = useRoute();
const platform = ref<PlatformType>(Number(route.params.type));
function handleTabChange(plat: PlatformType) {
    platform.value = plat;
}
</script>

<template>
    <PagePanel full>
        <Board class="article-detail">
            <PlatformTab @tab-change="handleTabChange"></PlatformTab>
            <Layout>
                <article-detail v-show="platform === PlatformType.LiaoXinTong" :platform="PlatformType.LiaoXinTong" :module="ARTICLE_MODULE.POLICY_LXT"></article-detail>
            <article-detail v-show="platform === PlatformType.ShiZongFu"  :platform="PlatformType.ShiZongFu" :module="ARTICLE_MODULE.POLICY_ZJFW"></article-detail>
            </Layout>
        </Board>
    </PagePanel>
</template>

<style lang="scss" scoped>
.article-detail {
    height: 100%;
}
</style>
