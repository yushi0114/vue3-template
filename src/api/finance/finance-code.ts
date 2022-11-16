import {api} from '@/api';
import {DMS_DOMAIN} from '@/api/const';
import type {
    AddFinanceCodeType, DeleteFinanceCodeType,
    ExportFinanceCodeType, FinanceCodeListItemType,
    GetFinanceCodeListType,
    ImportFinanceCodeType, UpdateFinanceCodeType
} from '@/views/finance/type/finance-code.type';


export function addFinanceCode(params: AddFinanceCodeType) {
    return api.post(`${DMS_DOMAIN}/v1/add/org/dic`, params);
}

export function updateFinanceCode(params: UpdateFinanceCodeType) {
    return api.post(`${DMS_DOMAIN}/v1/update/org/dic`, params);
}

export function deleteFinanceCode(params: DeleteFinanceCodeType) {
    return api.post(`${DMS_DOMAIN}/v1/del/org/dic`, params);
}

export function getFinanceCodeListApi(params: GetFinanceCodeListType): Promise<{
    pageTotal: number;
    data: FinanceCodeListItemType[]
}> {
    return api.post(`${DMS_DOMAIN}/v1/org/dic/list`, params);
}

export function exportFinanceCodeList(params: ExportFinanceCodeType) {
    return api.post(`${DMS_DOMAIN}/v1/export/org/dic`, {
        params
    });
}

export function importFinanceCodeList(params: ImportFinanceCodeType) {
    return api.post(`${DMS_DOMAIN}/v1/import/org/dic`, params);
}
