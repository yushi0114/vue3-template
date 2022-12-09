import { ref } from 'vue';
import type { FinanceReportListItemType } from '@/types/finance';
import { deleteFinanceReportApi, getFinanceReportListApi } from '@/api/finance/finance-report';
import { ElMessage } from 'element-plus';


export const listData = ref<{
    total: number;
    list: FinanceReportListItemType[];
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
    return new Promise((resolve) => {
        getFinanceReportListApi({
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
        });
    });
}


export async function deleteItems(ids: string[]): Promise<void> {
    return new Promise((resolve) => {
        console.log(ids);
        deleteFinanceReportApi({ idArr: ids }).then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
        }).finally(() => {
            resolve();
        });
    });
}
