import { ref } from 'vue';
import { type MenuFormType, MenuTabType, type TreeItemType } from '@/types/system-manage';
import { addMenuApi, deleteMenuApi, getMenuDetailByIdApi, getMenuTreeApi, updateMenuApi } from '@/api/system-manage';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores';

export const loading = ref(false);
export const activeName = ref<MenuTabType>(MenuTabType.finance);
export const menuTreeData = ref<TreeItemType[]>();
export const menuForm = ref<MenuFormType>({
    icon: '',
    name: '',
    title: '',
    path: '',
    desc: '',
    sort: 1,
    component: '',
    status: false
});
export const parentId = ref();
export const currentMenuId = ref();
export const formType = ref<'create' | 'edit' | 'empty'>('edit');

const { getUserInfo } = useUserStore();

function updateSidebar(tab: MenuTabType) {
    if (tab === MenuTabType.dms) {
        getUserInfo();
    }
}

export function setParentId(value?: string) {
    parentId.value = value;
}

export function setCurrentMenuId(value?: string) {
    currentMenuId.value = value;
}

export function setFormType(value: 'create' | 'edit' | 'empty') {
    formType.value = value;
}

export function resetMenuForm() {
    menuForm.value = {
        icon: '',
        name: '',
        title: '',
        path: '',
        desc: '',
        sort: 1,
        component: '',
        status: false
    };
}

export async function goTreeView() {
    resetMenuForm();
    loading.value = true;
    try {
        await getTreeData({ tab: activeName.value });
        currentMenuId.value = undefined;
        formType.value = 'empty';
    }
    finally {
        loading.value = false;
    }
}

export function goCreateFormView(parentId?: string) {
    formType.value = 'create';
    resetMenuForm();
    if (parentId) {
        setParentId(parentId);
    }
}

export async function goEditFormView(id: string) {
    setFormType('edit');
    setCurrentMenuId(id);
    await getMenuData(id);
}

export async function getTreeData(params?: {
    tab?: MenuTabType,
    searchText?: string
}): Promise<void> {
    return new Promise((resolve) => {
        loading.value = true;
        getMenuTreeApi(params?.tab ? params.tab : activeName.value).then(data => {
            menuTreeData.value = data as unknown as TreeItemType[];
            resolve();
        }).catch(() => {
            resolve();
        }).finally(() => {
            loading.value = false;
        });
    });

}

export async function getMenuData(id: string): Promise<void> {
    return new Promise((resolve) => {
        loading.value = true;
        getMenuDetailByIdApi(id, activeName.value).then(data => {
            menuForm.value = {
                ...data.data[0],
                status: data.data[0].status === 1
            };
            resolve();
        }).catch(() => {
            resolve();
        }).finally(() => {
            loading.value = false;
        });
    });

}

export async function createMenu(menuForm: MenuFormType): Promise<boolean> {
    return new Promise((resolve) => {
        loading.value = true;
        addMenuApi({
            ...menuForm,
            status: menuForm.status ? 1 : 0,
            menuName: '',
            tab: activeName.value,
            parentId: parentId.value ?? 0
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '创建成功',
            });
            updateSidebar(activeName.value);
            resolve(true);
        }).catch(() => {
            resolve(false);
        }).finally(() => {
            loading.value = false;
        });
    });
}

export async function editMenu(id: string, menuForm: MenuFormType): Promise<boolean> {
    return new Promise((resolve) => {
        loading.value = true;
        updateMenuApi({
            id,
            ...menuForm,
            status: menuForm.status ? 1 : 0,
            menuName: '',
            tab: activeName.value,
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '更新成功',
            });
            updateSidebar(activeName.value);
            resolve(true);
        }).catch(() => {
            resolve(false);
        }).finally(() => {
            loading.value = false;
        });
    });
}


export async function removeMenus(willDeleteIds: string[]): Promise<boolean> {
    return new Promise((resolve) => {
        loading.value = true;
        deleteMenuApi({
            tab: activeName.value,
            menuName: '',
            idArr: willDeleteIds
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            updateSidebar(activeName.value);
            resolve(true);
        }).catch(() => {
            ElMessage({
                type: 'error',
                message: '删除失败',
            });
            resolve(false);
        }).finally(() => {
            loading.value = false;
        });
    });

}
