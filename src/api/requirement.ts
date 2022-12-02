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
    platform?: PlatformType,
}

export type GetAgileReqResponse = AgileReqEntity

export function getAgileReq(payload: GetAgileReqPayload): Promise<GetAgileReqResponse> {
    const url = payload.platform === PlatformType.LiaoXinTong
        ? '/v1/simple/req'
        : '/v1/zjfw/simple/req';

    delete payload.platform;
    return api.get(`${DMS_DOMAIN}${url}`, { params: payload });
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
    platform?: PlatformType,
}

export type GetExactReqResponse = ExactReqEntity

export function getExactReq(payload: GetExactReqPayload): Promise<GetExactReqResponse> {
    const url = payload.platform === PlatformType.LiaoXinTong
        ? '/v1/exact/req'
        : '/v1/zjfw/exact/req';

    delete payload.platform;
    return api.get(`${DMS_DOMAIN}${url}`, { params: payload })
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
    corpCode: string;
    platform?: PlatformType,
}

export type GetExactReqScoreResponse = {

}

export function getExactReqScore(payload: GetExactReqScorePayload) : Promise<GetExactReqScoreResponse> {
    const url = payload.platform === PlatformType.LiaoXinTong
        ? '/v1/exact/req/score'
        : '/v1/zjfw/exact/req/score';

    delete payload.platform;
    return api.post(`${DMS_DOMAIN}${url}`, payload);
}

// #endregion

// #region 删除精准需求（批量，单个）
export type DeleteExactReqsPayload = {
    idArr: string;
    platform?: PlatformType,
}

export type DeleteExactReqsponse = ListResponse<ExactReqEntity>

export function deleteExactReqs(payload: DeleteExactReqsPayload)
    : Promise<GetExactReqsResponse>
{
    const url = payload.platform === PlatformType.LiaoXinTong
        ? '/v1/del/exact/req'
        : '/v1/zjfw/del/exact/req';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}
// #endregion

// #region 删除敏捷需求（批量，单个）
export type DeleteAgileReqsPayload = {
    idArr: string;
    platform?: PlatformType,
}

export type DeleteAgileReqsponse = ListResponse<ExactReqEntity>

export function deleteAgileReqs(payload: DeleteExactReqsPayload)
    : Promise<GetExactReqsResponse>
{
    const url = payload.platform === PlatformType.LiaoXinTong
        ? '/v1/del/simple/req'
        : '/v1/zjfw/del/simple/req';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}
// #endregion
