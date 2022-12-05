import { reactive, ref } from 'vue';
import {
    addFinanceCodeApi,
    deleteFinanceCodeApi,
    downloadFinanceCodeListTemplateApi,
    exportFinanceCodeListApi,
    getFinanceCodeListApi,
    importFinanceCodeListApi,
    updateFinanceCodeApi
} from '@/api/finance/finance-code';
import type { FinanceCodeFormType, FinanceCodeListItemType } from '@/types/finance';
import { getAllCityListApi } from '@/api/finance/finance-city';
import { getOrgTypeDicApi } from '@/api/finance/finance-category';
import { LoadingService } from '@/views/system/loading-service';
import { ElMessage } from 'element-plus';
import { downloadByBase64, downloadByData } from '@/utils';

export const mode = ref<'form' | 'list'>('list');
export const cityCodeList = ref();
export const orgTypeCodeList = ref();
export const currentCodeId = ref<string>();
export const codeForm = ref<FinanceCodeFormType>({
    address: '',
    cityCode: '',
    orgCode: '',
    orgName: '',
    orgTypeCode: ''
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


export async function goCreateFormView() {
    mode.value = 'form';
    formType.value = 'create';
    await setOrgTypeCodeList();
    await setCityCodeList();
}

export async function goEditFormView(item: FinanceCodeListItemType) {
    mode.value = 'form';
    formType.value = 'edit';
    currentCodeId.value = item.id;
    await setOrgTypeCodeList();
    await setCityCodeList();
    codeForm.value = {
        cityCode: item.cityCode,
        orgCode: item.orgCode,
        orgName: item.orgName,
        orgTypeCode: item.orgTypeCode,
        address: item.address
    };
}

export async function setCityCodeList(): Promise<void> {
    return new Promise((resolve) => {
        getAllCityListApi().then(data => {
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
        getOrgTypeDicApi().then(data => {
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


export async function deleteFinanceCode(id: string): Promise<void> {
    return new Promise((resolve) => {
        deleteFinanceCodeApi({
            id
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
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


export async function exportFinanceCodeList(): Promise<void> {
    return new Promise((resolve) => {
        exportFinanceCodeListApi({
            searchInput: financeCodeFilterObject.searchInput,
            sortField: financeCodeFilterObject.sortField,
            sortType: financeCodeFilterObject.sortType,
        }).then(data => {
            console.log(data);
            downloadByData(data, '机构编码字典.xlsx');
            resolve();
        });
    });
}

export async function importFinanceCodeList(params: File): Promise<void> {
    return new Promise((resolve) => {
        importFinanceCodeListApi({
            file: params
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '上传成功',
            });
        }).catch(() => {
            ElMessage({
                type: 'error',
                message: '上传失败',
            });
        }).finally(() => {
            resolve();
        });
    });
}

export async function downloadExcelTemplate(): Promise<void> {
    return new Promise((resolve) => {
        downloadFinanceCodeListTemplateApi()
            .then((res) => {
                downloadByBase64(res, '机构编码字典模板.xlsx');
            }).finally(() => {
                resolve();
            });
    });
}
