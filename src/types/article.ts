/*
 * @Description:
 * @FilePath: \dms-web\src\types\article.ts
 * @Author: zys
 * @Date: 2022-11-14 15:13:12
 * @LastEditTime: 2023-01-04 11:04:28
 * @LastEditors: zys
 * @Reference:
 */
import type { ARTICLE_STATUS, NEWS_TYPE, SORT_TYPE, ARTICLE_STATUS_LABEL, UPLOAD_FILE_TYPE } from '@/enums';
import type { IListQueryParams, IListCommonResult, ICommonResult } from '@/api/types';

export type ArticleSortItem = {
    sortType: SORT_TYPE;
    sortField: string;
    label: string;
};
export type TAB_ITEM = {
    title: ARTICLE_STATUS_LABEL;
    value: ARTICLE_STATUS;
    queryParams: NewsListParams;
    filterOption: {name: ARTICLE_STATUS_LABEL, value: ARTICLE_STATUS}[]
};
export type NewsListParams = IListQueryParams<{
    searchInput?: string;
    status?: ARTICLE_STATUS;
    updateBy?: string;
}>;

export type NewsItem = {
    id: string;
    sort: number;
    title: string;
    subTitle?: string;
    summary: string;
    origin: string;
    thumbnail: string;
    status: ARTICLE_STATUS;
    publishDate: string;
    hotNews: NEWS_TYPE;
    content: string;
};

export type PolicyItem = Omit<NewsItem, 'thumbnail'>;

export type NewsListResponse = IListCommonResult<NewsItem>;

export type NewsDetailParams = Pick<NewsItem, 'id'>;

export type NewsDetailResponse = (ICommonResult & NewsItem)[];

export type CreateNewsParams = Omit<NewsItem, 'id'>;

export type CreateNewsResponse = { updateTime: string, id: string };

export type UpdateNewsParams = NewsItem;

export type UploadFileParams = { file: File; fileType: UPLOAD_FILE_TYPE };

export type UploadFileResponse = { imgUrl: string };

export type DeleteFileParams = Pick<NewsItem, 'id'>;

export type DeleteNewsParams = Pick<NewsItem, 'id'> & { remotePathArray: string[]};

export type UpdateNewsSortParams = Pick<NewsItem, 'id' | 'sort'>;

export type UpdateNewsStatusParams = Pick<NewsItem, 'id' | 'status'>;

export type UpdateNewsHotParams = Pick<NewsItem, 'id' | 'hotNews'>;

export type PolicyListParams = IListQueryParams<{
    title?: string;
    status?: ARTICLE_STATUS;
    updateBy?: string;
}>;

export type PolicyListResponse = IListCommonResult<PolicyItem>;

export type PolicyDetailResponse = ICommonResult & PolicyItem;

export type CreatePolicyParams = Omit<PolicyItem, 'id'>;

export type CreatePolicyResponse = CreateNewsResponse;

export type UpdatePolicyParams = PolicyItem;
