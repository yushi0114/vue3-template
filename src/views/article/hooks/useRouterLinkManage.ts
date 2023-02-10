/*
 * @Description: 新闻政策路由跳转统一管理
 * @FilePath: \dms-web\src\views\article\hooks\useRouterLinkManage.ts
 * @Author: zys
 * @Date: 2022-11-15 09:46:15
 * @LastEditTime: 2023-01-04 10:45:49
 * @LastEditors: zys
 * @Reference:
 */
import { ARTICLE_MODULE, LINK_TYPE, ARTICLE_STATUS, PlatformType } from '@/enums';
import type { NewsItem, PolicyItem, TAB_ITEM } from '@/types';
import { TAB_LIST } from '../constants';

export const useRouterLinkManage = (module: ARTICLE_MODULE) => {
    const genPath = (platform: PlatformType, type?: LINK_TYPE) => {
        const { path: routePath } = useRoute();
        const [root, base, listUrl] = routePath.split('/');
        const path = `${root}/${base}/${listUrl}/${platform}`;
        return `${path}${type ? type + '/' : ''}`;
    };

    const LINK_MAP = {
        [ARTICLE_MODULE.NEWS_LXT]: {
            [LINK_TYPE.ADD]: genPath(PlatformType.LiaoXinTong, LINK_TYPE.ADD),
            [LINK_TYPE.EDIT]: genPath(PlatformType.LiaoXinTong, LINK_TYPE.EDIT),
            [LINK_TYPE.DETAIL]: genPath(PlatformType.LiaoXinTong, LINK_TYPE.DETAIL),
            [LINK_TYPE.LIST]: genPath(PlatformType.LiaoXinTong),
        },
        [ARTICLE_MODULE.POLICY_LXT]: {
            [LINK_TYPE.ADD]: genPath(PlatformType.LiaoXinTong, LINK_TYPE.ADD),
            [LINK_TYPE.EDIT]: genPath(PlatformType.LiaoXinTong, LINK_TYPE.EDIT),
            [LINK_TYPE.DETAIL]: genPath(PlatformType.LiaoXinTong, LINK_TYPE.DETAIL),
            [LINK_TYPE.LIST]: genPath(PlatformType.LiaoXinTong),
        },
        [ARTICLE_MODULE.NEWS_ZJFW]: {
            [LINK_TYPE.ADD]: genPath(PlatformType.ShiZongFu, LINK_TYPE.ADD),
            [LINK_TYPE.EDIT]: genPath(PlatformType.ShiZongFu, LINK_TYPE.EDIT),
            [LINK_TYPE.DETAIL]: genPath(PlatformType.ShiZongFu, LINK_TYPE.DETAIL),
            [LINK_TYPE.LIST]: genPath(PlatformType.ShiZongFu),
        },
        [ARTICLE_MODULE.POLICY_ZJFW]: {
            [LINK_TYPE.ADD]: genPath(PlatformType.ShiZongFu, LINK_TYPE.ADD),
            [LINK_TYPE.EDIT]: genPath(PlatformType.ShiZongFu, LINK_TYPE.EDIT),
            [LINK_TYPE.DETAIL]: genPath(PlatformType.ShiZongFu, LINK_TYPE.DETAIL),
            [LINK_TYPE.LIST]: genPath(PlatformType.ShiZongFu),
        },
    };

    return LINK_MAP[module];
};

export const useJumpLink = (params: { tab?: TAB_ITEM; module: ARTICLE_MODULE } = { tab: TAB_LIST[0], module: ARTICLE_MODULE.NEWS_LXT }) => {
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
        push({ path: LINK_MAP[LINK_TYPE.DETAIL], query: { id: row.id, tab: params.tab!.value, status } });
    };

    // 列表页面
    const handleToList = () => {
        push({ path: LINK_MAP[LINK_TYPE.LIST] });
    };

    return {
        handleToCreate,
        handleToEdit,
        handleToDetail,
        handleToList,
    };
};
