import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import type {
    AddFinanceCodeType,
    DeleteFinanceCodeType,
    ExportFinanceCodeType,
    FinanceCodeListItemType,
    GetFinanceCodeListType,
    ImportFinanceCodeType,
    UpdateFinanceCodeType
} from '@/types/finance';


export function addFinanceCodeApi(params: AddFinanceCodeType) {
    return api.post(`${DMS_DOMAIN}/v1/add/org/dic`, params);
}

export function updateFinanceCodeApi(params: UpdateFinanceCodeType) {
    return api.post(`${DMS_DOMAIN}/v1/update/org/dic`, params);
}

export function deleteFinanceCodeApi(params: DeleteFinanceCodeType) {
    return api.post(`${DMS_DOMAIN}/v1/del/org/dic`, params);
}

export function getFinanceCodeListApi(params: GetFinanceCodeListType): Promise<{
    pageTotal: number;
    data: FinanceCodeListItemType[]
}> {
    return api.post(`${DMS_DOMAIN}/v1/org/dic/list`, params);
}


export function downloadFinanceCodeListTemplateApi(): Promise<any> {
    return api.get(`${DMS_DOMAIN}/v1/download/org/dic/template`);
}


export function exportFinanceCodeListApi(params: ExportFinanceCodeType): Promise<any> {
    return api.get(`${DMS_DOMAIN}/v1/export/org/dic`, {
        params
    });
}

export function importFinanceCodeListApi(params: ImportFinanceCodeType) {
    return api.post(`${DMS_DOMAIN}/v1/import/org/dic`, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
