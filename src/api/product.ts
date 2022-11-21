import { PlatformType } from '@/enums';
import type { ListResponse, ProductEntity, ProductRequirementEntity } from '@/types';
import { DMS_DOMAIN } from './const';
import { api } from './http';


// #region 获取产品列表
export type GetProductPayload = {

}

export type GetProductResponse = ListResponse<ProductEntity>;

export function getProducts(payload: GetProductPayload): Promise<GetProductResponse> {
    return api.post(`${DMS_DOMAIN}/v1/product/list`, payload);
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
