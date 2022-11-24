import { ref } from 'vue';
import type { FinanceReportListItemType } from '@/views/finance/type/finance-record.type';
import { getFinanceReportList } from '@/api/finance/finance-report';


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
    currentPage: 0
});

export function resetFilterObject() {
    filterObject.value = {
        sortField: 'create_time',
        sortType: 'desc',
        searchInput: '',
        currentSize: 10,
        currentPage: 0
    };
}

export async function getPageList(): Promise<void> {
    return new Promise((resolve) => {
        getFinanceReportList({
            pageIndex: filterObject.value.currentPage + 1,
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
