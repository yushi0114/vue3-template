/*
 * @Description: 新闻政策api统一管理
 * @FilePath: \dms-web\src\views\article\hooks\useApiManage.ts
 * @Author: zys
 * @Date: 2022-11-15 09:46:15
 * @LastEditTime: 2022-11-18 14:41:45
 * @LastEditors: zys
 * @Reference:
 */
import { ARTICLE_MODULE, ARTICLE_API } from '@/enums';
import {
    fetchNewsList,
    fetchNewsDetail,
    createNews,
    updateNews,
    updateNewsStatus,
    updateNewsSort,
    updateNewsHot,
    uploadLxtFile,
    deleteLxtFile,
    deleteNews,
    fetchPolicyList,
    fetchPolicyDetail,
    createPolicy,
    updatePolicy,
    updatePolicyStatus,
    updatePolicySort,
    deletePolicy,
    fetchNewsListZjfw,
    fetchNewsDetailZjfw,
    createNewsZjfw,
    updateNewsZjfw,
    updateNewsStatusZjfw,
    updateNewsSortZjfw,
    updateNewsHotZjfw,
    uploadLxtFileZjfw,
    deleteLxtFileZjfw,
    deleteNewsZjfw,
    fetchPolicyListZjfw,
    fetchPolicyDetailZjfw,
    createPolicyZjfw,
    updatePolicyZjfw,
    updatePolicyStatusZjfw,
    updatePolicySortZjfw,
    deletePolicyZjfw,
} from '@/api';
export const useApiManage = (module: ARTICLE_MODULE) => {
    const API_MAP = {
        [ARTICLE_MODULE.NEWS_LXT]: {
            [ARTICLE_API.LOAD_LIST]: fetchNewsList,
            [ARTICLE_API.LOAD_ARTICLE_DETAIL]: fetchNewsDetail,
            [ARTICLE_API.ADD_ARTICLE]: createNews,
            [ARTICLE_API.UPDATE_ARTICLE]: updateNews,
            [ARTICLE_API.UPDATE_ARTICLE_STATUS]: updateNewsStatus,
            [ARTICLE_API.UPDATE_ARTICLE_SORT]: updateNewsSort,
            [ARTICLE_API.UPDATE_HOT_NEWS]: updateNewsHot,
            [ARTICLE_API.UPLOAD_FILE]: uploadLxtFile,
            [ARTICLE_API.DELETE_FILE]: deleteLxtFile,
            [ARTICLE_API.DELETE_ARTICLE]: deleteNews,
        },
        [ARTICLE_MODULE.POLICY_LXT]: {
            [ARTICLE_API.LOAD_LIST]: fetchPolicyList,
            [ARTICLE_API.LOAD_ARTICLE_DETAIL]: fetchPolicyDetail,
            [ARTICLE_API.ADD_ARTICLE]: createPolicy,
            [ARTICLE_API.UPDATE_ARTICLE]: updatePolicy,
            [ARTICLE_API.UPDATE_ARTICLE_STATUS]: updatePolicyStatus,
            [ARTICLE_API.UPDATE_ARTICLE_SORT]: updatePolicySort,
            [ARTICLE_API.UPLOAD_FILE]: uploadLxtFile,
            [ARTICLE_API.DELETE_FILE]: deleteLxtFile,
            [ARTICLE_API.DELETE_ARTICLE]: deletePolicy,
        },
        [ARTICLE_MODULE.NEWS_ZJFW]: {
            [ARTICLE_API.LOAD_LIST]: fetchNewsListZjfw,
            [ARTICLE_API.LOAD_ARTICLE_DETAIL]: fetchNewsDetailZjfw,
            [ARTICLE_API.ADD_ARTICLE]: createNewsZjfw,
            [ARTICLE_API.UPDATE_ARTICLE]: updateNewsZjfw,
            [ARTICLE_API.UPDATE_ARTICLE_STATUS]: updateNewsStatusZjfw,
            [ARTICLE_API.UPDATE_ARTICLE_SORT]: updateNewsSortZjfw,
            [ARTICLE_API.UPDATE_HOT_NEWS]: updateNewsHotZjfw,
            [ARTICLE_API.UPLOAD_FILE]: uploadLxtFileZjfw,
            [ARTICLE_API.DELETE_FILE]: deleteLxtFileZjfw,
            [ARTICLE_API.DELETE_ARTICLE]: deleteNewsZjfw,
        },
        [ARTICLE_MODULE.POLICY_ZJFW]: {
            [ARTICLE_API.LOAD_LIST]: fetchPolicyListZjfw,
            [ARTICLE_API.LOAD_ARTICLE_DETAIL]: fetchPolicyDetailZjfw,
            [ARTICLE_API.ADD_ARTICLE]: createPolicyZjfw,
            [ARTICLE_API.UPDATE_ARTICLE]: updatePolicyZjfw,
            [ARTICLE_API.UPDATE_ARTICLE_STATUS]: updatePolicyStatusZjfw,
            [ARTICLE_API.UPDATE_ARTICLE_SORT]: updatePolicySortZjfw,
            [ARTICLE_API.UPDATE_HOT_NEWS]: updateNewsHotZjfw,
            [ARTICLE_API.UPLOAD_FILE]: uploadLxtFileZjfw,
            [ARTICLE_API.DELETE_FILE]: deleteLxtFileZjfw,
            [ARTICLE_API.DELETE_ARTICLE]: deletePolicyZjfw,
        },
    };

    return API_MAP[module];
};
