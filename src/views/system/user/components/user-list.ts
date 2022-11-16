import {reactive, ref} from 'vue';
import type {RoleListItemType} from '@/views/system/type/role-list.type';
import type {UserFormType, UserListItemType, UserTabType} from '@/views/system/type/user-list.type';
import {getTotalRoleList, getUserList} from '@/api/system-manage';
import {currentRoleId, getRolePageList} from "@/views/system/role/components/role-list";

export const dataSource = ref<RoleListItemType[]>();
export const activeName = ref<UserTabType>('dms');

export const mode = ref<'form' | 'list'>('list');
export const currentUserId = ref();

export const form = ref<UserFormType>();
export const formType = ref<'create' | 'edit'>('edit');
export const totalRoleList = ref<RoleListItemType[]>();

export const userTableData = reactive<{
    list: UserListItemType[],
    total: number
}>({
    list: [],
    total: 0
});

export const userForm = ref<UserFormType>({
    account: '',
    name: '',
    roleId: '',
    status: false
});

export async function handleGoBack() {
    mode.value = 'list';
    currentUserId.value = undefined;
    await getUserListData({
        tab: activeName.value
    });
}

// export const userUIList = computed(() => userTableData.list.map(item => {
//     return {
//         ...item,
//         roleName: totalRoleList.value?.find(i => i.id === item.roleId)?.name
//     };
// }));

export const roleUIList = computed(() => totalRoleList.value?.map(item => ({...item, label: item.name, value: item.id})));


export const userFilterObject = reactive({
    searchInput: '',
    currentSize: 0,
    currentPage: 0
});

export async function getUserListData(params: {
    tab: UserTabType,
}): Promise<void> {
    const result = await getUserList({
        ...params,
        searchInput: userFilterObject.searchInput,
        pageIndex: userFilterObject.currentPage + 1,
        pageSize: userFilterObject.currentSize,
        sortField: 'updateTime',
        sortType: 'desc'
    });
    userTableData.list = result.data;
    userTableData.total = result.pageTotal;
}

export async function getRoleListData(params: {
    tab: UserTabType,
}){
    const result = await getTotalRoleList({
        ...params
    });
    totalRoleList.value = result.data;
}
