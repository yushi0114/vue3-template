import { PlatformType } from '@/enums';
import type { ListResponse, ProductEntity, ProductRequirementEntity } from '@/types';
import { DMS_DOMAIN } from './const';
import { api } from './http';


// #region 获取产品列表
export type GetProductsPayload = {

}

export type GetProductsResponse = ListResponse<ProductEntity>;

export function getProducts(payload: GetProductsPayload): Promise<GetProductsResponse> {
    return api.post(`${DMS_DOMAIN}/v1/product/list`, payload);
}

// #endregion

// #region 获取产品详情
export type GetProductPayload = {
    id: ProductEntity['id']
}

export type GetProductResponse = ProductEntity;

export function getProduct(payload: GetProductPayload): Promise<GetProductResponse> {
    return api.get(`${DMS_DOMAIN}/v1/product`, {
        params: payload
    });
}

// #endregion


// #region 获取产品申请列表
export type GetProductReqsPayload = {
    platform?: PlatformType
}

export type GetProductReqsResponse = ListResponse<ProductRequirementEntity>;

export function getProductReqs(payload: GetProductReqsPayload): Promise<GetProductReqsResponse> {
    const url = payload.platform === PlatformType.LiaoXinTong
        ? '/v1/product/corp/list'
        : '/v1/zjfw/product/corp/list';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}

// #endregion


// #region 获取产品筛选项列表
export type GetProductOptionsPayload = {
    platform?: PlatformType
    menuName?: string
}

export type GetProductOptionsResponse = ProductEntity[];

export function getProductOptions(payload: GetProductOptionsPayload): Promise<GetProductOptionsResponse> {
    const url = payload.platform === PlatformType.LiaoXinTong
        ? '/v1/product/dic'
        : '/v1/zjfw/product/all';

    payload.menuName = payload.platform === PlatformType.LiaoXinTong
        ? 'requirement'
        : 'zjfwapply';

    delete payload.platform;


    return api.post(`${DMS_DOMAIN}${url}`, payload);
}
// #endregion

// #region 查询信用评分

export type GetScorePayload = {
    corpName: string,
    corpCode: string
}

export type GetScoreResponse = {

}

export function getProductReqScore(payload: GetScorePayload) : Promise<GetScoreResponse> {
    return api.post(`${DMS_DOMAIN}/v1/product/req/score`, payload);
}

// #endregion

// #region 获取产品需求详情
export type GetProductReqPayload = {
    id: ProductRequirementEntity['id'],
}

export type GetProductReqResponse = ProductRequirementEntity

export function getProductReq(payload: GetProductReqPayload): Promise<GetProductReqResponse> {
    return api.get(`${DMS_DOMAIN}/v1/product/corp`, { params: payload })
        .then((res: any) => {
            const entity = res;
            entity.dataFirst = (entity.progressArr || []).map((p: any) => {
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
