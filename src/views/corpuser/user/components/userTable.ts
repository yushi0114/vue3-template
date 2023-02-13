import { CorpUserService } from '@/api/corpUser';
import { PlatformType } from '@/enums';
import { CorpUserTabType, type CorpUserListItemType, type ShopCartTable } from '@/types/corpUser';

export const loading = ref(false);
export const shopInfoloading = ref(false);
export const activeName = ref<CorpUserTabType>(CorpUserTabType.lxt);
export const platformType = computed(() => {
    if (activeName.value === CorpUserTabType.lxt) {
        return PlatformType.LiaoXinTong;
    }
    return PlatformType.ShiZongFu;
});
export const allToogle = reactive({
    loading: true,
    drawerFlag: false,
    batchDeleteToogle: true
});

// 分页配置项
export const page = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
});

export const shopCarInfoList = ref<ShopCartTable[]>([]);
export const listData = ref<{
    total: number;
    list: CorpUserListItemType[];
}>({
    total: 0,
    list: []
});

export const filterObject = ref<{
    pageSize: number;
    currentPage: number;
    searchInput: string;
    sortField: 'updateTime' | 'createTime',
    sortType: 'asc' | 'desc'
}>({
    sortField: 'createTime',
    sortType: 'desc',
    searchInput: '',
    pageSize: 10,
    currentPage: 1
});

// 获取用户列表
export async function getPageList(params: {
    tab: CorpUserTabType,
}): Promise<void> {
    return new Promise((resolve) => {
        loading.value = true;
        new CorpUserService(params.tab).getInstance().getList({
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

// 变更状态
export async function changeStatus(params: {
    tab: CorpUserTabType,
    status: number,
    account: string
}): Promise<void> {
    return new Promise((resolve) => {
        loading.value = true;
        new CorpUserService(params.tab).getInstance().update({
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

// 删除用户
export async function deleteUser(params: {
    tab: CorpUserTabType,
    idArr: Array<string>
}): Promise<void> {
    return new Promise((resolve) => {
        loading.value = true;
        new CorpUserService(params.tab).getInstance().delete({
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

// 获取用户购物车详情
export async function getShopCartInfo(params: {
    tab: CorpUserTabType,
    id: string,
    pageIndex: number
    pageSize: number,
    searchInput: string,
}): Promise<void> {
    return new Promise((resolve) => {
        shopInfoloading.value = true;
        new CorpUserService(params.tab).getInstance().getInfo({
            ...params,
        }).then(data => {
            shopCarInfoList.value = data.data;
            page.total = data.total;
            resolve();
        }).catch(() => {
            resolve();
        }).finally(() => {
            shopInfoloading.value = false;
        });
    });
}
