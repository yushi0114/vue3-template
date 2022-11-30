import { ref } from 'vue';
import type { RoleFormType, RoleListItemType, RoleTabType } from '@/views/system/type/role-list.type';
import { getMenuTreeApi } from '@/api/system-manage';
import type { TreeItemType } from '@/views/system/type/menu-list.type';
import { ElMessage } from 'element-plus';
import {
    addFinanceOrgRoleApi,
    deleteFinanceOrgRoleApi, getFinanceInstitutionMenuTree,
    getFinanceOrgRoleList, getOrgRoleMenuIdsApi,
    updateFinanceOrgRoleApi
} from '@/api/finance/finance-institution';
import { currentInstitutionId } from '@/views/finance/institution/components/finance-institution';

export const activeName = ref<RoleTabType>('dms');
export const roleMenuTreeData = ref<TreeItemType[]>();
export const mode = ref<'form' | 'list'>('list');
export const currentRoleId = ref();
export const roleForm = ref<RoleFormType>({
    name: '',
    desc: '',
    menuIdArr: []
});
export const formType = ref<'create' | 'edit'>('edit');

export const roleList = ref<{
    total: number;
    list: RoleListItemType[];
}>({
    total: 0,
    list: []
});

export function resetRoleForm() {
    roleForm.value = {
        name: '',
        desc: '',
        menuIdArr: []
    };
}

export const roleFilterObject = ref<{
    currentSize: number;
    currentPage: number;
    searchInput: string;
    sortField: 'update_time' | 'create_time',
    sortType: 'asc' | 'desc'
}>({
    sortField: 'update_time',
    sortType: 'desc',
    searchInput: '',
    currentSize: 10,
    currentPage: 1
});

export function resetRoleFilterObject() {
    roleFilterObject.value = {
        sortField: 'update_time',
        sortType: 'desc',
        searchInput: '',
        currentSize: 10,
        currentPage: 1
    };
}

export async function handleGoBack() {
    mode.value = 'list';
    currentRoleId.value = undefined;
    await getRolePageList();
}

export async function getTreeData(): Promise<void> {
    return new Promise((resolve) => {
        getFinanceInstitutionMenuTree({
            id: currentInstitutionId.value
        }).then(data => {
            roleMenuTreeData.value = data as unknown as TreeItemType[];
            resolve();
        }).catch(() => {
            resolve();
        });
    });
}

export async function getRolePageList(): Promise<void> {
    return new Promise((resolve) => {
        getFinanceOrgRoleList({
            orgId: currentInstitutionId.value,
            pageIndex: roleFilterObject.value.currentPage,
            pageSize: roleFilterObject.value.currentSize,
            searchInput: roleFilterObject.value.searchInput,
            sortField: roleFilterObject.value.sortField,
            sortType: roleFilterObject.value.sortType,
            menuName: ''
        }).then(data => {
            roleList.value.list = data.data as unknown as RoleListItemType[];
            roleList.value.total = 1;
            resolve();
        }).catch(() => {
            resolve();
        });
    });
}

export async function addRole(checkedNodeIds: string[]): Promise<void> {
    return new Promise((resolve) => {
        addFinanceOrgRoleApi({
            ...roleForm.value,
            orgId: currentInstitutionId.value,
            menuIdArr: checkedNodeIds,
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

export async function updateRole(): Promise<void> {
    return new Promise((resolve) => {
        updateFinanceOrgRoleApi({
            roleId: currentRoleId.value,
            orgId: currentInstitutionId.value,
            ...roleForm.value,
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

export async function deleteRole(id: string): Promise<void> {
    return new Promise((resolve) => {
        deleteFinanceOrgRoleApi({
            roleId: id,
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

export async function getOrgRoleMenuIds(id: string): Promise<string[] | undefined> {
    return new Promise((resolve) => {
        getOrgRoleMenuIdsApi({
            roleId: id,
        }).then((data) => {
            resolve(data);
        }).catch(() => {
            resolve(undefined);
        });
    });

}
