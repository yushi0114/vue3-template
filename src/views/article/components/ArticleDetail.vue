<script lang="ts" setup>
import ArticleWrapper from '../components/ArticleWrapper.vue';
import DetailContent from './DetailContent.vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DetailLeftList from './DetailLeftList.vue';
import { ARTICLE_MODULE, ARTICLE_STATUS, ARTICLE_API, ARTICLE_PAGE } from '@/enums';
import { useApi } from '@/composables';
import type { ICommonResult } from '@/api/types';
import type { NewsItem } from '@/types';
import { useTable, useArticleDetail } from '../hooks';
const { back } = useRouter();

const { activeId, tabItem, bindDetailListRef, detailListMap } = useArticleDetail();
const props = defineProps<{
    module: ARTICLE_MODULE;
}>();

const { ARTICLE_API_MAP } = useTable(tabItem!, props.module, ARTICLE_PAGE.DETAIL);

// eslint-disable-next-line no-undef
const state: { data: (ICommonResult & NewsItem) | Recordable } = reactive({
    data: {},
});

const { loading: loadingDetail, request: getArticleDetail } = useApi(() => ARTICLE_API_MAP[ARTICLE_API.LOAD_ARTICLE_DETAIL]({ id: activeId.value }), {
    onSuccess([data]) {
        state.data = data;
    },
    onError() {
        state.data = {};
    },
});

const publish = async() => {
    await detailListMap.value
        .get(tabItem?.value)
        ._updateNewsStatus({ id: activeId.value, status: ARTICLE_STATUS.PUBLISHED });
    getArticleDetail();
};

watch(activeId, () => {
    console.log('activeId: ', activeId);
    if (!activeId.value) {
        state.data = {};
        console.log('state.data: ', state.data);
        return false;
    }
    getArticleDetail();
});

onBeforeMount(() => {
    if (activeId.value) {
        getArticleDetail();
    }
});
</script>

<template>
    <div class="article-detail">
        <el-row :gutter="16" class="!mx-0 h-full">
            <el-col :span="6">
                <el-card class="h-full">
                    <article-wrapper :module="module" :tab-value="tabItem?.value">
                        <template #default="{ tab, module }">
                            <detail-left-list
                                :ref="(el) => bindDetailListRef(el, tab.value)"
                                v-model:active-id="activeId"
                                :tab="tab"
                                :module="module"
                                @refresh="getArticleDetail">
                            </detail-left-list>
                        </template>
                    </article-wrapper>
                </el-card>
            </el-col>

            <el-col :span="18">
                <el-card class="h-full">
                    <div class="flex justify-between">
                        <el-button class="mr-2" @click="back">返回</el-button>
                        <el-button
                            v-if="state.data.id && state.data.status !== ARTICLE_STATUS.PUBLISHED"
                            type="primary"
                            @click="publish"
                            >发布</el-button
                        >
                    </div>
                    <detail-content v-loading="loadingDetail" :data="state.data" :module="module"></detail-content>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="postcss">
.article-detail {
    @apply h-full p-8px box-border;
}
</style>
