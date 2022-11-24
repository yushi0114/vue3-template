import { DMS_DOMAIN } from './const';
import { api } from './http';

export type GetAllCorpListPayload = {
    corpName: string,
    pageNo: number,
    pageSize: number
}

export interface CorpEntity {
    id: string,
    corpName: string,
    corpCode: string,
}

export type GetCityListResponse = CorpEntity[];

export type GetScorePayload = {
    corpName: string,
    corpCode: string
}

export type ScoreDetailResponse = {
    [key: string]: any
}

// 全局搜索企业
export function getAllCorpList(data: GetAllCorpListPayload): Promise<GetCityListResponse> {
    return api.post(`${DMS_DOMAIN}/v1/search/corpName`, data);
}

// 查询企业征信报告
export function getScore(data: GetScorePayload): Promise<ScoreDetailResponse> {
    return api.post(`${DMS_DOMAIN}/v1/score`, data);
}
