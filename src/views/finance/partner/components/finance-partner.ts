import { ref } from 'vue';
import { type UploadUserFile, ElMessage } from 'element-plus';
import { FinancePartnerService } from '@/api/finance/finance-partner';
import { PlatformType } from '@/enums';
import type {
    FinancePartnerFormType,
    FinancePartnerListItemType,
} from '@/types/finance';


export const loading = ref(false);
export const activeName = ref<PlatformType>(PlatformType.LiaoXinTong);
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
    loading.value = true;
    try {
        await getPageList({
            tab: activeName.value
        });
    }
    finally {
        loading.value = false;
    }
}

export async function getPageList(params: {
    tab: PlatformType,
}): Promise<void> {
    return new Promise((resolve) => {
        loading.value = true;
        console.log('gggggg', params.tab);
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
        }).finally(() => {
            loading.value = false;
        });
    });
}

export async function add(): Promise<boolean> {
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
            resolve(true);
        }).catch(() => {
            resolve(false);
        });
    });

}

export async function update(): Promise<boolean> {
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
            resolve(true);
        }).catch(() => {
            resolve(false);
        });
    });

}

export async function remove(params: { id: string }): Promise<void> {
    return new Promise((resolve) => {
        loading.value = true;
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
        }).finally(() => {
            loading.value = false;
        });
    });
}

