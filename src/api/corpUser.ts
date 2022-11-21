import { DMS_DOMAIN } from './const';
import { api } from './http';

export type GetUserListPayload = {
    pageIndex: number
    pageSize: number
    sortField: string
    sortType: string
    searchInput: string,
    menuName: string
}

export interface UserEntity {
    id: string,
    account: string,
    createTime: string,
    updateTime: string,
    status: number
}

export interface ListResponse<T = any> {
    total: number,
    data: T[]
}

export type GetUserListResponse = ListResponse<UserEntity>

export type updateStatusPayload = {
    account: string,
    menuName: string,
    status: number
}

export type UpdateStatusResponse = {
    account: string,
    status: number
};

export type GetShopCartInfoPayload = {
    id: string,
    pageIndex: number
    pageSize: number,
    searchInput: string,
};

export interface ShopEntity {
    guarantyStyle: string,
    loanDue: string,
    loanLimit: string,
    name: string,
    orgName: string,
    productId: string,
    referenceRate: string,
    status: number
}

export type GetShopCartInfoResponse = ListResponse<ShopEntity>

export type DeleteBatchUserPayload = {
    idArr: Array<string>
};

// 查询企业用户-用户管理列表页(辽信通)
export function getBusinessUser(params: GetUserListPayload): Promise<GetUserListResponse>{
    return api.get(`${DMS_DOMAIN}/v1/corp/user/list`, {
        params
    });
}

// 修改企业用户状态(辽信通)
export function updateBusinessUserStatus(data: updateStatusPayload): Promise<UpdateStatusResponse>{
    return api.post(`${DMS_DOMAIN}/v1/update/corp/user/status`, data);
}

// 查询企业用户-用户管理列表页(市综服)
export function getZfBusinessUser(params: GetUserListPayload): Promise<GetUserListResponse>{
    return api.get(`${DMS_DOMAIN}/v1/zjfw/corp/user/list`, {
        params
    });
}

// 修改企业用户状态(市综服)
export function updateZfBusinessUserStatus(data: updateStatusPayload): Promise<UpdateStatusResponse>{
    return api.post(`${DMS_DOMAIN}/v1/zjfw/update/corp/user/status`, data);
}

// 查询购物车详情(辽信通)
export function getShopCartInfo(params: GetShopCartInfoPayload): Promise<GetShopCartInfoResponse>{
    return api.get(`${DMS_DOMAIN}/v1/Cart/products`, {
        params
    });
}

// 查询购物车详情(市综服)
export function getZfShopCartInfo(params: GetShopCartInfoPayload): Promise<GetShopCartInfoResponse>{
    return api.get(`${DMS_DOMAIN}/v1/zjfw/Cart/products`, {
        params
    });
}

// 批量删除用户(辽信通)
export function deleteBatchUser(data: DeleteBatchUserPayload) {
    return api.post(`${DMS_DOMAIN}/v1/del/corp/user`, data);
}

// 批量删除用户(市综服)
export function deleteZfBatchUser(data: DeleteBatchUserPayload) {
    return api.post(`${DMS_DOMAIN}/v1/zjfw/del/corp/user`, data);
}
