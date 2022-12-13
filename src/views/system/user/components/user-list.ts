import { reactive, ref } from 'vue';
import type { RoleListItemType, UserFormType, UserListItemType, UserTabType } from '@/types/system-manage';
import { addUserApi, deleteUserApi, getTotalRoleListApi, getUserListApi, updateUserApi } from '@/api/system-manage';
import { ElMessage } from 'element-plus';

export const loading = ref(false);
export const activeName = ref<UserTabType>('cre');
export const currentUserId = ref();
export const form = ref<UserFormType>({
    name: '',
    roleId: '',
    account: '',
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
    currentSize: 10,
    currentPage: 1
});

export function resetUserForm() {
    form.value = {
        name: '',
        roleId: '',
        account: '',
        status: false
    };
}

export const roleUIList = computed(() => totalRoleList.value?.map(item => ({
    ...item,
    label: item.name,
    value: item.id
})));

export async function handleGoBack() {
    currentUserId.value = undefined;
    resetUserForm();
    await getUserListData({
        tab: activeName.value
    });
}

export function resetUserFilterObject() {
    userFilterObject.value = {
        sortField: 'updateTime',
        sortType: 'desc',
        searchInput: '',
        currentSize: 10,
        currentPage: 1
    };
}

export async function getUserListData(params: {
    tab: UserTabType,
}): Promise<void> {
    return new Promise((resolve) => {
        loading.value = true;
        getUserListApi({
            ...params,
            pageIndex: userFilterObject.value.currentPage,
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
        }).finally(() => {
            loading.value = false;
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

export async function addUser(): Promise<boolean> {
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
            resolve(true);
        }).catch(() => {
            ElMessage({
                type: 'error',
                message: '创建失败',
            });
            resolve(false);
        });
    });
}

export async function updateUser(): Promise<boolean> {
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
            resolve(true);
        }).catch(() => {
            ElMessage({
                type: 'error',
                message: '更新用户失败',
            });
            resolve(false);
        });
    });
}

export async function deleteUser(params: {
    account: string;
    id: string;
}): Promise<boolean> {
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
            resolve(true);
        }).catch(() => {
            ElMessage({
                type: 'success',
                message: '删除用户失败',
            });
            resolve(false);
        });
    });
}
