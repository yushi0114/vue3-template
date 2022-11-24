import { ref } from 'vue';
import type { RoleFormType, RoleListItemType, RoleTabType } from '@/views/system/type/role-list.type';
import { addRoleApi, getMenuTreeApi, updateRoleApi } from '@/api/system-manage';
import type { TreeItemType } from '@/views/system/type/menu-list.type';
import { ElMessage } from 'element-plus';
import { getFinanceOrgRoleList } from '@/api/finance/finance-institution';
import { currentMenuId } from '@/views/finance/institution/components/finance-institution';

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
    currentPage: 0
});

export function resetRoleFilterObject() {
    roleFilterObject.value = {
        sortField: 'update_time',
        sortType: 'desc',
        searchInput: '',
        currentSize: 10,
        currentPage: 0
    };
}

export async function handleGoBack() {
    mode.value = 'list';
    currentRoleId.value = undefined;
}

export async function getTreeData(name?: RoleTabType): Promise<void> {
    return new Promise((resolve) => {
        getMenuTreeApi(name ? name : activeName.value).then(data => {
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
            orgId: currentMenuId.value,
            pageIndex: roleFilterObject.value.currentPage + 1,
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
        addRoleApi({
            ...roleForm.value,
            menuIdArr: checkedNodeIds,
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

export async function updateRole(checkedNodeIds: string[]): Promise<void> {
    return new Promise((resolve) => {
        updateRoleApi({
            roleId: currentRoleId.value,
            ...roleForm.value,
            menuIdArr: checkedNodeIds,
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
