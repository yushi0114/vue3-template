import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import type { FinanceLogoListItemType, GetFinanceLogoListType } from '@/types/finance';


export function getFinanceLogoList(params: GetFinanceLogoListType): Promise<{
    data: FinanceLogoListItemType[],
    total: number
}> {
    return api.post(`${DMS_DOMAIN}/v1/logo/list`, params);
}


export function getFirstLevelOrgAll(): Promise<{
    id: string;
    orgName: string;
}[]> {
    return api.get(`${DMS_DOMAIN}/v1/first/level/org/all`);
}

export function addLogoApi(params: {
    logoContent: string;
    orgId: string;
    orgName: string;
}): Promise<{
    id: string;
    orgName: string;
}[]> {
    return api.post(`${DMS_DOMAIN}/v1/add/logo`, params);
}

export function updateLogoApi(params: {
    id: string;
    logoContent: string;
    orgId: string;
    orgName: string;
}): Promise<{
    id: string;
    orgName: string;
}[]> {
    return api.post(`${DMS_DOMAIN}/v1/update/logo`, params);
}

export function deleteLogoApi(params: {
    id: string;
    orgId: string;
}): Promise<{
    id: string;
    orgName: string;
}[]> {
    return api.post(`${DMS_DOMAIN}/v1/del/logo`, params);
}
