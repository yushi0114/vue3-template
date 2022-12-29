import {api} from '@/api';
import {DMS_DOMAIN} from '@/api/const';
import type {
    AddFinanceCategoryType,
    AllSystemMenuTreeItem,
    DeleteFinanceCategoryType,
    FinanceCategoryItemType,
    FinanceCategoryListItemType,
    GetFinanceCategoryListType,
    OrgTypeMenuItem,
    UpdateFinanceCategoryType
} from '@/types/finance';

export function addFinanceCategoryApi(params: AddFinanceCategoryType) {
    return api.post(`${DMS_DOMAIN}/v1/add/org/type`, params);
}

export function updateFinanceCategoryApi(params: UpdateFinanceCategoryType) {
    return api.post(`${DMS_DOMAIN}/v1/update/org/type`, params);
}

export function deleteFinanceCategoryApi(params: DeleteFinanceCategoryType) {
    return api.post(`${DMS_DOMAIN}/v1/del/org/type`, params);
}

export function getFinanceCategoryListApi(params: GetFinanceCategoryListType): Promise<{
    pageTotal: number;
    data: FinanceCategoryListItemType[]
}> {
    return api.get(`${DMS_DOMAIN}/v1/org/type/list`, {
        params
    });
}

export function getOrgTypeModuleList(): Promise<OrgTypeMenuItem[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/type/module`);
}

export function getOrgTypeDicApi(): Promise<FinanceCategoryListItemType[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/type/dic`);
}

export function getOrgTypeById(params: {id: string}): Promise<FinanceCategoryItemType[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/type/by/id`, {
        params
    });
}

export function getAllSystemMenuTree(): Promise<AllSystemMenuTreeItem[]> {
    return api.get(`${DMS_DOMAIN}/v1/sys/menu/tree/all`);
}
