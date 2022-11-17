import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import type { FinanceReportListItemType, GetFinanceReportListType } from '@/views/finance/type/finance-record.type';


export function getFinanceReportList(params: GetFinanceReportListType): Promise<{
    data: FinanceReportListItemType[],
    total: number
}> {
    return api.get(`${DMS_DOMAIN}/v1/org/report/log/list`, {
        params
    });
}
