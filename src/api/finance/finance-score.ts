import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import type { FinanceScoreListItemType, GetFinanceScoreListType } from '@/types/finance';


export function getFinanceScoreListApi(params: GetFinanceScoreListType): Promise<{
    data: FinanceScoreListItemType[],
    total: number
}> {
    return api.get(`${DMS_DOMAIN}/v1/org/score/log/list`, { params });
}


export async function deleteFinanceScoreApi(params: { idArr: string[] }): Promise<void> {
    return api.post(`${DMS_DOMAIN}/v1/del/score/log`, params);
}
