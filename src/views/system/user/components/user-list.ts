import { reactive, ref } from 'vue';
import type { RoleListItemType } from '@/views/system/type/role-list.type';
import type { UserFormType, UserListItemType, UserTabType } from '@/views/system/type/user-list.type';
import { addUserApi, deleteUserApi, getTotalRoleListApi, getUserListApi, updateUserApi } from '@/api/system-manage';
import { ElMessage } from 'element-plus';

export const activeName = ref<UserTabType>('dms');
export const mode = ref<'form' | 'list'>('list');
export const currentUserId = ref();
export const form = ref<UserFormType>({
    name: '',
    roleId: '',
    status: false
});
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

export const userFilterObject = ref<{
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
    await getUserListData({
        tab: activeName.value
    });
}

export function resetUserFilterObject() {
    userFilterObject.value = {
        sortField: 'updateTime',
        sortType: 'desc',
        searchInput: '',
        currentSize: 0,
        currentPage: 0
    };
}

export async function getUserListData(params: {
    tab: UserTabType,
}): Promise<void> {
    return new Promise((resolve) => {
        getUserListApi({
            ...params,
            pageIndex: userFilterObject.value.currentPage + 1,
            pageSize: userFilterObject.value.currentSize,
            searchInput: userFilterObject.value.searchInput,
            sortField: userFilterObject.value.sortField,
            sortType: userFilterObject.value.sortType
        }).then(data => {
            userTableData.list = data.data;
            userTableData.total = data.pageTotal;
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
            ...userForm.value,
            status: userForm.value.status ? 1 : 0,
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
            ...userForm.value,
            status: userForm.value.status ? 1 : 0,
            tab: activeName.value,
            menuName: ''
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '更新成功',
            });
            resolve();
        }).catch(() => {
            resolve();
        });
    });
}

export async function deleteUser(params: {
    account: string;
    id:string;
}): Promise<void>{
    return new Promise((resolve) => {
        deleteUserApi({
            menuName: '',
            accountList: [params.account],
            idList: [params.id],
            tab: activeName.value
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            resolve();
        }).catch(() => {
            resolve();
        });
    });
}
