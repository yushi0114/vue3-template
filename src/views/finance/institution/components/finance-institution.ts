import { ref } from 'vue';
import type {
    FinanceCategoryListItemType,
    FinanceInstitutionMenuTreeItemType,
    FinanceInstitutionTreeItemType,
    FinanceInstitutionType,
    OrgDetailTabViewType
} from '@/types/finance';
import { getOrgTypeDicApi } from '@/api/finance/finance-category';
import {
    addOrgApi,
    deleteOrgApi,
    getFinanceInstitution,
    getFinanceInstitutionDicApi,
    getFinanceInstitutionTreeApi,
    getFinanceTypeMenuTreeByIdApi,
    getOrgMenuCheckedIdsApi,
    refreshOrgKeyApi,
    updateOrgApi
} from '@/api/finance/finance-institution';
import { ElMessage } from 'element-plus';
import {
    getRolePageList,
    setInstitutionRoleMode
} from '@/views/finance/institution/components/institution-role/institution-role';
import {
    getUserPageList,
    setInstitutionUserMode
} from '@/views/finance/institution/components/institution-user/institution-user';

// 机构分类列表
export const categoryList = ref<FinanceCategoryListItemType[]>();
// 当前机构分类id
export const currentCategoryId = ref<string>();
// 当前类型下的机构树
export const institutionTreeData = ref<FinanceInstitutionTreeItemType[]>();
// 当前被选中的机构信息
export const institutionItemData = ref<FinanceInstitutionType>();
// 当前类型下的全量菜单树
export const typeMenuTree = ref<FinanceInstitutionMenuTreeItemType[]>([]);
export const mode = ref<'form' | 'board'>('board');
export const activeInstitutionName = ref<OrgDetailTabViewType>('menuList');
export const activeName = ref();
// 当前被选中的机构id
export const currentInstitutionId = ref();
export const loading = reactive({
    treeLoading: false,
    detailLoading: false,
    listLoading: false
});

export function setCurrentInstitutionId(value?: string) {
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
// 待删除机构名
export const willDeleteOrgName = ref<string>();
// 是否展示删除机构弹窗
export const isDeleteOrgModelShow = ref();

export function resetDeleteOrgMessage() {
    isDeleteOrgModelShow.value = false;
    willDeleteOrgIdList.value = [];
    willDeleteOrgName.value = '';
}

export async function goBoardView() {
    mode.value = 'board';
    currentInstitutionId.value = undefined;
    institutionItemData.value = undefined;
    resetInstitutionForm();
    await getInstitutionTree(activeName.value);
    await setTypeMenuTree({
        id: categoryList.value?.find(item => item.code === activeName.value)?.id!
    });
}

export async function goCreateFirstLevelFormView() {
    willCreateOrEditInstitutionData.value = {
        level: 1
    };
    resetInstitutionForm();
    await getInstitutionDic();
    if (!currentCategoryId.value) {
        return;
    }
    await setTypeMenuTree({
        id: currentCategoryId.value
    });
    mode.value = 'form';
}

export async function goCreateChildLevelFormView(id: string) {
    resetInstitutionForm();
    await getInstitutionItem(id);
    if (!currentCategoryId.value) {
        return;
    }
    await setTypeMenuTree({
        id: currentCategoryId.value
    });
    if (institutionItemData.value) {
        willCreateOrEditInstitutionData.value = {
            parentId: id,
            level: institutionItemData.value?.orgLevel + 1
        };
    }
    await getInstitutionDic();
    mode.value = 'form';
}

export async function goEditFormView(id: string) {
    resetInstitutionForm();
    await getInstitutionItem(id);
    if (!currentCategoryId.value) {
        return;
    }
    await setTypeMenuTree({
        id: currentCategoryId.value
    });
    if (institutionItemData.value) {
        setInstitutionForm(institutionItemData.value);
        willCreateOrEditInstitutionData.value = {
            id: institutionItemData.value?.id,
            level: institutionItemData.value?.orgLevel
        };
    }
    await getInstitutionDic();
    mode.value = 'form';
}

export function openRemoveView(item: FinanceInstitutionTreeItemType) {
    resetDeleteOrgMessage();
    willDeleteOrgIdList.value = lookForAllId([item], []);
    isDeleteOrgModelShow.value = true;
    willDeleteOrgName.value = item.orgName;
}

export async function selectOrgItem(id: string) {
    setCurrentInstitutionId(id);
    // activeInstitutionName.value = 'menuList';
    await getInstitutionItem(id);
    await getRolePageList(id);
    await getUserPageList(id);
}

export async function changeOrgTypeView(currentTab: string) {
    mode.value = 'board';
    currentInstitutionId.value = undefined;
    institutionItemData.value = undefined;
    activeInstitutionName.value = 'menuList';
    resetInstitutionForm();
    await getInstitutionTree(currentTab);
    if (!categoryList.value?.length) {
        return;
    }
    const currentCategory = categoryList.value.find(item => item.code === currentTab);
    if (!currentCategory) {
        return;
    }
    currentCategoryId.value = currentCategory.id;
    await setTypeMenuTree({
        id: currentCategoryId.value
    });
}

export async function initInstitutionPage() {
    await getCategoryList();
    if (!categoryList.value) {
        return;
    }
    currentCategoryId.value = categoryList.value[0].id;
    await setTypeMenuTree({
        id: currentCategoryId.value
    });
    activeName.value = categoryList.value[0].code;
    await getInstitutionTree();
}


export async function changeOrgDetailTabView(view: OrgDetailTabViewType) {
    if (view === 'menuList') {
        console.log('do first');
    }
    if (view === 'roleList') {
        setInstitutionRoleMode('list');
        loading.listLoading = true;
        await getRolePageList(currentInstitutionId.value);
        loading.listLoading = false;
    }
    if (view === 'userList') {
        loading.listLoading = true;
        setInstitutionUserMode('list');
        await getUserPageList(currentInstitutionId.value);
        loading.listLoading = false;
    }
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

export async function getOrgMenuCheckedIds(id: string): Promise<string[] | undefined> {
    return new Promise((resolve) => {
        getOrgMenuCheckedIdsApi({ id }).then((data) => {
            resolve(data);
        }).catch(() => {
            resolve(undefined);
        });
    });
}

export async function getInstitutionTree(type?: string): Promise<void> {
    const id = type ? type : activeName.value;
    return new Promise((resolve) => {
        loading.treeLoading = true;
        getFinanceInstitutionTreeApi({ typeCode: id }).then(data => {
            institutionTreeData.value = data;
            resolve();
        }).finally(() => {
            loading.treeLoading = false;
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
            institutionItemData.value = {
                ...data[0],
                menuIdArr: data[0].menuIdArr
            };
            resolve();
        });
    });
}

export async function getCategoryList(): Promise<void> {
    return new Promise((resolve) => {
        getOrgTypeDicApi().then(data => {
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
}): Promise<boolean> {
    return new Promise((resolve) => {
        addOrgApi(params).then(() => {
            ElMessage({
                type: 'success',
                message: '创建机构成功！',
            });
            resolve(true);
        }).catch(() => {
            ElMessage({
                type: 'error',
                message: '创建机构失败！',
            });
            resolve(false);
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
}): Promise<boolean> {
    return new Promise((resolve) => {
        updateOrgApi(params).then(() => {
            ElMessage({
                type: 'success',
                message: '更新机构成功！',
            });
            resolve(true);
        }).catch(() => {
            ElMessage({
                type: 'error',
                message: '更新机构失败！',
            });
            resolve(false);
        });
    });
}

export async function deleteOrg(params: {
    orgIdArr: {
        id: string;
        orgLevel: number;
    }[]
}): Promise<boolean> {
    return new Promise((resolve) => {
        deleteOrgApi(params).then(() => {
            ElMessage({
                type: 'success',
                message: '机构删除成功！',
            });
            resolve(true);
        }).catch(() => {
            ElMessage({
                type: 'error',
                message: '机构删除失败！',
            });
            resolve(false);
        });
    });
}

export async function refreshSecretKey(params: {
    id: string
}): Promise<boolean> {
    return new Promise((resolve) => {
        refreshOrgKeyApi(params).then(() => {
            ElMessage({
                type: 'success',
                message: '机构密钥更新成功！',
            });
            resolve(true);
        }).catch(() => {
            ElMessage({
                type: 'error',
                message: '机构密钥更新失败！',
            });
            resolve(false);
        });
    });
}
