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

// #region 获取敏捷需求详情
export type GetAgileReqPayload = {
    id: AgileReqEntity['id'],
}

export type GetAgileReqResponse = AgileReqEntity

export function getAgileReq(payload: GetAgileReqPayload): Promise<GetAgileReqResponse> {
    return api.get(`${DMS_DOMAIN}/v1/simple/req`, { params: payload });
}
// #endregion

// #region 获取精准需求列表
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

// #region 获取精准需求详情
export type GetExactReqPayload = {
    id: ExactReqEntity['id'],
}

export type GetExactReqResponse = ExactReqEntity

export function getExactReq(payload: GetExactReqPayload): Promise<GetExactReqResponse> {
    return api.get(`${DMS_DOMAIN}/v1/exact/req`, { params: payload })
        .then((res: any) => {
            const entity = res[0];
            entity.dataFirst = (entity.reqProgress[0].typeOne || []).map((p: any) => {
                return {
                    ...p,
                    orgProgress: p.progress,
                    orgProgressOpinion: p.progressOpinion,
                    orgProgressStatus: p.progressStatus,
                };
            });
            entity.dataSecond = (entity.reqProgress[1].typeTwo || []).map((p: any) => {
                return {
                    ...p,
                    orgProgress: p.progress,
                    orgProgressOpinion: p.progressOpinion,
                    orgProgressStatus: p.progressStatus,
                };
            });
            return entity;
        });
}
// #endregion

// #region 查询信用评分

export type GetExactReqScorePayload = {
    corpName: string,
    corpCode: string
}

export type GetExactReqScoreResponse = {

}

export function getExactReqScore(payload: GetExactReqScorePayload) : Promise<GetExactReqScoreResponse> {
    return api.post(`${DMS_DOMAIN}/v1/exact/req/score`, payload);
}

// #endregion
