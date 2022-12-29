import { ReportRecordService } from '@/api/corpReportRecord';
import { CorpReportRecordTabType, type CorpReportRecordListItemType } from '@/types/corpReportRecord';

export const loading = ref(false);
export const activeName = ref<CorpReportRecordTabType>(CorpReportRecordTabType.lxt);

export const allToogle = reactive({
    batchDeleteToogle: true
});

export const listData = ref<{
    total: number;
    list: CorpReportRecordListItemType[];
}>({
    total: 0,
    list: []
});

export const filterObject = ref<{
    pageSize: number;
    currentPage: number;
    searchInput: string;
    sortField: 'createTime',
    sortType: 'asc' | 'desc'
}>({
    sortField: 'createTime',
    sortType: 'desc',
    searchInput: '',
    pageSize: 10,
    currentPage: 1
});

// 获取查询记录列表
export async function getPageList(params: {
    tab: CorpReportRecordTabType,
}): Promise<void> {
    return new Promise((resolve) => {
        loading.value = true;
        new ReportRecordService(params.tab).getInstance().getList({
            ...params,
            pageIndex: filterObject.value.currentPage,
            pageSize: filterObject.value.pageSize,
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

// 初始化列表
export function resetFilterObject() {
    filterObject.value = {
        sortField: 'createTime',
        sortType: 'desc',
        searchInput: '',
        pageSize: 10,
        currentPage: 1
    };
}

// 删除查询记录
export async function deleteBatchRecord(params: {
    tab: CorpReportRecordTabType,
    idArr: Array<string>
}): Promise<void> {
    return new Promise((resolve) => {
        loading.value = true;
        new ReportRecordService(params.tab).getInstance().delete({
            ...params,
        }).then(() => {
            resolve();
        }).catch(() => {
            resolve();
        }).finally(() => {
            loading.value = false;
        });
    });
}
