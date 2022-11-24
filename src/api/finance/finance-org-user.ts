import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import type { FinanceOrgUserListItemType, GetFinanceOrgUserListType } from '@/views/finance/type/finance-org-user.type';


export function getFinanceOrgUserList(params: GetFinanceOrgUserListType): Promise<{
    data: FinanceOrgUserListItemType[],
    total: number
}> {
    return api.get(`${DMS_DOMAIN}/v1/org/user/list`, { params });
}
