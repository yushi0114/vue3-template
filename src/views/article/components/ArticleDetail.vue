<script lang="ts" setup>
import type { Recordable } from '@/types/globals';
import ArticleWrapper from '../components/ArticleWrapper.vue';
import DetailContent from './DetailContent.vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DetailLeftList from './DetailLeftList.vue';
import { ARTICLE_MODULE, ARTICLE_STATUS, ARTICLE_API } from '@/enums';
import { useApi } from '@/composables';
import type { ICommonResult } from '@/api/types';
import type { NewsItem } from '@/types';
import { useApiManage, useArticleDetail } from '../hooks';
import { isArray } from 'lodash';
import { xss, replaceHTMLHref } from '@/utils';
const { back } = useRouter();

const { activeId, tabItem, bindDetailListRef, detailListMap } = useArticleDetail();
const props = defineProps<{
    module: ARTICLE_MODULE;
}>();

const ARTICLE_API_MAP = useApiManage(props.module);

// eslint-disable-next-line no-undef
const state: { data: (ICommonResult & NewsItem) | Recordable } = reactive({
    data: {},
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

const publish = async() => {
    await detailListMap.value
        .get(tabItem?.value)
        ._updateNewsStatus({ id: activeId.value, status: ARTICLE_STATUS.PUBLISHED });
    getArticleDetail();
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
        <div class="h-full flex gap-2">
            <div class="w-350px">
                <el-card
                    class="h-full"
                    :body-style="{ height: '100%', 'box-sizing': 'border-box' }">
                    <article-wrapper
                        class="h-full"
                        :module="module"
                        :tab-value="tabItem?.value">
                        <template #default="{ tab, module }">
                            <detail-left-list
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
                    :body-style="{ height: '100%', 'box-sizing': 'border-box', 'overflow-y': 'auto' }">
                    <div class="flex justify-between">
                        <el-button
                            class="mr-2"
                            @click="back">
                            <i-ep-back></i-ep-back>
                            返回</el-button
                        >
                        <el-button
                            v-if="state.data.id && state.data.status !== ARTICLE_STATUS.PUBLISHED"
                            type="primary"
                            @click="publish"
                            ><span class="i-ic-sharp-publish"></span>发布</el-button
                        >
                    </div>
                    <detail-content
                        v-loading="loadingDetail"
                        :data="state.data"
                        :module="module"></detail-content>
                </el-card>
            </div>
        </div>
    </div>
</template>

<style lang="postcss">
.article-detail {
    @apply h-full p-8px box-border;
}
</style>
