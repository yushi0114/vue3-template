import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import type { FinanceLogoListItemType, GetFinanceLogoListType } from '@/views/finance/type/finance-logo.type';


export function getFinanceLogoList(params: GetFinanceLogoListType): Promise<{
    data: FinanceLogoListItemType[],
    total: number
}> {
    return api.post(`${DMS_DOMAIN}/v1/logo/list`, params);
}
