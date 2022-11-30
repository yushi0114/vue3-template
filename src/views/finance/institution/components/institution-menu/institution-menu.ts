import { getFinanceTypeMenuTreeByIdApi } from '@/api/finance/finance-institution';
import type { OrgTypeMenuItem } from '@/views/finance/type/finance-category.type';

export const financeInstitutionMenuTree = ref<OrgTypeMenuItem[]>();

export function setFinanceInstitutionMenuTree(params: { id: string }): Promise<void> {
    return new Promise((resolve) => {
        getFinanceTypeMenuTreeByIdApi(params).then((res) => {
            financeInstitutionMenuTree.value = res;
            resolve();
        });
    });
}




