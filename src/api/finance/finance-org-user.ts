import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import type { FinanceOrgUserListItemType, GetFinanceOrgUserListType } from '@/types/finance';


export function getFinanceOrgUserListApi(params: GetFinanceOrgUserListType): Promise<{
    data: FinanceOrgUserListItemType[],
    total: number
}> {
    return api.get(`${DMS_DOMAIN}/v1/org/user/list`, { params });
}


export async function deleteFinanceOrgUserApi(params: {
    idList: string[];
    accountList: string[];
}): Promise<void> {
    return api.post(`${DMS_DOMAIN}/v1/del/org/user`, params);
}
