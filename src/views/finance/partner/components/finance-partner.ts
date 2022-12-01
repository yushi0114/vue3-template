import { ref } from 'vue';
import { LoadingService } from '@/views/system/loading-service';
import { type UploadUserFile, ElMessage } from 'element-plus';
import { FinancePartnerService } from '@/api/finance/finance-partner';
import type {
    FinancePartnerFormType,
    FinancePartnerListItemType,
    FinancePartnerTabType
} from '@/views/finance/type/finance-parnter.type';


export const activeName = ref<FinancePartnerTabType>('zjfw');
export const mode = ref<'form' | 'list'>('list');
export const currentId = ref();
export const form = ref<FinancePartnerFormType>({
    name: '',
    imgUrl: '',
    status: true
});
export const formType = ref<'create' | 'edit'>('edit');
export const fileList = ref<UploadUserFile[]>([]);
export const listData = ref<{
    total: number;
    list: FinancePartnerListItemType[];
}>({
    total: 0,
    list: []
});

export function resetForm() {
    fileList.value = [];
    form.value = {
        name: '',
        imgUrl: '',
        status: true
    };
}

export const filterObject = ref<{
    currentSize: number;
    currentPage: number;
    searchInput: string;
    sortField: 'updateTime' | 'createTime',
    sortType: 'asc' | 'desc'
}>({
    sortField: 'updateTime',
    sortType: 'desc',
    searchInput: '',
    currentSize: 10,
    currentPage: 1
});

export function resetFilterObject() {
    filterObject.value = {
        sortField: 'updateTime',
        sortType: 'desc',
        searchInput: '',
        currentSize: 10,
        currentPage: 1
    };
}

export async function handleGoBack() {
    mode.value = 'list';
    currentId.value = undefined;
    LoadingService.getInstance().loading();
    await getPageList({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
}

export async function getPageList(params: {
    tab: FinancePartnerTabType,
}): Promise<void> {
    return new Promise((resolve) => {
        new FinancePartnerService(params.tab).getInstance().getList({
            ...params,
            pageIndex: filterObject.value.currentPage,
            pageSize: filterObject.value.currentSize,
            searchInput: filterObject.value.searchInput,
            sortField: filterObject.value.sortField,
            sortType: filterObject.value.sortType,
            menuName: ''
        }).then(data => {
            listData.value.list = data.data;
            listData.value.total = data.total;
            resolve();
        }).catch(() => {
            resolve();
        });
    });
}

export async function add(): Promise<void> {
    return new Promise((resolve) => {
        new FinancePartnerService(activeName.value).getInstance().add({
            ...form.value,
            status: form.value.status ? 1 : 0,
            menuName: ''
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '创建成功',
            });
            resolve();
        }).catch(() => {
            resolve();
        });
    });

}

export async function update(): Promise<void> {
    return new Promise((resolve) => {
        new FinancePartnerService(activeName.value).getInstance().update({
            id: currentId.value,
            ...form.value,
            status: form.value.status ? 1 : 0,
            menuName: ''
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '更新成功',
            });
            resolve();
        }).catch(() => {
            resolve();
        });
    });

}

export async function remove(params: { id: string }): Promise<void> {
    return new Promise((resolve) => {
        new FinancePartnerService(activeName.value).getInstance().delete({
            id: params.id,
            menuName: ''
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            resolve();
        }).catch(() => {
            resolve();
        });
    });
}

