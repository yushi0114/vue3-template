/*
 * @Description:
 * @FilePath: \dms-web\src\views\article\hooks\useDetail.ts
 * @Author: zys
 * @Date: 2022-11-16 17:07:16
 * @LastEditTime: 2022-11-17 15:01:17
 * @LastEditors: zys
 * @Reference:
 */

import { TAB_LIST } from '../constants';
import { ARTICLE_STATUS, ARTICLE_MODULE, ARTICLE_TYPE_LABEL } from '@/enums';
export const useArticleDetail = () => {
    const {
        query: { id = '', tab = ARTICLE_STATUS.ALL, status = ARTICLE_STATUS.ALL },
    } = useRoute();

    const activeId = ref<string>(id as string);

    const tabItem = TAB_LIST.find((tabItem) => tabItem.value === (tab ? Number(tab) : ARTICLE_STATUS.ALL));

    const articleStatus = ref<ARTICLE_STATUS>(status as ARTICLE_STATUS);

    const detailListMap = ref(new Map());

    const bindDetailListRef = (el: any, key: ARTICLE_STATUS) => {
        if (el) {
            detailListMap.value.set(key, el);
        }
    };
    return {
        activeId,
        tabItem,
        articleStatus,
        detailListMap,
        bindDetailListRef,
    };
};

export const useArticleModule = (module: ARTICLE_MODULE) => {
    const isNewsModule = computed(() => {
        return [ARTICLE_MODULE.NEWS_LXT, ARTICLE_MODULE.NEWS_ZJFW].includes(module);
    });

    const getArticleTypeLabel = computed(() => {
        if ([ARTICLE_MODULE.NEWS_LXT, ARTICLE_MODULE.NEWS_ZJFW].includes(module)) {
            return ARTICLE_TYPE_LABEL.NEWS;
        } else {
            return ARTICLE_TYPE_LABEL.POLICY;
        }
    });
    return {
        isNewsModule,
        getArticleTypeLabel,
    };
};
