import type { FinanceCategoryListItemType } from '@/views/finance/type/finance-category.type';
import { ref } from 'vue';
import type {
    FinanceInstitutionMenuTreeItemType,
    FinanceInstitutionTreeItemType,
    FinanceInstitutionType
} from '@/views/finance/type/finance-institution.type';
import { getOrgTypeDic } from '@/api/finance/finance-category';
import {
    addOrgApi,
    deleteOrgApi,
    getFinanceInstitution,
    getFinanceInstitutionDicApi,
    getFinanceInstitutionTreeApi,
    getFinanceTypeMenuTreeByIdApi,
    updateOrgApi
} from '@/api/finance/finance-institution';
import { ElMessage } from 'element-plus';

// 机构分类列表
export const categoryList = ref<FinanceCategoryListItemType[]>();
// 当前类型下的机构树
export const institutionTreeData = ref<FinanceInstitutionTreeItemType[]>();
// 当前被选中的机构信息
export const institutionItemData = ref<FinanceInstitutionType>();
// 当前类型下的全量菜单树
export const typeMenuTree = ref<FinanceInstitutionMenuTreeItemType[]>([]);
export const mode = ref<'form' | 'board'>('board');
export const activeInstitutionName = ref<'menuList' | 'roleList' | 'userList'>('menuList');
export const activeName = ref();
export const currentInstitutionId = ref();

export function setCurrentMenuId(value?: string) {
    currentInstitutionId.value = value;
}

// 创建或编辑机构表单
export const institutionForm = ref<any>({
    orgDictionaryId: '',
    orgCode: '',
    status: 1,
    sort: 1,
    desc: '',
    menuIdArr: []
});
// 创建或编辑机构附加信息
export const willCreateOrEditInstitutionData = ref<{
    id?: string;
    parentId?: string;
    level: number;
}>({
    level: 1
});

// 重置表单
export function resetInstitutionForm() {
    institutionForm.value = {
        orgDictionaryId: '',
        orgCode: '',
        status: 1,
        sort: 1,
        desc: '',
        menuIdArr: []
    };
    willCreateOrEditInstitutionData.value = {
        level: 1
    };
}

export function setInstitutionForm(data: FinanceInstitutionType) {
    institutionForm.value = {
        orgDictionaryId: data.orgDictionaryId,
        orgCode: data.orgCode,
        status: data.status,
        sort: data.sort,
        desc: data.desc,
        menuIdArr: data.menuIdArr
    };
}

// 机构全量字典
export const orgDic = ref<{
    id: string;
    orgName: string;
    orgCode: string;
}[]>([]);

// 待删除orgId
export const willDeleteOrgIdList = ref<{
    id: string;
    orgLevel: number;
}[]>();
export const willDeleteOrgName = ref<string>();
export const isDeleteOrgModelShow = ref();

export function resetDeleteMessage() {
    isDeleteOrgModelShow.value = false;
    willDeleteOrgIdList.value = [];
    willDeleteOrgName.value = '';
}

// 树形结构转换为数组
export function treeToArr(data: FinanceInstitutionMenuTreeItemType[]) {
    const result: { id: string; parentId: string }[] = [];
    data.forEach((item: FinanceInstitutionMenuTreeItemType) => {
        const loop = (data: FinanceInstitutionMenuTreeItemType) => {
            result.push({
                id: data.id,
                parentId: data.parentId!
            });
            const child = data.children;
            if (child && child.length > 0) {
                for (let i = 0; i < child.length; i++) {
                    loop(child[i]);
                }
            }
        };
        loop(item);
    });
    return result;
}

// 查找某个机构节点下的子节点
export function lookForAllId(data: any[], arr: any[]): {
    id: string;
    orgLevel: number;
}[] {
    for (const item of data) {
        arr.push({ id: item.id, orgLevel: item.orgLevel });
        if (item.children && item.children.length) lookForAllId(item.children, arr);
    }
    return arr;
}

export async function getInstitutionTree(type?: string): Promise<void> {
    const id = type ? type : activeName.value;
    return new Promise((resolve) => {
        getFinanceInstitutionTreeApi({ typeCode: id }).then(data => {
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
        getFinanceTypeMenuTreeByIdApi(params).then(data => {
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

export async function createOrg(params: {
    orgLevel: number;
    orgDictionaryId: string;
    desc: string;
    sort: number;
    status: number;
    parentId?: string;
    menuArr: {
        id: string;
        parentId: string;
        selected: number;
    }[]
}): Promise<void> {
    return new Promise((resolve) => {
        addOrgApi(params).then(() => {
            ElMessage({
                type: 'success',
                message: '创建机构成功！',
            });
        }).finally(() => {
            resolve();
        });
    });
}

export async function updateOrg(params: {
    id: string;
    orgLevel: number;
    orgDictionaryId: string;
    desc: string;
    sort: number;
    status: number;
    menuArr: {
        id: string;
        parentId: string;
        selected: number;
    }[]
}): Promise<void> {
    return new Promise((resolve) => {
        updateOrgApi(params).then(() => {
            ElMessage({
                type: 'success',
                message: '更新机构成功！',
            });
        }).finally(() => {
            resolve();
        });
    });
}

export async function deleteInstitution(params: {
    orgIdArr: {
        id: string;
        orgLevel: number;
    }[]
}): Promise<void> {
    return new Promise((resolve) => {
        deleteOrgApi(params).then(() => {
            ElMessage({
                type: 'success',
                message: '机构删除成功！',
            });
        }).finally(() => {
            resolve();
        });
    });
}
