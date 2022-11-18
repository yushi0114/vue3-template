import { DMS_DOMAIN } from './const';
import { api } from './http';

export type GetAllCorpListPayload = {
    corpName: string,
    pageNo: number,
    pageSize: number,
    menuName: string
}

export interface CorpEntity {
    id: string,
    corpName: string,
    corpCode: string,
}

export type GetCityListResponse = CorpEntity[];

export type GetReportPayload = {
    corpName: string,
    corpCode: string,
    menuName: string
}

export type ReportDetailResponse = {
    [key: string]: any
}

// 全局搜索企业
export function getAllCorpList(data: GetAllCorpListPayload): Promise<GetCityListResponse> {
    return api.post(`${DMS_DOMAIN}/v1/search/corpName`, data);
}

// 查询企业征信报告
export function getReport(data: GetReportPayload): Promise<ReportDetailResponse> {
    return api.post(`${DMS_DOMAIN}/v1/report`, data);
}
