import { DMS_DOMAIN } from './const';
import { api } from './http';
import { HttpContentType } from './types';

import type {
    NewsListParams,
    NewsListResponse,
    NewsDetailParams,
    NewsDetailResponse,
    CreateNewsParams,
    CreateNewsResponse,
    UpdateNewsParams,
    UploadFileParams,
    UploadFileResponse,
    DeleteNewsParams,
    DeleteFileParams,
    UpdateNewsHotParams,
    UpdateNewsSortParams,
    UpdateNewsStatusParams,
    PolicyListResponse,
    PolicyListParams,
    PolicyDetailResponse,
    CreatePolicyParams,
    CreatePolicyResponse,
    UpdatePolicyParams,
} from '@/types';

// 分页查询新闻
export const fetchNewsList = (params: NewsListParams): Promise<NewsListResponse> => {
    return api.get(`${DMS_DOMAIN}/v1/news/list`, {
        params,
    });
};

// 根据id查询新闻明细
export const fetchNewsDetail = (params: NewsDetailParams): Promise<NewsDetailResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/news/details',
        method: 'get',
        params,
    });
};

// 新建新闻
export const createNews = (data: CreateNewsParams): Promise<CreateNewsResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/add/news',
        method: 'post',
        data,
    });
};

// 新闻上传图片
export const uploadLxtFile = (data: UploadFileParams): Promise<UploadFileResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/add/news/file',
        method: 'post',
        data,
        headers: {
            'Content-Type': HttpContentType.formData,
        },
    });
};

// 新闻删除文件
export const deleteLxtFile = (data: DeleteFileParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/del/news/file',
        method: 'post',
        data,
    });
};

// 修改新闻
export const updateNews = (data: UpdateNewsParams): Promise<CreateNewsResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/update/news',
        method: 'post',
        data,
    });
};

// 修改新闻排序
export const updateNewsSort = (data: UpdateNewsSortParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/update/news/sort',
        method: 'post',
        data,
    });
};

// 修改新闻状态
export const updateNewsStatus = (data: UpdateNewsStatusParams) => {
    return api.post(`${DMS_DOMAIN}/v1/update/news/status`, data);
};

// 更新热点新闻
export const updateNewsHot = (data: UpdateNewsHotParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/update/news/hot',
        method: 'post',
        data,
    });
};

// 删除新闻
export const deleteNews = (data: DeleteNewsParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/del/news',
        method: 'post',
        data,
    });
};

// 分页查询政策列表
export const fetchPolicyList = (data: PolicyListParams): Promise<PolicyListResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/policy/list',
        method: 'post',
        data,
    });
};

// 根据id查询政策详情
export const fetchPolicyDetail = (params: NewsDetailParams): Promise<PolicyDetailResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/policy',
        method: 'get',
        params,
    }).then((res: any) => {
        res.publishDate = res.publishDate.split(' ')?.[0];
        return res;
    });
};

// 新建政策
export const createPolicy = (data: CreatePolicyParams): Promise<CreatePolicyResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/add/policy',
        method: 'post',
        data,
    });
};

// 修改政策
export const updatePolicy = (data: UpdatePolicyParams): Promise<CreatePolicyResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/update/policy',
        method: 'post',
        data,
    });
};

// 删除政策
export const deletePolicy = (data: DeleteNewsParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/del/policy',
        method: 'post',
        data,
    });
};

// 修改政策状态
export const updatePolicyStatus = (data: UpdateNewsStatusParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/update/policy/status',
        method: 'post',
        data,
    });
};

// 修改政策排序
export const updatePolicySort = (data: UpdateNewsSortParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/update/policy/sort',
        method: 'post',
        data,
    });
};

// 查询新闻总数
export const fetchNewsCount = () => {
    return api({
        url: DMS_DOMAIN + '/v1/news/total',
        method: 'get',
    });
};

// 查询新闻今日更新数
export const fetchActiveNewsCount = () => {
    return api({
        url: DMS_DOMAIN + '/v1/news/active',
        method: 'get',
    });
};

// 查询政策今日更新数
export const fetchActivePolicyCount = () => {
    return api({
        url: DMS_DOMAIN + '/v1/count/policy',
        method: 'get',
    });
};

// 查询图片是否缩略图
export const isThumbnail = (params: DeleteFileParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/news/isthumbnail',
        method: 'get',
        params,
    });
};

// 查询文件是否存在
export const isExistFile = (data: DeleteFileParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/exists/file',
        method: 'post',
        data,
    });
};

/* 市综服接口----------------------------------------------------- */
// 分页查询新闻
export const fetchNewsListZjfw = (params: NewsListParams): Promise<NewsListResponse> => {
    return api.get(`${DMS_DOMAIN}/v1/zjfw/news/list`, {
        params,
    });
};

// 根据id查询新闻明细
export const fetchNewsDetailZjfw = (params: NewsDetailParams): Promise<NewsDetailResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/news/details',
        method: 'get',
        params,
    });
};

// 新建新闻
export const createNewsZjfw = (data: CreateNewsParams): Promise<CreateNewsResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/add/news',
        method: 'post',
        data,
    });
};

// 新闻上传图片
export const uploadLxtFileZjfw = (data: UploadFileParams): Promise<UploadFileResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/add/news/file',
        method: 'post',
        data,
        headers: {
            'Content-Type': HttpContentType.formData,
        },
    });
};

// 新闻删除文件
export const deleteLxtFileZjfw = (data: DeleteFileParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/del/news/file',
        method: 'post',
        data,
    });
};

// 修改新闻
export const updateNewsZjfw = (data: UpdateNewsParams): Promise<CreateNewsResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/update/news',
        method: 'post',
        data,
    });
};

// 修改新闻排序
export const updateNewsSortZjfw = (data: UpdateNewsSortParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/update/news/sort',
        method: 'post',
        data,
    });
};

// 修改新闻状态
export const updateNewsStatusZjfw = (data: UpdateNewsStatusParams) => {
    return api.post(`${DMS_DOMAIN}/v1/zjfw/update/news/status`, data);
};

// 更新热点新闻
export const updateNewsHotZjfw = (data: UpdateNewsHotParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/update/news/hot',
        method: 'post',
        data,
    });
};

// 删除新闻
export const deleteNewsZjfw = (data: DeleteNewsParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/del/news',
        method: 'post',
        data,
    });
};

// 分页查询政策列表
export const fetchPolicyListZjfw = (data: PolicyListParams): Promise<PolicyListResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/policy/list',
        method: 'post',
        data,
    });
};

// 根据id查询政策详情
export const fetchPolicyDetailZjfw = (params: NewsDetailParams): Promise<PolicyDetailResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/policy',
        method: 'get',
        params,
    }).then((res: any) => {
        res.publishDate = res.publishDate.split(' ')?.[0];
        return res;
    });
};

// 新建政策
export const createPolicyZjfw = (data: CreatePolicyParams): Promise<CreatePolicyResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/add/policy',
        method: 'post',
        data,
    });
};

// 修改政策
export const updatePolicyZjfw = (data: UpdatePolicyParams): Promise<CreatePolicyResponse> => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/update/policy',
        method: 'post',
        data,
    });
};

// 删除政策
export const deletePolicyZjfw = (data: DeleteNewsParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/del/policy',
        method: 'post',
        data,
    });
};

// 修改政策状态
export const updatePolicyStatusZjfw = (data: UpdateNewsStatusParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/update/policy/status',
        method: 'post',
        data,
    });
};

// 修改政策排序
export const updatePolicySortZjfw = (data: UpdateNewsSortParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/update/policy/sort',
        method: 'post',
        data,
    });
};

// 查询新闻总数
export const fetchNewsCountZjfw = () => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/news/total',
        method: 'get',
    });
};

// 查询新闻今日更新数
export const fetchActiveNewsCountZjfw = () => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/news/active',
        method: 'get',
    });
};

// 查询政策今日更新数
export const fetchActivePolicyCountZjfw = () => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/count/policy',
        method: 'get',
    });
};

// 查询图片是否缩略图
export const isThumbnailZjfw = (params: DeleteFileParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/news/isthumbnail',
        method: 'get',
        params,
    });
};

// 查询文件是否存在
export const isExistFileZjfw = (data: DeleteFileParams) => {
    return api({
        url: DMS_DOMAIN + '/v1/zjfw/exists/file',
        method: 'post',
        data,
    });
};
