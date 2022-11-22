/*
 * @Description:
 * @FilePath: \dms-web\src\views\article\hooks\useDetail.ts
 * @Author: zys
 * @Date: 2022-11-16 17:07:16
 * @LastEditTime: 2022-11-22 16:38:22
 * @LastEditors: zys
 * @Reference:
 */
import { useQueryParams } from '@/composables';
import { TAB_LIST } from '../constants';
import { ARTICLE_STATUS, ARTICLE_MODULE, ARTICLE_TYPE_LABEL } from '@/enums';
export const useArticleDetail = () => {
    const { queryParams } = useQueryParams({
        id: '',
        tab: ARTICLE_STATUS.ALL,
        status: ARTICLE_STATUS.ALL,
    });

    const activeId = ref<string>(queryParams.value.id as string);

    const tabItem = TAB_LIST.find(
        (tabItem) => tabItem.value === (queryParams.value.tab ? Number(queryParams.value.tab) : ARTICLE_STATUS.ALL)
    );

    const articleStatus = ref<ARTICLE_STATUS>(queryParams.value.status as ARTICLE_STATUS);

    const detailListMap = ref(new Map());

    const bindDetailListRef = (el: any, key: ARTICLE_STATUS) => {
        if (el) {
            detailListMap.value.set(key, el);
        }
    };

    // const handleTabChange = (tabName: ARTICLE_STATUS) => {
    //     goQuery({ tab: tabName });
    // };

    // watch(activeId, () => {
    //     goQuery({ id: activeId.value });
    // });
    return {
        activeId,
        tabItem,
        articleStatus,
        detailListMap,
        bindDetailListRef,
        // handleTabChange,
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
