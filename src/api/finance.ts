import { DMS_DOMAIN } from './const';
import { api } from './http';
import type { ListResponse } from '@/types/util';

export type CityPagePayload = {
    name: string,
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortType: string
}

export type AddCityPayload = {
    name: string,
    code: string,
    sort: number | string
}

export type DeleteCityPayload = {
    id: string
}

export type updateCityPayload = AddCityPayload & {
    id: string
}

export interface CityEntity {
    id: string,
    name: string,
    code: string,
    sort: number,
    createBy: string,
    createTime: string,
    updateBy: string,
    updateTime: string
}

export type GetCityListResponse = ListResponse<CityEntity>;

// 查询城市列表，分页
export function fetchCityList(data: CityPagePayload): Promise<GetCityListResponse> {
    return api.post(`${DMS_DOMAIN}/v1/city/list`, data);
}

// 新建城市
export function createCity(data: AddCityPayload): Promise<GetCityListResponse> {
    return api.post(`${DMS_DOMAIN}/v1/add/city`, data);
}

// 删除城市
export function deleteCity(data: DeleteCityPayload) {
    return api.post(`${DMS_DOMAIN}/v1/del/city`, data);
}

// 编辑城市
export function updateCity(data: updateCityPayload) {
    return api.post(`${DMS_DOMAIN}/v1/update/city`, data);
}
