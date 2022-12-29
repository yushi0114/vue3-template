import { ref } from 'vue';
import { addRoleApi, deleteRoleApi, getMenuTreeApi, getRoleListApi, updateRoleApi } from '@/api/system-manage';
import { type RoleFormType, type RoleListItemType, RoleTabType, type TreeItemType } from '@/types/system-manage';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores';
import type { UserEntity } from '@/types';

export const loading = ref(false);
export const activeName = ref<RoleTabType>(RoleTabType.credit);
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

const { state, getUserInfo } = useUserStore();

function updateSidebar(tab: RoleTabType, role: UserEntity['roleId']) {
    if (tab === RoleTabType.dms && state.user?.roleId === role) {
        getUserInfo();
    }
}

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
    resetRoleForm();
    mode.value = 'list';
    currentRoleId.value = undefined;
    await getRolePageList({
        tab: activeName.value
    });
}

export async function getTreeData(name?: RoleTabType): Promise<void> {
    return new Promise((resolve) => {
        loading.value = true;
        getMenuTreeApi(name ? (name as any) : activeName.value).then(data => {
            roleMenuTreeData.value = data as unknown as TreeItemType[];
            resolve();
        }).catch(() => {
            resolve();
        }).finally(() => {
            loading.value = false;
        });
    });
}

export async function getRolePageList(params: {
    tab: RoleTabType,
}): Promise<void> {
    loading.value = true;
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
        }).finally(() => {
            loading.value = false;
        });
    });
}

export async function addRole(checkedNodeIds: string[]): Promise<boolean> {
    return new Promise((resolve) => {
        loading.value = true;
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
        }).finally(() => {
            loading.value = false;
        });
    });

}

export async function updateRole(checkedNodeIds: string[]): Promise<boolean> {
    return new Promise((resolve) => {
        loading.value = true;
        updateRoleApi({
            roleId: currentRoleId.value,
            ...roleForm.value,
            menuIdArr: checkedNodeIds,
            tab: activeName.value,
        }).then(() => {

            updateSidebar(activeName.value, currentRoleId.value);
            ElMessage({
                type: 'success',
                message: '更新成功',
            });
            resolve(true);
        }).catch(() => {
            resolve(false);
        }).finally(() => {
            loading.value = false;
        });
    });
}

export async function deleteRole(params: {
    roleId: string;
    tab: RoleTabType
}): Promise<boolean> {
    return new Promise((resolve) => {
        loading.value = true;
        deleteRoleApi(params).then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            resolve(true);
        }).catch(() => {
            // ElMessage({
            //     type: 'error',
            //     message: '删除失败',
            // });
            resolve(false);
        }).finally(() => {
            loading.value = false;
        });
    });
}
