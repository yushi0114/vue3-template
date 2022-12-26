import { ref } from 'vue';
import {
    addFinanceOrgUserApi,
    deleteFinanceOrgUserApi,
    getFinanceOrgAllRoleById,
    getFinanceOrgUserRoleList,
    updateFinanceOrgUserApi
} from '@/api/finance/finance-institution';
import { currentInstitutionId } from '@/views/finance/institution/components/finance-institution';
import type { RoleListItemType, UserFormType } from '@/types/system-manage';
import { ElMessage } from 'element-plus';

export const mode = ref<'form' | 'list'>('list');
export const loading = ref(false);
export const currentUserId = ref();
export const form = ref<UserFormType>({
    name: '',
    roleId: '',
    account: '',
    status: false
});

export function setInstitutionUserMode(value: 'form' | 'list') {
    mode.value = value;
}

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

export function resetUserForm() {
    form.value = {
        account: '',
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
    await getUserPageList(currentInstitutionId.value);
}

export async function getUserPageList(orgId: string): Promise<void> {
    return new Promise((resolve) => {
        getFinanceOrgUserRoleList({
            pageIndex: filterObject.value.currentPage,
            pageSize: filterObject.value.currentSize,
            searchInput: filterObject.value.searchInput,
            sortField: filterObject.value.sortField,
            sortType: filterObject.value.sortType,
            orgId,
        }).then(data => {
            listData.value.list = data.data;
            listData.value.total = data.pageTotal;
            resolve();
        }).catch(() => {
            resolve();
        });
    });
}

export async function getRoleListData(): Promise<void> {
    return new Promise((resolve) => {
        getFinanceOrgAllRoleById({
            orgId: currentInstitutionId.value
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
        addFinanceOrgUserApi({
            ...form.value,
            orgId: currentInstitutionId.value,
            status: form.value.status ? 1 : 0,
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
        updateFinanceOrgUserApi({
            id: currentUserId.value,
            ...form.value,
            status: form.value.status ? 1 : 0
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
        deleteFinanceOrgUserApi({
            accountList: [params.account],
            idList: [params.id],
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '删除用户成功',
            });
            resolve(true);
        }).catch(() => {
            ElMessage({
                type: 'error',
                message: '删除用户失败',
            });
            resolve(false);
        });
    });
}

