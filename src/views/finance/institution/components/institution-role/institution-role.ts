import { ref } from 'vue';
import type { RoleFormType, RoleListItemType } from '@/views/system/type/role-list.type';
import { ElMessage } from 'element-plus';
import {
    addFinanceOrgRoleApi,
    deleteFinanceOrgRoleApi,
    getFinanceInstitutionMenuTreeApi,
    getFinanceOrgRoleListApi,
    getOrgRoleMenuIdsApi,
    updateFinanceOrgRoleApi
} from '@/api/finance/finance-institution';
import { currentInstitutionId } from '@/views/finance/institution/components/finance-institution';
import type { FinanceInstitutionMenuTreeItemType } from '@/types/finance';

export const roleMenuTreeData = ref<FinanceInstitutionMenuTreeItemType[]>();
export const mode = ref<'form' | 'list'>('list');
export const formType = ref<'create' | 'edit'>('edit');
export const currentRoleId = ref();
export const roleForm = ref<RoleFormType>({
    name: '',
    desc: '',
    menuIdArr: []
});

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

export async function goBackListView() {
    mode.value = 'list';
    currentRoleId.value = undefined;
    await getRolePageList(currentInstitutionId.value);
}

export async function goCreateFormView() {
    mode.value = 'form';
    formType.value = 'create';
    resetRoleForm();
    await getTreeData();
}

export async function goEditFormView(item: RoleListItemType) {
    mode.value = 'form';
    formType.value = 'edit';
    currentRoleId.value = item.id;
    await getTreeData();
    const menuList = await getOrgRoleMenuIds(currentRoleId.value);
    if (!menuList?.length) {
        return;
    }
    roleForm.value = {
        name: item.name,
        desc: item.desc ?? '',
        menuIdArr: menuList
    };
}

export async function getTreeData(): Promise<void> {
    return new Promise((resolve) => {
        getFinanceInstitutionMenuTreeApi({
            id: currentInstitutionId.value
        }).then((data: FinanceInstitutionMenuTreeItemType[]) => {
            roleMenuTreeData.value = data;
            resolve();
        }).catch(() => {
            resolve();
        });
    });
}

export async function getRolePageList(orgId: string): Promise<void> {
    return new Promise((resolve) => {
        getFinanceOrgRoleListApi({
            orgId,
            pageIndex: roleFilterObject.value.currentPage,
            pageSize: roleFilterObject.value.currentSize,
            searchInput: roleFilterObject.value.searchInput,
            sortField: roleFilterObject.value.sortField,
            sortType: roleFilterObject.value.sortType
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

export async function updateRole(checkedNodeIds: string[]): Promise<void> {
    return new Promise((resolve) => {
        updateFinanceOrgRoleApi({
            roleId: currentRoleId.value,
            orgId: currentInstitutionId.value,
            ...roleForm.value,
            menuIdArr: checkedNodeIds
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
        }).then((data: string[]) => {
            resolve(data);
        }).catch(() => {
            resolve(undefined);
        });
    });

}
