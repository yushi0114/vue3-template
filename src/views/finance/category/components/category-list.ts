import { reactive, ref } from 'vue';
import {
    addFinanceCategoryApi,
    deleteFinanceCategoryApi,
    getAllSystemMenuTree,
    getFinanceCategoryListApi,
    getOrgTypeById,
    getOrgTypeModuleList, updateFinanceCategoryApi
} from '@/api/finance/finance-category';
import type {
    AddFinanceCategoryType,
    AllSystemMenuTreeItem,
    FinanceCategoryFormType,
    FinanceCategoryListItemType,
    OrgTypeMenuItem, UpdateFinanceCategoryType
} from '@/types/finance';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash';

export const loading = ref(false);
export const allSystemMenuTree = ref<AllSystemMenuTreeItem[]>([]);
export const allSystemMenuTreeDisabled = ref<AllSystemMenuTreeItem[]>([]);
export const orgTypeModuleList = ref<(OrgTypeMenuItem & { label: string; value: string })[]>();
export const mode = ref<'form' | 'list'>('list');
export const currentCategoryId = ref<string>();
const initCategoryForm = {
    sort: 1,
    typeModuleId: '',
    name: '',
    desc: '',
    menuIdArr: []
};
export const categoryForm = ref<FinanceCategoryFormType>(cloneDeep(initCategoryForm));
export const formType = ref<'create' | 'edit'>('edit');

export const categoryList = reactive<{
    total: number;
    list: FinanceCategoryListItemType[];
}>({
    total: 0,
    list: []
});

export const financeFilterObject = reactive<{
    currentSize: number;
    currentPage: number;
    searchInput: string;
    sortField: 'update_time' | 'create_time',
    sortType: 'asc' | 'desc'
}>({
    searchInput: '',
    currentSize: 10,
    currentPage: 1,
    sortField: 'update_time',
    sortType: 'desc',
});

export async function goListView() {
    mode.value = 'list';
    currentCategoryId.value = undefined;
    await setFinanceCategoryList();
}

export async function goCreateFormView() {
    mode.value = 'form';
    formType.value = 'create';
    await setOrgTypeModuleList();
    await setAllSystemMenuTree();
}

export async function goEditFormView(item: FinanceCategoryListItemType) {
    mode.value = 'form';
    formType.value = 'edit';
    currentCategoryId.value = item.id;
    await setOrgTypeModuleList();
    await setAllSystemMenuTree();
    const result = await getOrgTypeById({ id: item.id });
    categoryForm.value = {
        typeModuleId: item.typeModuleId,
        name: item.name,
        sort: item.sort,
        desc: item.desc ?? '',
        menuIdArr: result[0].menuIdArr
    };
}

export async function goDetailFormView(item: FinanceCategoryListItemType) {
    await setOrgTypeModuleList();
    await setAllSystemMenuTree();
    allSystemMenuTreeDisabled.value = allSystemMenuTree.value;
    allSystemMenuTreeDisabled.value.map((item) => {
        item.disabled = true;
        item.children &&
            item.children.forEach((items) => {
                items.disabled = true;
            });
        return item;
    });
    const result = await getOrgTypeById({ id: item.id });
    const typeModuleName = orgTypeModuleList.value?.find((orgTypeItem) => orgTypeItem.value === item.typeModuleId)?.label ?? '';
    return {
        ...item,
        typeModuleId: item.typeModuleId,
        name: item.name,
        sort: item.sort,
        desc: item.desc ?? '',
        typeModuleName,
        menuIdArr: result[0].menuIdArr
    };
}

export async function setAllSystemMenuTree(): Promise<void> {
    return new Promise((resolve) => {
        getAllSystemMenuTree().then(data => {
            allSystemMenuTree.value = data;
        }).finally(() => {
            resolve();
        });
    });

}

export async function setOrgTypeModuleList(): Promise<void> {
    return new Promise((resolve) => {
        getOrgTypeModuleList().then(data => {
            orgTypeModuleList.value = data.map(item => ({
                ...item,
                label: item.title,
                value: item.id
            }));
        }).finally(() => {
            resolve();
        });
    });
}

export async function setFinanceCategoryList(): Promise<void> {
    return new Promise((resolve) => {
        loading.value = true;
        getFinanceCategoryListApi({
            pageIndex: financeFilterObject.currentPage,
            pageSize: financeFilterObject.currentSize,
            searchInput: financeFilterObject.searchInput,
            sortField: financeFilterObject.sortField,
            sortType: financeFilterObject.sortType
        }).then(data => {
            categoryList.list = data.data;
            categoryList.total = data.pageTotal;
        }).finally(() => {
            loading.value = false;
            resolve();
        });
    });
}


export async function addFinanceCategory(params: AddFinanceCategoryType): Promise<boolean> {
    return new Promise((resolve) => {
        loading.value = true;
        addFinanceCategoryApi(params).then(() => {
            ElMessage({
                type: 'success',
                message: '创建成功',
            });
            resolve(true);
        }).catch(() => {
            loading.value = false;
            resolve(false);
        });
    });
}

export async function updateFinanceCategory(params: UpdateFinanceCategoryType): Promise<boolean> {
    return new Promise((resolve) => {
        loading.value = true;
        updateFinanceCategoryApi(params).then(() => {
            ElMessage({
                type: 'success',
                message: '创建成功',
            });
            resolve(true);
        }).catch(() => {
            loading.value = false;
            resolve(false);
        });
    });
}

export async function deleteFinanceCategory(id: string): Promise<boolean> {
    return new Promise((resolve) => {
        loading.value = true;
        deleteFinanceCategoryApi({ id }).then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            resolve(true);
        }).catch(() => {
            // ElMessage({
            //     type: 'error',
            //     message: '删除失败',
            // });
            loading.value = false;
            resolve(false);
        });
    });
}

export const resetCategoryForm = () => {
    categoryForm.value = cloneDeep(initCategoryForm);
};
