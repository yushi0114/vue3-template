import { ref } from 'vue';
import type { MenuFormType, MenuItemType, MenuTabType, TreeItemType } from '@/types/system-manage';
import { addMenuApi, deleteMenuApi, getMenuDetailByIdApi, getMenuTreeApi, updateMenuApi } from '@/api/system-manage';
import { ElMessage } from 'element-plus';

export const activeName = ref<MenuTabType>('fin');
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
export const formType = ref<'create' | 'edit' | 'empty' | 'detail'>('edit');

export function setParentId(value?: string) {
    parentId.value = value;
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
        status: false
    };
}

export async function goTreeView() {
    resetMenuForm();
    await getTreeData({ tab: activeName.value });
    currentMenuId.value = undefined;
    formType.value = 'empty';
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
        getMenuTreeApi(params?.tab ? params.tab : activeName.value).then(data => {
            menuTreeData.value = data as unknown as TreeItemType[];
            resolve();
        }).catch(() => {
            resolve();
        });
    });

}

export async function getMenuData(id: string): Promise<MenuItemType | undefined> {
    return new Promise((resolve) => {
        getMenuDetailByIdApi(id, activeName.value).then(data => {
            resolve(data.data[0]);
        }).catch(() => {
            resolve(undefined);
        });
    });

}

export async function createMenu(menuForm: MenuFormType): Promise<boolean> {
    return new Promise((resolve) => {
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
            resolve(true);
        }).catch(() => {
            resolve(false);
        });
    });
}

export async function editMenu(id: string, menuForm: MenuFormType): Promise<boolean> {
    return new Promise((resolve) => {
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
            resolve(true);
        }).catch(() => {
            resolve(false);
        });
    });
}


export async function removeMenus(willDeleteIds: string[]): Promise<boolean> {
    return new Promise((resolve) => {
        deleteMenuApi({
            tab: activeName.value,
            menuName: '',
            idArr: willDeleteIds
        }).then(() => {
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
