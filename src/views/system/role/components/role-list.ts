import { ref } from 'vue';
import { addRoleApi, deleteRoleApi, getMenuTreeApi, getRoleListApi, updateRoleApi } from '@/api/system-manage';
import type { RoleFormType, RoleListItemType, RoleTabType, TreeItemType } from '@/types/system-manage';
import { ElMessage } from 'element-plus';

export const activeName = ref<RoleTabType>('cre');
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
    sortField: 'updateTime' | 'createTime',
    sortType: 'asc' | 'desc'
}>({
    sortField: 'updateTime',
    sortType: 'desc',
    searchInput: '',
    currentSize: 10,
    currentPage: 1
});

export function resetRoleFilterObject() {
    roleFilterObject.value = {
        sortField: 'updateTime',
        sortType: 'desc',
        searchInput: '',
        currentSize: 10,
        currentPage: 1
    };
}

export async function handleGoBack() {
    mode.value = 'list';
    currentRoleId.value = undefined;
    await getRolePageList({
        tab: activeName.value
    });
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

export async function getRolePageList(params: {
    tab: RoleTabType,
}): Promise<void> {
    return new Promise((resolve) => {
        getRoleListApi({
            ...params,
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

export async function addRole(checkedNodeIds: string[]): Promise<boolean> {
    return new Promise((resolve) => {
        addRoleApi({
            ...roleForm.value,
            menuIdArr: checkedNodeIds,
            tab: activeName.value
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '创建成功',
            });
            resolve(true);
        }).catch(() => {
            resolve(false);
        });
    });

}

export async function updateRole(checkedNodeIds: string[]): Promise<boolean> {
    return new Promise((resolve) => {
        updateRoleApi({
            roleId: currentRoleId.value,
            ...roleForm.value,
            menuIdArr: checkedNodeIds,
            tab: activeName.value,
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '更新成功',
            });
            resolve(true);
        }).catch(() => {
            resolve(false);
        });
    });
}

export async function deleteRole(params: {
    roleId: string;
    tab: RoleTabType
}): Promise<boolean> {
    return new Promise((resolve) => {
        deleteRoleApi(params).then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            resolve(true);
        }).catch(() => {
            ElMessage({
                type: 'error',
                message: '删除失败',
            });
            resolve(false);
        });
    });
}

