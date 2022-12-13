import { ref } from 'vue';
import { deleteFinanceOrgUserApi, getFinanceOrgUserListApi } from '@/api/finance/finance-org-user';
import type { FinanceOrgUserListItemType } from '@/types/finance';
import { ElMessage } from 'element-plus';

export const loading = ref(false);

export const listData = ref<{
    total: number;
    list: FinanceOrgUserListItemType[];
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
        loading.value = true;
        getFinanceOrgUserListApi({
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

export async function deleteItems(params: {
    id: string;
    account: string
}[]): Promise<void> {
    return new Promise((resolve) => {
        loading.value = true;
        const apiParams = params.reduce((pre: {
            idList: string[],
            accountList: string[]
        }, cur) => {
            pre.accountList.push(cur.account);
            pre.idList.push(cur.id);
            return pre;
        }, {
            idList: [],
            accountList: []
        });
        deleteFinanceOrgUserApi(apiParams).then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
        }).finally(() => {
            resolve();
            loading.value = true;
        });
    });
}
