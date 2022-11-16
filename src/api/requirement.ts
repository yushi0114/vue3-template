import type { ListResponse, AgileReqEntity, ExactReqEntity } from '@/types';
import { PlatformType } from '@/enums';

import { DMS_DOMAIN } from './const';
import { api } from './http';

// #region 获取敏捷需求列表
export type GetAgileReqsPayload = {
    searchInput?: string,
    pageIndex: number,
    pageSize: number,
    menuName: string,
    progress?: number,
    startTime?: string,
    endTime?: string,
    sortField?: string,
    sortType?: string,
    platform?: PlatformType,
}

export type GetAgileReqsResponse = ListResponse<AgileReqEntity>

export function getAligeReqs(payload: GetAgileReqsPayload)
    : Promise<GetAgileReqsResponse>
{
    const url = payload.platform === PlatformType.LiaoXinTong
        ? '/v1/simple/req/list'
        : '/v1/zjfw/simple/req/list';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}
// #endregion


// #region 获取敏捷需求列表
export type GetExactReqsPayload = {
    searchInput?: string,
    pageIndex: number,
    pageSize: number,
    menuName: string,
    progress?: number,
    startTime?: string,
    endTime?: string,
    sortField?: string,
    sortType?: string,
    platform?: PlatformType,
}

export type GetExactReqsResponse = ListResponse<ExactReqEntity>

export function getExactReqs(payload: GetExactReqsPayload)
    : Promise<GetExactReqsResponse>
{
    const url = payload.platform === PlatformType.LiaoXinTong
        ? '/v1/exact/req/list'
        : '/v1/zjfw/exact/req/list';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}
// #endregion
