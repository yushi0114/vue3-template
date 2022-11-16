import {ref} from 'vue';
import type {
    MenuFormType, MenuTabType, TreeItemType
} from '@/views/system/type/menu-list.type';
import {getMenuTree, getMenuDetailById, addMenu, updateMenu, deleteMenu} from '@/api/system-manage';

export const activeName = ref<MenuTabType>('dms');
export const dataSource = ref<TreeItemType[]>();
export const menuForm = ref<MenuFormType>();
export const parentId = ref();
export const currentMenuId = ref();
export const formType = ref<'create' | 'edit'>('edit');
export async function getTreeData(tab?: MenuTabType): Promise<void> {
    getMenuTree(tab ? tab : activeName.value).then(data => {
        dataSource.value = data as unknown as TreeItemType[];
    });
}

export function setParentId(value?: string){
    parentId.value = value;
}

export function setCurrentMenuId(value?: string){
    currentMenuId.value = value;
}

export function setFormType(value: 'create' | 'edit') {
    formType.value = value;
}

export async function getMenuData(id?: string): Promise<void>{
    if (id){
        getMenuDetailById(id, activeName.value).then(data => {
            menuForm.value = {
                ...data.data[0],
                status: data.data[0].status === 1
            };
        });
    } else {
        menuForm.value = undefined;
    }
}

export async function createMenu(menuForm: MenuFormType) {
    await addMenu({
        ...menuForm,
        status: menuForm.status ? 1 : 0,
        menuName: '',
        tab: activeName.value,
        parentId: parentId.value ?? 0
    });

}

export async function editMenu(id: string, menuForm: MenuFormType) {
    await updateMenu({
        id,
        ...menuForm,
        status: menuForm.status ? 1 : 0,
        menuName: '',
        tab: activeName.value,
    });
}


export async function removeMenus(willDeleteIds: string[]){
    await deleteMenu({
        tab: activeName.value,
        menuName: '',
        idArr: willDeleteIds
    });
}
