import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import type {
    FinanceInstitutionMenuTreeItemType,
    FinanceInstitutionTreeItemType,
    FinanceInstitutionType
} from '@/views/finance/type/finance-institution.type';


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


export async function getFinanceInstitutionMenuTree(params: { id: string }): Promise<FinanceInstitutionMenuTreeItemType[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/menu/check/tree`, {
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

export async function getFinanceOrgAllRoleById(params: { roleId: string }): Promise<FinanceInstitutionType[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/role/all`, {
        params
    });
}

