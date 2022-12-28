import { ref } from 'vue';
import type { FinanceScoreListItemType } from '@/types/finance';
import { deleteFinanceScoreApi, getFinanceScoreListApi } from '@/api/finance/finance-score';
import { ElMessage } from 'element-plus';

export const loading = ref(false);
export const listData = ref<{
    total: number;
    list: FinanceScoreListItemType[];
}>({
    total: 0,
    list: []
});

export const filterObject = ref<{
    currentSize: number;
    currentPage: number;
    searchInput: string;
    sortField: 'create_time',
    sortType: 'asc' | 'desc'
}>({
    sortField: 'create_time',
    sortType: 'desc',
    searchInput: '',
    currentSize: 10,
    currentPage: 1
});

export function resetFilterObject() {
    filterObject.value = {
        sortField: 'create_time',
        sortType: 'desc',
        searchInput: '',
        currentSize: 10,
        currentPage: 1
    };
}

export async function getPageList(): Promise<void> {
    loading.value = true;
    return new Promise((resolve) => {
        getFinanceScoreListApi({
            pageIndex: filterObject.value.currentPage,
            pageSize: filterObject.value.currentSize,
            searchInput: filterObject.value.searchInput,
            sortField: filterObject.value.sortField,
            sortType: filterObject.value.sortType
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

export async function deleteItems(ids: string[]): Promise<void> {
    return new Promise((resolve) => {
        loading.value = true;
        deleteFinanceScoreApi({ idArr: ids }).then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
        }).finally(() => {
            loading.value = false;
            resolve();
        });
    });
}
