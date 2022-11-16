import {reactive, ref} from 'vue';
import {getAllSystemMenuTree, getFinanceCategoryList, getOrgTypeModuleList} from '@/api/finance/finance-category';
import type {
    AllSystemMenuTreeItem, FinanceCategoryFormType,
    FinanceCategoryListItemType, OrgTypeMenuItem
} from '@/views/finance/type/finance-category.type';

export const allSystemMenuTree = ref<AllSystemMenuTreeItem[]>();
export const orgTypeModuleList = ref<OrgTypeMenuItem[]>();
export const mode = ref<'form' | 'list'>('list');
export const currentCategoryId = ref<string>();
export const categoryForm = ref<FinanceCategoryFormType>({
    sort: 0,
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

export const financeFilterObject = reactive({
    searchInput: '',
    currentSize: 0,
    currentPage: 0
});


export async function handleGoBack() {
    mode.value = 'list';
    currentCategoryId.value = undefined;
    await setFinanceCategoryList();
}

export async function setAllSystemMenuTree(){
    getAllSystemMenuTree().then(data => {
        allSystemMenuTree.value = data;
    });
}

export async function setOrgTypeModuleList() {
    getOrgTypeModuleList().then(data => {
        orgTypeModuleList.value = data.map(item => ({
            ...item,
            label: item.name,
            value: item.id
        }));
    });
}

export async function setFinanceCategoryList(){
    getFinanceCategoryList({
        pageIndex: financeFilterObject.currentPage + 1,
        pageSize: financeFilterObject.currentSize,
        searchInput: financeFilterObject.searchInput,
        sortField: 'create_time',
        sortType: 'desc',
        menuName: ''
    }).then(data => {
        categoryList.list = data.data as unknown as FinanceCategoryListItemType[];
        categoryList.total = 1;
    });
}
