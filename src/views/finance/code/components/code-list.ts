import { reactive, ref } from 'vue';
import { addFinanceCodeApi, getFinanceCodeListApi, updateFinanceCodeApi } from '@/api/finance/finance-code';
import type { FinanceCodeFormType, FinanceCodeListItemType } from '@/views/finance/type/finance-code.type';
import { getAllCityList } from '@/api/finance/finance-city';
import { getOrgTypeDic } from '@/api/finance/finance-category';
import { LoadingService } from '@/views/system/loading-service';
import { ElMessage } from 'element-plus';

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

export const financeCodeFilterObject = reactive<{
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
    currentCodeId.value = undefined;
    LoadingService.getInstance().loading();
    await setFinanceCodeList();
    LoadingService.getInstance().stop();
}


export async function setCityCodeList(): Promise<void> {
    return new Promise((resolve) => {
        getAllCityList().then(data => {
            cityCodeList.value = data.data.map(item => ({
                ...item,
                label: item.name,
                value: item.code
            }));
        }).finally(() => {
            resolve();
        });
    });

}

export async function setOrgTypeCodeList(): Promise<void> {
    return new Promise((resolve) => {
        getOrgTypeDic().then(data => {
            orgTypeCodeList.value = data.map(item => ({
                ...item,
                label: item.name,
                value: item.id
            }));
        }).finally(() => {
            resolve();
        });
    });

}

export async function addFinanceCode(): Promise<void> {
    return new Promise((resolve) => {
        addFinanceCodeApi({
            ...codeForm.value
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '创建成功',
            });
        }).finally(() => {
            resolve();
        });
    });
}

export async function updateFinanceCode(): Promise<void> {
    return new Promise((resolve) => {
        if (!currentCodeId.value) {
            return;
        }
        updateFinanceCodeApi({
            id: currentCodeId.value,
            ...codeForm.value
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '更新成功',
            });
        }).finally(() => {
            resolve();
        });
    });
}

export async function setFinanceCodeList(): Promise<void> {
    return new Promise((resolve) => {
        getFinanceCodeListApi({
            pageIndex: financeCodeFilterObject.currentPage,
            pageSize: financeCodeFilterObject.currentSize,
            cityCodeArr: [],
            orgTypeCodeArr: [],
            searchInput: financeCodeFilterObject.searchInput,
            sortField: financeCodeFilterObject.sortField,
            sortType: financeCodeFilterObject.sortType,
        }).then(data => {
            codeList.list = data.data;
            codeList.total = data.pageTotal;
        }).finally(() => {
            resolve();
        });
    });

}
