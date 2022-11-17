import {api} from '@/api';
import {DMS_DOMAIN} from '@/api/const';
import type {
    AddFinanceCategoryType, AllSystemMenuTreeItem,
    DeleteFinanceCategoryType, FinanceCategoryListItemType, GetFinanceCategoryListType, OrgTypeMenuItem,
    UpdateFinanceCategoryType
} from '@/views/finance/type/finance-category.type';

export function addFinanceCategory(params: AddFinanceCategoryType) {
    return api.post(`${DMS_DOMAIN}/v1/add/org/type`, params);
}

export function updateFinanceCategory(params: UpdateFinanceCategoryType) {
    return api.post(`${DMS_DOMAIN}/v1/update/org/type`, params);
}

export function deleteFinanceCategory(params: DeleteFinanceCategoryType) {
    return api.post(`${DMS_DOMAIN}/v1/del/org/type`, params);
}

export function getFinanceCategoryList(params: GetFinanceCategoryListType) {
    return api.get(`${DMS_DOMAIN}/v1/org/type/list`, {
        params
    });
}

export function getOrgTypeModuleList(): Promise<OrgTypeMenuItem[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/type/module`);
}

export function getOrgTypeDic(): Promise<FinanceCategoryListItemType[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/type/dic`);
}

export function getAllSystemMenuTree(): Promise<AllSystemMenuTreeItem[]> {
    return api.get(`${DMS_DOMAIN}/v1/sys/menu/tree/all`);
}
