import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import type {
    FinanceInstitutionMenuTreeItemType,
    FinanceInstitutionTreeItemType,
    FinanceInstitutionType
} from '@/views/finance/type/finance-institution.type';


export async function getFinanceInstitutionTree(params: { typeCode: string }): Promise<FinanceInstitutionTreeItemType[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/tree`, {
        params
    });
}


export async function getFinanceInstitution(params: { id: string }): Promise<FinanceInstitutionType[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/by/id`, {
        params
    });
}


export async function getFinanceInstitutionMenuTree(params: { id: string }): Promise<FinanceInstitutionMenuTreeItemType[]> {
    return api.get(`${DMS_DOMAIN}/v1/org/menu/check/tree`, {
        params
    });
}
