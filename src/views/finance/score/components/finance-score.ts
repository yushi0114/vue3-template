import { ref } from 'vue';
import type { FinanceScoreListItemType } from '@/views/finance/type/finance-score.type';
import { getFinanceScoreList } from '@/api/finance/finance-score';


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
    sortField: 'updateTime' | 'createTime',
    sortType: 'asc' | 'desc'
}>({
    sortField: 'updateTime',
    sortType: 'desc',
    searchInput: '',
    currentSize: 0,
    currentPage: 0
});

export function resetFilterObject() {
    filterObject.value = {
        sortField: 'updateTime',
        sortType: 'desc',
        searchInput: '',
        currentSize: 0,
        currentPage: 0
    };
}

export async function getPageList(): Promise<void> {
    return new Promise((resolve) => {
        getFinanceScoreList({
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
