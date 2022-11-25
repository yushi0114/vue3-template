import type { FinanceCategoryListItemType, OrgTypeMenuItem } from '@/views/finance/type/finance-category.type';
import { ref } from 'vue';
import type {
    FinanceInstitutionTreeItemType,
    FinanceInstitutionType
} from '@/views/finance/type/finance-institution.type';
import { getOrgTypeDic } from '@/api/finance/finance-category';
import {
    getFinanceInstitution,
    getFinanceInstitutionDicApi,
    getFinanceInstitutionTree,
    getFinanceTypeMenuTreeById,
    updateOrgApi
} from '@/api/finance/finance-institution';


export const categoryList = ref<FinanceCategoryListItemType[]>();
export const institutionTreeData = ref<FinanceInstitutionTreeItemType[]>();
export const institutionItemData = ref<FinanceInstitutionType>();
export const typeMenuTree = ref<OrgTypeMenuItem[]>([]);

export const institutionForm = ref<any>({
    // orgName: '',
    orgId: '',
    orgCode: '',
    status: 1,
    sort: 0,
    desc: '',
    id: '',
    menuIdArr: []
});


export function resetInstitutionForm() {
    institutionForm.value = {
        // orgName: '',
        orgId: '',
        orgCode: '',
        status: 1,
        sort: 0,
        desc: '',
        id: '',
        menuIdArr: []
    };
}

export const mode = ref<'form' | 'board'>('board');
export const activeInstitutionName = ref<'menuList' | 'roleList' | 'userList'>('menuList');
export const activeName = ref();
export const parentId = ref();
export const currentMenuId = ref();

export const orgDic = ref<{
    id: string;
    orgName: string;
    orgCode: string;
}[]>([]);


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

export async function getInstitutionDic(type?: string): Promise<void> {
    const id = type ? type : activeName.value;
    return new Promise((resolve) => {
        getFinanceInstitutionDicApi({ orgTypeCode: id }).then(data => {
            orgDic.value = data;
            resolve();
        });
    });
}

export async function setTypeMenuTree(params: {
    id: string
}): Promise<void> {
    return new Promise((resolve) => {
        getFinanceTypeMenuTreeById(params).then(data => {
            console.log(data);
            typeMenuTree.value = data;
        }).finally(() => {
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
            institutionForm.value = {
                ...data[0],
                orgId: data[0].id
            };
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

export async function updateOrg(params: {
    id: string;
    orgDictionaryId: string;
    desc: string;
    sort: number;
    status: number;
    menuIdArr: string[]
}): Promise<void> {
    return new Promise((resolve) => {
        updateOrgApi(params).then(() => {
            // todo
        }).finally(() => {
            resolve();
        });
    });
}
