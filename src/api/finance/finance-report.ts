import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import type { FinanceReportListItemType, GetFinanceReportListType } from '@/types/finance';


export function getFinanceReportListApi(params: GetFinanceReportListType): Promise<{
    data: FinanceReportListItemType[],
    total: number
}> {
    return api.get(`${DMS_DOMAIN}/v1/org/report/log/list`, {
        params
    });
}


export async function deleteFinanceReportApi(params: { idArr: string[] }): Promise<void> {
    return api.post(`${DMS_DOMAIN}/v1/del/report/log`, params);
}
