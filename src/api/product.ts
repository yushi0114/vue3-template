import { PlatformType, ProductRecommandType } from '@/enums';
import type {
    ListResponse,
    ProductEntity,
    ProductFilterEntity,
    ProductRecommandEntity,
    ProductRequirementEntity,
} from '@/types';
import { DMS_DOMAIN } from './const';
import { api } from './http';

// #region 获取产品列表
export type GetProductsPayload = {
    platform?: PlatformType;
};

export type GetProductsResponse = ListResponse<ProductEntity>;

export function getProducts(payload: GetProductsPayload): Promise<GetProductsResponse> {
    const url = payload.platform === PlatformType.LiaoXinTong ? '/v1/product/list' : '/v1/zjfw/product/list';

    delete payload.platform;
    return api.post(`${DMS_DOMAIN}${url}`, payload);
}

// #endregion

// #region 获取产品详情
export type GetProductPayload = {
    id: ProductEntity['id'];
    platform?: PlatformType;
};

export type GetProductResponse = ProductEntity;

export function getProduct(payload: GetProductPayload): Promise<GetProductResponse> {
    const url = payload.platform === PlatformType.LiaoXinTong ? '/v1/product' : '/v1/zjfw/product';

    delete payload.platform;
    return api.get(`${DMS_DOMAIN}${url}`, {
        params: payload,
    });
}

// #endregion

// #region 获取产品申请列表
export type GetProductReqsPayload = {
    platform?: PlatformType;
};

export type GetProductReqsResponse = ListResponse<ProductRequirementEntity>;

export function getProductReqs(payload: GetProductReqsPayload): Promise<GetProductReqsResponse> {
    const url = payload.platform === PlatformType.LiaoXinTong ? '/v1/product/corp/list' : '/v1/zjfw/product/corp/list';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}

// #endregion

// #region 获取产品筛选项列表
export type GetProductOptionsPayload = {
    platform?: PlatformType;
    menuName?: string;
};

export type GetProductOptionsResponse = ProductEntity[];

export function getProductOptions(payload: GetProductOptionsPayload): Promise<GetProductOptionsResponse> {
    const url = payload.platform === PlatformType.LiaoXinTong ? '/v1/product/all' : '/v1/zjfw/product/all';

    payload.menuName = payload.menuName || (payload.platform === PlatformType.LiaoXinTong ? 'requirement' : 'zjfwapply');

    delete payload.platform;

    return api.get(`${DMS_DOMAIN}${url}`, {
        params: payload
    }).then(res => res.data);
}
// #endregion

// #region 查询信用评分

export type GetProductReqScorePayload = {
    corpName: string;
    corpCode: string;
};

export type GetProductReqScoreResponse = {};

export function getProductReqScore(payload: GetProductReqScorePayload): Promise<GetProductReqScoreResponse> {
    return api.post(`${DMS_DOMAIN}/v1/product/req/score`, payload);
}

// #endregion

// #region 获取产品需求详情
export type GetProductReqPayload = {
    id: ProductRequirementEntity['id'];
};

export type GetProductReqResponse = ProductRequirementEntity;

export function getProductReq(payload: GetProductReqPayload): Promise<GetProductReqResponse> {
    return api.get(`${DMS_DOMAIN}/v1/product/corp`, { params: payload }).then((res: any) => {
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


// #region 创建推荐产品
export type CreateProductRecommendPayload = Pick<ProductRecommandEntity, 'orgProductId' | 'productPoster' | 'productType' | 'status'>;

export type CreateProductRecommendResponse = void;

export function createProductRecommend(payload: CreateProductRecommendPayload): Promise<CreateProductRecommendResponse> {
    return api.post(`${DMS_DOMAIN}/v1/add/product/recommend`, payload);
}

// #endregion

// #region 编辑推荐产品
export type UpdateProductRecommendPayload = Pick<ProductRecommandEntity, 'id' | 'orgProductId' | 'productPoster' | 'productType' | 'status'>;

export type UpdateProductRecommendResponse = void;

export function updateProductRecommend(payload: UpdateProductRecommendPayload): Promise<UpdateProductRecommendResponse> {
    return api.post(`${DMS_DOMAIN}/v1/update/product/recommend`, payload);
}

// #endregion


// #region 推荐产品详情
export type GetProductRecommendPayload = {
    id: ProductRequirementEntity['id'];
};

export type GetProductRecommendResponse = ProductRecommandEntity;

export function getProductRecommend(payload: GetProductRecommendPayload): Promise<GetProductRecommendResponse> {
    return api.get(`${DMS_DOMAIN}/v1/product/recommend/byid`, {
        params: payload,
    })
        .then((res: any) => res[0]);
}

// #endregion

// #region 推荐产品列表
export type GetProductRecommendsPayload = {
    productType: ProductRecommandType;
};

export type GetProductRecommendsResponse = ProductRecommandEntity[];

export function getProductRecommends(payload: GetProductRecommendsPayload): Promise<GetProductRecommendsResponse> {
    return api.get(`${DMS_DOMAIN}/v1/product/recommend`, {
        params: payload,
    });
}

// #endregion

// #region 删除推荐产品
export type DeleteProductRecommendsPayload = {
    id: ProductRecommandEntity['id'];
};

export function deleteProductRecommends(payload: DeleteProductRecommendsPayload) {
    return api.post(`${DMS_DOMAIN}/v1/del/product/recommend`, payload);
}
// #endregion

// #region 获取筛选项列表
export type GetProductFiltersPayload = {
    platform?: PlatformType;
};

export type GetProductFiltersResponse = ListResponse<ProductFilterEntity>;

export function getProductFilters(payload: GetProductFiltersPayload): Promise<GetProductFiltersResponse> {
    const url = payload.platform === PlatformType.LiaoXinTong ? '/v1/product/filter' : '/v1/zjfw/product/filter';

    delete payload.platform;
    return api.get(`${DMS_DOMAIN}${url}`, {
        params: payload,
    });
}
// #endregion

// #region 新增产品
export type AddProductPayload = Omit<ProductEntity, ProductEntity['id']> & {
    platform?: PlatformType;
};

export type AddProductResponse = {};

export function addProduct(payload: AddProductPayload): Promise<AddProductResponse> {
    const url = payload.platform === PlatformType.LiaoXinTong ? '/v1/add/product' : '/v1/zjfw/add/product';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}

// #endregion

// #region 修改产品
export type UpdateProductPayload = AddProductPayload & {
    id: ProductEntity['id'];
};

export type UpdateProductResponse = {};

export function updateProduct(payload: UpdateProductPayload): Promise<UpdateProductResponse> {
    const url = payload.platform === PlatformType.LiaoXinTong ? '/v1/update/product' : '/v1/zjfw/update/product';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}

// #endregion

// #region 修改产品状态
export type UpdateProductStatusPayload = Pick<ProductEntity, 'id' | 'status'> & {
    platform?: PlatformType;
};

export type UpdateProductStatusResponse = {};

export function updateProductStatus(payload: UpdateProductStatusPayload): Promise<UpdateProductResponse> {
    const url =
        payload.platform === PlatformType.LiaoXinTong ? '/v1/update/product/status' : '/v1/zjfw/update/product/status';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}

// #endregion

// #region 删除产品
export type DeleteProductPayload = Pick<ProductEntity, 'id'> & {
    platform?: PlatformType;
};

export type DeleteProductResponse = {};

export function deleteProduct(payload: DeleteProductPayload): Promise<DeleteProductResponse> {
    const url =
        payload.platform === PlatformType.LiaoXinTong ? '/v1/del/product' : '/v1/zjfw/del/product';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}

// #endregion

// #region 判断产品是否在使用
export type UsingProductPayload = Pick<ProductEntity, 'id'> & {
    platform?: PlatformType;
};

export type UsingProductResponse = {};

export function isUsingProduct(payload: UsingProductPayload): Promise<UsingProductResponse> {
    const url =
        payload.platform === PlatformType.LiaoXinTong ? '/v1/is/product/using' : '/v1/zjfw/is/product/using';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}

// #endregion

// #region 新增产品筛选项类别
export type AddProductFilterPayload = Pick<ProductFilterEntity, 'isFilterShow' | 'typeValue'> & {
    platform?: PlatformType;
};

export type AddProductFilterResponse = {};

export function addProductFilter(payload: AddProductFilterPayload): Promise<AddProductFilterResponse> {
    const url =
        payload.platform === PlatformType.LiaoXinTong ? '/v1/add/product/type' : '/v1/zjfw/add/product/type';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}

// #endregion

// #region 新增产品筛选项
export type AddProductFilterOptionsPayload = Pick<ProductFilterEntity, 'isFilterShow' | 'typeCode' | 'filterValue' | 'typeValue'> & {
    platform?: PlatformType;
};

export type AddProductFilterOptionsResponse = {};

export function addProductFilterOptions(payload: AddProductFilterPayload): Promise<AddProductFilterResponse> {
    const url =
        payload.platform === PlatformType.LiaoXinTong ? '/v1/add/product/filter' : '/v1/zjfw/add/product/filter';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}

// #endregion

// #region 修改产品筛选项
export type UpdateProductFilterPayload = Pick<ProductFilterEntity, 'id' | 'isFilterShow'> & {
    platform?: PlatformType;
    typeValue?: ProductFilterEntity['typeValue'];
    filterValue?: ProductFilterEntity['filterValue'];
};

export type UpdateProductFilterResponse = {};

export function updateProductFilter(payload: UpdateProductFilterPayload): Promise<UpdateProductFilterResponse> {
    const url =
        payload.platform === PlatformType.LiaoXinTong ? '/v1/update/product/filter' : '/v1/zjfw/update/product/filter';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}

// #endregion

// #region 删除筛选项信息
export type DeleteProductFilterPayload = Pick<ProductFilterEntity, 'id'> & {
    platform?: PlatformType;
};

export type DeleteProductFilterResponse = {};

export function deleteProductFilter(payload: DeleteProductFilterPayload): Promise<DeleteProductFilterResponse> {
    const url =
        payload.platform === PlatformType.LiaoXinTong ? '/v1/del/product/filter' : '/v1/zjfw/del/product/filter';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}

// #endregion

// #region 修改筛选项排序
export type UpdateProductFilterSortPayload = { data: ProductFilterEntity[] } & {
    platform?: PlatformType;
};

export type UpdateProductFilterSortResponse = {};

export function updateProductFilterSort(payload: UpdateProductFilterSortPayload): Promise<UpdateProductFilterResponse> {
    const url =
        payload.platform === PlatformType.LiaoXinTong ? '/v1/update/product/filter/sort' : '/v1/zjfw/update/product/filter/sort';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}

// #endregion

// #region 删除精准需求（批量，单个）
export type DeleteProductReqsPayload = {
    idArr: string;
    platform?: PlatformType,
}

export type DeleteExactResponse = {};

export function deleteProductReqs(payload: DeleteProductReqsPayload)
    : Promise<DeleteExactResponse>
{
    const url = payload.platform === PlatformType.LiaoXinTong
        ? '/v1/del/corp'
        : '/v1/zjfw/del/corp';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}
// #endregion

// #region 下载企业需求列表
export type DownloadProductReqsPayload = GetProductReqsPayload;

export type DownloadExactResponse = {};

export function downloadProductReqs(payload: DeleteProductReqsPayload)
    : Promise<DeleteExactResponse>
{
    const url = payload.platform === PlatformType.LiaoXinTong
        ? '/v1/export/corp'
        : '/v1/zjfw/export/corp';

    delete payload.platform;

    return api.post(`${DMS_DOMAIN}${url}`, payload);
}
// #endregion
