import { ref } from 'vue';
import { getFinanceLogoList } from '@/api/finance/finance-logo';
import type { FinanceLogoListItemType } from '@/views/finance/type/finance-logo.type';


export const listData = ref<{
    total: number;
    list: FinanceLogoListItemType[];
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
    currentSize: 0,
    currentPage: 0
});

export function resetFilterObject() {
    filterObject.value = {
        sortField: 'create_time',
        sortType: 'desc',
        searchInput: '',
        currentSize: 0,
        currentPage: 0
    };
}

export async function getPageList(): Promise<void> {
    return new Promise((resolve) => {
        getFinanceLogoList({
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
