import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import type {
    FinanceInstitutionMenuTreeItemType,
    FinanceInstitutionTreeItemType,
    FinanceInstitutionType
} from '@/types/finance';
import type { RoleListItemType } from '@/types/system-manage';


export async function getFinanceInstitutionTreeApi(params: { typeCode: string }): Promise<FinanceInstitutionTreeItemType[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/tree`, {
        params
    });
}

export async function getFinanceInstitutionDicApi(params: {
    orgTypeCode: string
}): Promise<{
    id: string;
    orgName: string;
    orgCode: string;
}[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/dic`, {
        params
    });
}


export async function getFinanceInstitution(params: { id: string }): Promise<FinanceInstitutionType[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/by/id`, {
        params
    });
}


export async function getOrgMenuCheckedIdsApi(params: { id: string }): Promise<string[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/menu/check`, {
        params
    });
}

export async function refreshOrgKeyApi(params: { id: string }): Promise<{
    secretKey: string
}> {
    return api.get(`${DMS_DOMAIN}/v1/org/refresh/key`, {
        params
    });
}

export async function addOrgApi(params: {
    orgDictionaryId: string;
    orgLevel: number;
    desc: string;
    sort: number;
    status: number;
    parentId?: string;
    menuArr: {
        id: string;
        parentId: string;
        selected: number;
    }[]
}): Promise<FinanceInstitutionType[]> {
    return api.post(`${DMS_DOMAIN}/v1/add/org`, params);
}

export async function updateOrgApi(params: {
    id: string;
    orgLevel: number;
    orgDictionaryId: string;
    desc: string;
    sort: number;
    status: number;
    menuArr: {
        id: string;
        parentId: string;
        selected: number;
    }[]
}): Promise<FinanceInstitutionType[]> {
    return api.post(`${DMS_DOMAIN}/v1/update/org`, params);
}

export async function deleteOrgApi(params: {
    orgIdArr: {
        id: string;
        orgLevel: number;
    }[]
}): Promise<void> {
    return api.post(`${DMS_DOMAIN}/v1/del/org`, params);
}


export async function getFinanceInstitutionMenuTreeApi(params: { id: string }): Promise<FinanceInstitutionMenuTreeItemType[]> {
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


export async function getFinanceTypeMenuTreeByIdApi(params: { id: string }): Promise<FinanceInstitutionMenuTreeItemType[]> {
    return api.get(`${DMS_DOMAIN}/v1/type/menu/tree`, {
        params
    });
}

export async function getFinanceOrgRoleListApi(params: {
    searchInput?: string;
    sortField: 'create_time' | 'update_time';
    sortType: 'desc' | 'asc';
    pageIndex: number;
    pageSize: number;
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

// 导出用户列表
export const exportUserExcel = (data: {
    searchInput?: string;
    sortField: 'create_time' | 'update_time';
    sortType: 'desc' | 'asc';
    orgId: string;
    name?: string;
}) => {
    return api.post(DMS_DOMAIN + '/v1/export/org/user', data);
};
