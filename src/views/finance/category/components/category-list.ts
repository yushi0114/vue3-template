import { reactive, ref } from 'vue';
import { getAllSystemMenuTree, getFinanceCategoryList, getOrgTypeModuleList } from '@/api/finance/finance-category';
import type {
    AllSystemMenuTreeItem,
    FinanceCategoryFormType,
    FinanceCategoryListItemType,
    OrgTypeMenuItem
} from '@/views/finance/type/finance-category.type';
import { LoadingService } from '@/views/system/loading-service';

export const allSystemMenuTree = ref<AllSystemMenuTreeItem[]>();
export const orgTypeModuleList = ref<(OrgTypeMenuItem & { label: string; value: string })[]>();
export const mode = ref<'form' | 'list'>('list');
export const currentCategoryId = ref<string>();
export const categoryForm = ref<FinanceCategoryFormType>({
    sort: 1,
    typeModuleId: '',
    name: '',
    desc: '',
    menuIdArr: []
});
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


export async function handleGoBack() {
    mode.value = 'list';
    currentCategoryId.value = undefined;
    LoadingService.getInstance().loading();
    await setFinanceCategoryList();
    LoadingService.getInstance().stop();
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
                label: item.name,
                value: item.id
            }));
        }).finally(() => {
            resolve();
        });
    });
}

export async function setFinanceCategoryList(): Promise<void> {
    return new Promise((resolve) => {
        getFinanceCategoryList({
            pageIndex: financeFilterObject.currentPage,
            pageSize: financeFilterObject.currentSize,
            searchInput: financeFilterObject.searchInput,
            sortField: financeFilterObject.sortField,
            sortType: financeFilterObject.sortType
        }).then(data => {
            categoryList.list = data.data as unknown as FinanceCategoryListItemType[];
            categoryList.total = 1;
        }).finally(() => {
            resolve();
        });
    });

}
