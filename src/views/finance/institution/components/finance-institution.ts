import type { FinanceCategoryListItemType } from '@/views/finance/type/finance-category.type';
import { ref } from 'vue';
import type {
    FinanceInstitutionTreeItemType,
    FinanceInstitutionType
} from '@/views/finance/type/finance-institution.type';
import { getOrgTypeDic } from '@/api/finance/finance-category';
import { getFinanceInstitution, getFinanceInstitutionTree } from '@/api/finance/finance-institution';


export const categoryList = ref<FinanceCategoryListItemType[]>();
export const institutionTreeData = ref<FinanceInstitutionTreeItemType[]>();
export const institutionItemData = ref<FinanceInstitutionType>();


export const activeInstitutionName = ref<'menuList' | 'roleList' | 'userList'>('menuList');
export const activeName = ref();
export const parentId = ref();
export const currentMenuId = ref();

export function setParentId(value?: string) {
    parentId.value = value;
}

export function setCurrentMenuId(value?: string) {
    currentMenuId.value = value;
}


export async function getInstitutionTree(type?: string): Promise<void> {
    const id = type ? type : activeName.value;
    return new Promise((resolve) => {
        getFinanceInstitutionTree({ typeCode: id }).then(data => {
            institutionTreeData.value = data;
            resolve();

        });
    });
}

export async function getInstitutionItem(id: string): Promise<void> {
    return new Promise((resolve) => {
        getFinanceInstitution({
            id
        }).then(data => {
            institutionItemData.value = data[0];
            resolve();
        });

    });
}


export async function getCategoryList(): Promise<void> {
    return new Promise((resolve) => {
        getOrgTypeDic().then(data => {
            categoryList.value = data;
            resolve();
        });
    });
}
