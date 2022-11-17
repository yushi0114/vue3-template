import { getFinanceInstitutionMenuTree } from '@/api/finance/finance-institution';
import type { FinanceInstitutionMenuTreeItemType } from '@/views/finance/type/finance-institution.type';

export const financeInstitutionMenuTree = ref<FinanceInstitutionMenuTreeItemType[]>();

export function setFinanceInstitutionMenuTree(params: { id: string }): Promise<void> {
    return new Promise((resolve) => {
        getFinanceInstitutionMenuTree(params).then((res) => {
            financeInstitutionMenuTree.value = res;
            resolve();
        });
    });

}

