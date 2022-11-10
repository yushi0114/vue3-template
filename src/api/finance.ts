import { DMS_DOMAIN } from './const';
import { api } from './http';
import type { ListResponse } from '@/types/util';

export type CityPagePayload = {
    name: string,
    pageIndex: number,
    pageSize: number,
    menuName: string,
    sortField: string,
    sortType: string
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
// export function createCity(data: CityPagePayload): Promise<GetCityListResponse> {
//     return api.post(`${DMS_DOMAIN}/v1/add/city`, data);
// }
