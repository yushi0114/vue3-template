import { ref } from 'vue';
import { getFinanceOrgUserRoleList } from '@/api/finance/finance-institution';
import { currentMenuId } from '@/views/finance/institution/components/finance-institution';
import type { UserFormType, UserTabType } from '@/views/system/type/user-list.type';
import { activeName, getUserListData } from '@/views/system/user/components/user-list';
import { addUserApi, deleteUserApi, getTotalRoleListApi, updateUserApi } from '@/api/system-manage';
import { ElMessage } from 'element-plus';
import type { RoleListItemType } from '@/views/system/type/role-list.type';

export const mode = ref<'form' | 'list'>('list');
export const currentUserId = ref();
export const form = ref<UserFormType>({
    name: '',
    roleId: '',
    account: '',
    status: false
});

export const formType = ref<'create' | 'edit'>('edit');
export const totalRoleList = ref<RoleListItemType[]>();

export const listData = ref<{
    total: number;
    list: any[];
}>({
    total: 0,
    list: []
});

export const filterObject = ref<{
    currentSize: number;
    currentPage: number;
    searchInput: string;
    sortField: 'create_time' | 'update_time',
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

export function resetUserForm() {
    form.value = {
        name: '',
        roleId: '',
        status: false
    };
}

export const roleUIList = computed(() => totalRoleList.value?.map(item => ({
    ...item,
    label: item.name,
    value: item.id
})));

export async function handleGoBack() {
    mode.value = 'list';
    currentUserId.value = undefined;
    resetUserForm();
    await getUserListData({
        tab: activeName.value
    });
}

export async function getUserPageList(): Promise<void> {
    return new Promise((resolve) => {
        getFinanceOrgUserRoleList({
            pageIndex: filterObject.value.currentPage + 1,
            pageSize: filterObject.value.currentSize,
            searchInput: filterObject.value.searchInput,
            sortField: filterObject.value.sortField,
            sortType: filterObject.value.sortType,
            menuName: '',
            orgId: currentMenuId.value,
        }).then(data => {
            listData.value.list = data.data;
            listData.value.total = data.pageTotal;
            resolve();
        }).catch(() => {
            resolve();
        });
    });
}

export async function getRoleListData(params: {
    tab: UserTabType,
}): Promise<void> {
    return new Promise((resolve) => {
        getTotalRoleListApi({
            ...params
        }).then(data => {
            totalRoleList.value = data.data;
            resolve();
        }).catch(() => {
            resolve();
        });
    });
}

export async function addUser(): Promise<void> {
    return new Promise((resolve) => {
        addUserApi({
            ...form.value,
            status: form.value.status ? 1 : 0,
            tab: activeName.value,
            menuName: ''
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '创建成功',
            });
            resolve();
        }).catch(() => {
            resolve();
        });
    });
}

export async function updateUser(): Promise<void> {
    return new Promise((resolve) => {
        updateUserApi({
            id: currentUserId.value,
            ...form.value,
            status: form.value.status ? 1 : 0,
            tab: activeName.value,
            menuName: ''
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '更新用户成功',
            });
            resolve();
        }).catch(() => {
            resolve();
        });
    });
}

export async function deleteUser(params: {
    account: string;
    id: string;
}): Promise<void> {
    return new Promise((resolve) => {
        deleteUserApi({
            menuName: '',
            accountList: [params.account],
            idList: [params.id],
            tab: activeName.value
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '删除用户成功',
            });
            resolve();
        }).catch(() => {
            resolve();
        });
    });
}

