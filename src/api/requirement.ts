import type { ListResponse } from '@/types';
import type { AgileReqEntity } from '@/types/requirement';
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
}

export type GetAgileReqsResponse = {}

export function getAligeReqs(payload: GetAgileReqsPayload)
    : Promise<ListResponse<AgileReqEntity>>
{
    return api.post(`${DMS_DOMAIN}/v1/simple/req/list`, payload);
}
// #endregion
