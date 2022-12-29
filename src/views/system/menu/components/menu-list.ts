import { ref } from 'vue';
import { type MenuFormType, type MenuItemType, MenuTabType, type TreeItemType } from '@/types/system-manage';
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
    status: false,
    parentId: '0'
});
export const menuDetailData = ref<MenuItemType>();
export const currentMenuId = ref();
export const formType = ref<'create' | 'edit' | 'empty' | 'detail'>('edit');

const { getUserInfo } = useUserStore();

function updateSidebar(tab: MenuTabType) {
    if (tab === MenuTabType.dms) {
        getUserInfo();
    }
}

export function setParentId(value?: string) {
    if (value) {
        menuForm.value.parentId = value;
    } else {
        menuForm.value.parentId = '0';
    }
}

export function setCurrentMenuId(value?: string) {
    currentMenuId.value = value;
}

export function setFormType(value: 'create' | 'edit' | 'empty' | 'detail') {
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
        status: false,
        parentId: '0'
    };
}

export async function goTreeView() {
    resetMenuForm();
    loading.value = true;
    try {
        if (formType.value === 'create') {
            await getTreeData({ tab: activeName.value });
            currentMenuId.value = undefined;
            formType.value = 'empty';
            return true;
        }
        if (formType.value === 'edit') {
            await getTreeData({ tab: activeName.value });
            currentMenuId.value = undefined;
            formType.value = 'empty';
            return true;
        }
        await getTreeData({ tab: activeName.value });
    } finally {
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
    const result = await getMenuData(id);
    await getTreeData({
        tab: activeName.value
    });
    if (result) {
        menuForm.value = {
            ...result,
            status: result.status === 1
        };
    }
}

export async function goDetailFormView(id: string): Promise<MenuItemType | undefined> {
    setFormType('detail');
    setCurrentMenuId(id);
    return getMenuData(id);
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

export async function getMenuData(id: string): Promise<MenuItemType | undefined> {
    return new Promise((resolve) => {
        loading.value = true;
        getMenuDetailByIdApi(id, activeName.value).then(data => {
            resolve(data.data[0]);
        }).catch(() => {
            resolve(undefined);
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
            tab: activeName.value
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
