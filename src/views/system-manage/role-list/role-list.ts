import {reactive, ref} from 'vue';
import type {RoleTabType, RoleFormType, RoleListItemType} from '@/views/system-manage/type/role-list.type';
import {getMenuTree, getRoleList} from '@/api/system-manage';
import type { TreeItemType} from '@/views/system-manage/type/route-list.type';

export const isLoading = ref(false);
export const activeName = ref<RoleTabType>('dms');
export const dataSource = ref<TreeItemType[]>();
export const mode = ref<'form' | 'list'>('list');
export const currentRoleId = ref();
export const roleForm = ref<RoleFormType>({
    name: '',
    desc: '',
    menuIdArr: []
});
export const formType = ref<'create' | 'edit'>('edit');

export const roleList = reactive<{
    total: number;
    list: RoleListItemType[];
}>({
    total: 0,
    list: []
});

export const roleFilterObject = reactive({
    searchInput: '',
    currentSize: 0,
    currentPage: 0
});

export function setRoleListLoading(value: boolean){
    isLoading.value = value;
}

export async function handleGoBack() {
    mode.value = 'list';
    currentRoleId.value = undefined;
    await getRolePageList({
        tab: activeName.value
    });
}

export async function getTreeData(name?: RoleTabType): Promise<void> {
    getMenuTree(name ? name : activeName.value).then(data => {
        dataSource.value = data as unknown as TreeItemType[];
    });
}

export async function getRolePageList(params: {
    tab: RoleTabType,
}){
    getRoleList({
        ...params,
        pageIndex: roleFilterObject.currentPage + 1,
        pageSize: roleFilterObject.currentSize,
        searchInput: roleFilterObject.searchInput,
        sortField: 'updateTime',
        sortType: 'desc'
    }).then(data => {
        roleList.list = data.data as unknown as RoleListItemType[];
        roleList.total = 1;
    });
}
