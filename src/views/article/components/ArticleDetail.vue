<script lang="ts" setup>
import { Back, Sell } from '@element-plus/icons-vue';
import ArticleWrapper from '../components/ArticleWrapper.vue';
import DetailContent from './DetailContent.vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DetailLeftList from './DetailLeftList.vue';
import { ARTICLE_MODULE, ARTICLE_STATUS, ARTICLE_API, PlatformType } from '@/enums';
import { useApi } from '@/composables';
import type { ICommonResult } from '@/api/types';
import type { NewsItem } from '@/types';
import { useApiManage, useArticleDetail, useJumpLink } from '../hooks';
import { isArray } from 'lodash';
import { xss, replaceHTMLHref } from '@/utils';
import { TAB_LIST } from '../constants';
const { params } = useRoute();

const props = defineProps<{
    module: ARTICLE_MODULE;
    platform: PlatformType;
}>();

let { activeId, tabItem, bindDetailListRef, detailListMap } = useArticleDetail();

if (props.platform !== Number((params.type as unknown as PlatformType))) {
    activeId.value = '';
    tabItem = TAB_LIST.find(
        (tabItem) => tabItem.value === ARTICLE_STATUS.ALL
    );
}
const { handleToList } = useJumpLink({ module: props.module, tab: tabItem });

const ARTICLE_API_MAP = useApiManage(props.module);

// eslint-disable-next-line no-undef
const state: { data: (ICommonResult & NewsItem) | Recordable; loadingPublish: boolean } = reactive({
    data: {},
    loadingPublish: false,
});

const { loading: loadingDetail, request: getArticleDetail } = useApi(
    () => ARTICLE_API_MAP[ARTICLE_API.LOAD_ARTICLE_DETAIL]({ id: activeId.value }),
    {
        onSuccess(data) {
            let temp: any = {};
            if (isArray(data)) {
                temp = data[0];
            } else {
                temp = data;
            }
            state.data = { ...temp, content: replaceHTMLHref(xss.process(temp.content)) };
        },
        onError() {
            state.data = {};
        },
    }
);

const publish = async () => {
    state.loadingPublish = true;
    try {
        await detailListMap.value
            .get(tabItem?.value)
            ._updateNewsStatus({ id: activeId.value, status: ARTICLE_STATUS.PUBLISHED });
        state.loadingPublish = false;
        getArticleDetail();
    } catch {
        state.loadingPublish = false;
    }
};

watch(activeId, () => {
    if (!activeId.value) {
        state.data = {};
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
        <div class="article-detail-left">
            <el-card
                class="h-full"
                shadow="never"
                :body-style="{ height: '100%', 'box-sizing': 'border-box' }">
                <article-wrapper
                    class="wrapper"
                    :module="module"
                    tab-position="top"
                    :tab-value="tabItem?.value">
                    <template #default="{ tab, module, activeName }">
                        <detail-left-list
                            v-if="tab.value === activeName"
                            class="h-full flex flex-col"
                            :ref="(el) => bindDetailListRef(el, tab.value)"
                            v-model:active-id="activeId"
                            :tab="tab"
                            :module="module"
                            @refresh="getArticleDetail">
                        </detail-left-list>
                    </template>
                </article-wrapper>
            </el-card>
        </div>

        <div class="flex-1 min-w-0">
            <el-card
                class="h-full overflow-y-auto"
                shadow="never"
                :body-style="{ height: '100%', 'box-sizing': 'border-box', 'overflow-y': 'auto' }">
                <div class="flex justify-between gap-xs">
                    <el-button
                        :icon="Back"
                        @click="handleToList">
                        返回</el-button
                    >
                    <el-button
                        v-if="state.data.id && state.data.status !== ARTICLE_STATUS.PUBLISHED"
                        type="primary"
                        :icon="Sell"
                        :loading="state.loadingPublish"
                        @click="publish"
                        >发布</el-button
                    >
                </div>
                <detail-content
                    v-loading="loadingDetail"
                    element-loading-text="加载中"
                    :data="state.data"
                    :module="module"></detail-content>
            </el-card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.article-detail {
    height: 100%;
    padding: $gap-xs;
    box-sizing: border-box;
    display: flex;
    gap: $gap-xs;
    &-left {
        width: 350px;
    }
}
</style>
