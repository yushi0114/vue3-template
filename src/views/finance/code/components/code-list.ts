import {reactive, ref} from 'vue';
import {getFinanceCodeListApi} from '@/api/finance/finance-code';
import type {FinanceCodeFormType, FinanceCodeListItemType} from '@/views/finance/type/finance-code.type';
import { getAllCityList} from '@/api/finance/finance-city';
import {getOrgTypeDic} from '@/api/finance/finance-category';

export const mode = ref<'form' | 'list'>('list');
export const cityCodeList = ref();
export const orgTypeCodeList = ref();
export const currentCodeId = ref<string>();
export const codeForm = ref<FinanceCodeFormType>({
    address: '', cityCode: '', orgCode: '', orgName: '', orgTypeCode: ''

});
export const formType = ref<'create' | 'edit'>('edit');

export const codeList = reactive<{
    total: number;
    list: FinanceCodeListItemType[];
}>({
    total: 0,
    list: []
});

export const financeCodeFilterObject = reactive({
    searchInput: '',
    currentSize: 0,
    currentPage: 0
});


export async function handleGoBack() {
    mode.value = 'list';
    currentCodeId.value = undefined;
    await setFinanceCodeList();
}


export async function setCityCodeList(){
    getAllCityList().then(data => {
        cityCodeList.value = data.data.map(item => ({
            ...item,
            label: item.name,
            value: item.id
        }));
    });
}

export async function setOrgTypeCodeList(){
    getOrgTypeDic().then(data => {
        orgTypeCodeList.value = data.map(item => ({
            ...item,
            label: item.name,
            value: item.id
        }));
    });
}

export async function setFinanceCodeList(){
    getFinanceCodeListApi({
        pageIndex: financeCodeFilterObject.currentPage + 1,
        pageSize: financeCodeFilterObject.currentSize,
        cityCodeArr: [],
        orgTypeCodeArr: [],
        searchInput: financeCodeFilterObject.searchInput,
        sortField: 'create_time',
        sortType: 'desc',
        menuName: ''
    }).then(data => {
        codeList.list = data.data;
        codeList.total = data.pageTotal;
    });
}
