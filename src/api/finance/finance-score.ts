import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import type { FinanceScoreListItemType, GetFinanceScoreListType } from '@/views/finance/type/finance-score.type';


export function getFinanceScoreList(params: GetFinanceScoreListType): Promise<{
    data: FinanceScoreListItemType[],
    total: number
}> {
    return api.get(`${DMS_DOMAIN}/v1/org/score/log/list`, { params });
}
