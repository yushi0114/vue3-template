import type { ListResponse, ProductEntity } from '@/types';
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
