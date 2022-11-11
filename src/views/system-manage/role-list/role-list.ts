import {reactive, ref} from 'vue';
import type {RoleFormType, RoleListItemType} from '@/views/system-manage/type/role-list.type';
import {routeTree} from '@/views/system-manage/mock/route-tree';
import {getRoleList} from '@/api/system-manage';
import type {RouteTabType, TreeItemType} from '@/views/system-manage/type/route-list.type';


export const dataSource = ref<TreeItemType[]>();
export const mode = ref<'form' | 'list'>('list');
export const currentRoleId = ref();
export const roleForm = ref<RoleFormType>();
export const formType = ref<'create' | 'edit'>('edit');

export const roleList = ref<{
    total: number;
    list: RoleListItemType[];
}>();

export const roleFilterObject = reactive({
    searchInput: '',
    currentSize: 0,
    currentPage: 0
});

export async function getTreeData(): Promise<void> {
    dataSource.value = routeTree;
}

export async function getRolePageList(params: {
    tab: RouteTabType,
}){
    getRoleList({
        ...params,
        pageIndex: roleFilterObject.currentPage + 1,
        pageSize: roleFilterObject.currentSize,
        searchInput: roleFilterObject.searchInput,
        sortField: 'updateTime',
        sortType: 'desc'
    }).then(data => {
        console.log(data, '-----------');
        roleList.value = {
            list: data.data as unknown as RoleListItemType[],
            total: 1
        };
    });
}
