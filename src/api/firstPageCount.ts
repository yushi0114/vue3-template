import { DMS_DOMAIN } from './const';
import { api } from './http';

export type GetFirstPageDataPayload = {
    menuName: string
};

export type GetFirstPageDataResponse = {
    financeResolve: number,
    financeSuccess: number,
    financialProduct: number,
    registerEnterprise: number
};

export type UpdateHomePageStaticPayload = GetFirstPageDataPayload & GetFirstPageDataResponse;

// 获取首页静态数据
export function getFirstPageData(params: GetFirstPageDataPayload): Promise<GetFirstPageDataResponse>{
    return api.get(`${DMS_DOMAIN}/v1/home/page/statistics`, {
        params
    });
}

// 修改首页静态数据
export function updateHomePageStatic(data: UpdateHomePageStaticPayload) {
    return api.post(`${DMS_DOMAIN}/v1/update/home/page/statistics`, data);
}
