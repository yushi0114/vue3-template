/*
 * @Description: 新闻政策路由跳转统一管理
 * @FilePath: \dms-web\src\views\article\hooks\useRouterLinkManage.ts
 * @Author: zys
 * @Date: 2022-11-15 09:46:15
 * @LastEditTime: 2022-11-24 11:34:08
 * @LastEditors: zys
 * @Reference:
 */
import { ARTICLE_MODULE, LINK_TYPE, ARTICLE_STATUS } from '@/enums';
import type { NewsItem, PolicyItem, TAB_ITEM } from '@/types';

export const useRouterLinkManage = (module: ARTICLE_MODULE) => {
    const { path } = useRoute();
    const [base, listUrl] = path.split('/');
    const _path = `${base}/${listUrl}`;
    const LINK_MAP = {
        [ARTICLE_MODULE.NEWS_LXT]: {
            [LINK_TYPE.ADD]: _path + LINK_TYPE.ADD,
            [LINK_TYPE.EDIT]: _path + LINK_TYPE.EDIT,
            [LINK_TYPE.DETAIL]: _path + LINK_TYPE.DETAIL,
        },
        [ARTICLE_MODULE.POLICY_LXT]: {
            [LINK_TYPE.ADD]: _path + LINK_TYPE.ADD,
            [LINK_TYPE.EDIT]: _path + LINK_TYPE.EDIT,
            [LINK_TYPE.DETAIL]: _path + LINK_TYPE.DETAIL,
        },
        [ARTICLE_MODULE.NEWS_ZJFW]: {
            [LINK_TYPE.ADD]: _path + LINK_TYPE.ADD,
            [LINK_TYPE.EDIT]: _path + LINK_TYPE.EDIT,
            [LINK_TYPE.DETAIL]: _path + LINK_TYPE.DETAIL,
        },
        [ARTICLE_MODULE.POLICY_ZJFW]: {
            [LINK_TYPE.ADD]: _path + LINK_TYPE.ADD,
            [LINK_TYPE.EDIT]: _path + LINK_TYPE.EDIT,
            [LINK_TYPE.DETAIL]: _path + LINK_TYPE.DETAIL,
        },
    };

    return LINK_MAP[module];
};

export const useJumpLink = (params: { tab: TAB_ITEM; module: ARTICLE_MODULE }) => {
    const LINK_MAP = useRouterLinkManage(params.module);
    const { push } = useRouter();

    const handleToCreate = () => {
        push(LINK_MAP[LINK_TYPE.ADD]);
    };

    // 编辑操作
    const handleToEdit = ({ row }: { row: NewsItem | PolicyItem }) => {
        push({ path: LINK_MAP[LINK_TYPE.EDIT], query: { id: row.id } });
    };

    // 详情页面
    const handleToDetail = ({ row, status }: { row: NewsItem | PolicyItem; status: ARTICLE_STATUS }) => {
        push({ path: LINK_MAP[LINK_TYPE.DETAIL], query: { id: row.id, tab: params.tab.value, status } });
    };

    return {
        handleToCreate,
        handleToEdit,
        handleToDetail,
    };
};
