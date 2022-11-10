import {ref} from 'vue';
import type {
    RouteFormType, RouteTabType, TreeItemType
} from '@/views/system-manage/type/route-list.type';
import {getMenuTree, getMenuDetailById, addMenu, updateMenu, deleteMenu} from '@/api/system-manage';


export const activeName = ref<RouteTabType>('fin');
export const dataSource = ref<TreeItemType[]>();
export const routeForm = ref<RouteFormType>();
export const parentId = ref();
export const currentRouteId = ref();
export const formType = ref<'create' | 'edit'>('edit');
export async function getTreeData(name?: RouteTabType): Promise<void> {
    getMenuTree(name ? name : activeName.value).then(data => {
        dataSource.value = data as unknown as TreeItemType[];
    });
}

export function setParentId(value?: string){
    parentId.value = value;
}

export function setCurrentRouteId(value?: string){
    currentRouteId.value = value;
}

export function setFormType(value: 'create' | 'edit') {
    formType.value = value;
}

export async function getRouteData(id?: string): Promise<void>{
    if (id){
        getMenuDetailById(id, activeName.value).then(data => {
            routeForm.value = {
                ...data.data[0],
                status: data.data[0].status === 1
            };
        });
    } else {
        routeForm.value = undefined;
    }
}

export async function createRoute(routeForm: RouteFormType) {
    await addMenu({
        ...routeForm,
        status: routeForm.status ? 1 : 0,
        menuName: '',
        tab: activeName.value,
        parentId: parentId.value ?? 0
    });

}

export async function editRoute(id: string, routeForm: RouteFormType) {
    await updateMenu({
        id,
        ...routeForm,
        status: routeForm.status ? 1 : 0,
        menuName: '',
        tab: activeName.value,
    });
}


export async function removeRoutes(willDeleteIds: string[]){
    await deleteMenu({
        tab: activeName.value,
        menuName: '',
        idArr: willDeleteIds
    });
}
