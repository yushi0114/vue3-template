import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import type {
    FinanceInstitutionMenuTreeItemType,
    FinanceInstitutionTreeItemType,
    FinanceInstitutionType
} from '@/views/finance/type/finance-institution.type';
import type { OrgTypeMenuItem } from '@/views/finance/type/finance-category.type';
import type { RoleListItemType } from '@/views/system/type/role-list.type';


export async function getFinanceInstitutionTree(params: { typeCode: string }): Promise<FinanceInstitutionTreeItemType[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/tree`, {
        params
    });
}


export async function getFinanceInstitution(params: { id: string }): Promise<FinanceInstitutionType[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/by/id`, {
        params
    });
}


export async function getOrgMenuCheckedIds(params: { id: string }): Promise<string[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/menu/check`, {
        params
    });
}

export async function updateOrgApi(params: {
    id: string;
    orgDictionaryId: string;
    desc: string;
    sort: number;
    status: number;
    menuIdArr: string[]
}): Promise<FinanceInstitutionType[]> {
    return api.post(`${DMS_DOMAIN}/v1/update/org`, params);
}


export async function getFinanceInstitutionMenuTree(params: { id: string }): Promise<FinanceInstitutionMenuTreeItemType[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/menu/check/tree`, {
        params
    });
}

export async function getFinanceOrgUserRoleList(params: {
    searchInput?: string;
    sortField: 'create_time' | 'update_time';
    sortType: 'desc' | 'asc';
    pageIndex: number;
    pageSize: number;
    menuName: string;
    orgId: string;
    name?: string;
}): Promise<{
    pageTotal: number;
    data: any[];
}> {
    return api.get(`${DMS_DOMAIN}/v1/org/user/role/list`, {
        params
    });
}


export async function addFinanceOrgUserApi(params: {
    account: string;
    orgId: string;
    name: string;
    roleId: string;
    status: number;
}): Promise<FinanceInstitutionType[]> {
    return api.post(`${DMS_DOMAIN}/v1/add/org/user`, params);
}

export async function updateFinanceOrgUserApi(params: {
    id: string;
    name: string;
    roleId: string;
    status: number;
}): Promise<FinanceInstitutionType[]> {
    return api.post(`${DMS_DOMAIN}/v1/update/org/user`, params);
}

export async function deleteFinanceOrgUserApi(params: {
    idList: string[];
    accountList: string[];
}): Promise<FinanceInstitutionType[]> {
    return api.post(`${DMS_DOMAIN}/v1/del/org/user`, params);
}


export async function getFinanceOrgAllRoleById(params: { orgId: string }): Promise<{ data: RoleListItemType[] }> {
    return api.get(`${DMS_DOMAIN}/v1/org/role/all`, {
        params
    });
}


export async function getFinanceTypeMenuTreeById(params: { id: string }): Promise<OrgTypeMenuItem[]> {
    return api.get(`${DMS_DOMAIN}/v1/type/menu/tree`, {
        params
    });
}

export async function getFinanceOrgRoleList(params: {
    searchInput?: string;
    sortField: 'create_time' | 'update_time';
    sortType: 'desc' | 'asc';
    pageIndex: number;
    pageSize: number;
    menuName: string;
    orgId: string;
}): Promise<{
    pageTotal: number;
    data: any[];
}> {
    return api.get(`${DMS_DOMAIN}/v1/org/role/list`, {
        params
    });
}

export async function addFinanceOrgRoleApi(params: {
    orgId: string;
    desc: string;
    name: string;
    menuIdArr: string[]
}): Promise<FinanceInstitutionType[]> {
    return api.post(`${DMS_DOMAIN}/v1/add/org/role`, params);
}

export async function updateFinanceOrgRoleApi(params: {
    roleId: string;
    orgId: string;
    desc: string;
    name: string;
    menuIdArr: string[]
}): Promise<FinanceInstitutionType[]> {
    return api.post(`${DMS_DOMAIN}/v1/update/org/role`, params);
}

export async function deleteFinanceOrgRoleApi(params: {
    roleId: string;
}): Promise<FinanceInstitutionType[]> {
    return api.post(`${DMS_DOMAIN}/v1/del/org/role`, params);
}


export async function getOrgRoleMenuIdsApi(params: {
    roleId: string;
}): Promise<string[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/role/menu/ids`, { params });
}


