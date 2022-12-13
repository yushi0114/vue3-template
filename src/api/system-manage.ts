import { DMS_DOMAIN } from './const';
import { api } from './http';
import type {
    AddRoleType,
    AddUserType,
    DeleteMenuType,
    DeleteRoleType,
    DeleteUserType, MenuItemType,
    MenuRouteType,
    MenuTabType,
    RoleTabType,
    UpdateMenuType,
    UpdateRoleType,
    UpdateUserType,
    UserListItemType
} from '@/types/system-manage';


export function addMenuApi(params: MenuRouteType) {
    return api.post(`${DMS_DOMAIN}/v1/add/menu`, params);
}

export function updateMenuApi(params: UpdateMenuType) {
    return api.post(`${DMS_DOMAIN}/v1/update/menu`, params);
}

export function deleteMenuApi(params: DeleteMenuType) {
    return api.post(`${DMS_DOMAIN}/v1/del/menu`, params);
}

export function getMenuTreeApi(tab: MenuTabType) {
    return api.get(`${DMS_DOMAIN}/v1/menu/tree`, {
        params: {
            tab
        }
    });
}

export function getMenuList(tab: MenuTabType) {
    return api.get(`${DMS_DOMAIN}/v1/menu/list`, {
        params: {
            tab
        }
    });
}

export function getMenuListByRoleId(roleId: string) {
    return api.get(`${DMS_DOMAIN}/v1/role/menu/list`, {
        params: {
            roleId
        }
    });
}

export function getMenuTreeByRoleId(roleId: string) {
    return api.get(`${DMS_DOMAIN}/v1/role/menu/tree`, {
        params: {
            roleId
        }
    });
}

export function getMenuDetailByIdApi(id: string, tab: MenuTabType): Promise<{data: MenuItemType[]}> {
    return api.get(`${DMS_DOMAIN}/v1/menu/detail`, {
        params: {
            id,
            tab
        }
    });
}

export function getRoleListApi(params: {
    searchInput?: string,
    tab: RoleTabType,
    pageIndex: number,
    pageSize: number
    sortField: 'updateTime' | 'createTime',
    sortType: 'asc' | 'desc'
}) {
    return api.get(`${DMS_DOMAIN}/v1/role/list`, {
        params
    });
}

export function getTotalRoleListApi(params: {
    tab: RoleTabType
}) {
    return api.get(`${DMS_DOMAIN}/v1/role/all`, {
        params
    });
}


export function addRoleApi(params: AddRoleType) {
    return api.post(`${DMS_DOMAIN}/v1/add/role`, params);
}

export function updateRoleApi(params: UpdateRoleType) {
    return api.post(`${DMS_DOMAIN}/v1/update/role`, params);
}

export function deleteRoleApi(params: DeleteRoleType) {
    return api.post(`${DMS_DOMAIN}/v1/del/role`, params);
}

export function getRoleMenuIdsApi(params: {
    tab: RoleTabType;
    roleId: string;
}): Promise<string[]> {
    return api.get(`${DMS_DOMAIN}/v1/role/menu/ids`, {
        params
    });
}


export function addUserApi(params: AddUserType) {
    return api.post(`${DMS_DOMAIN}/v1/add/user`, params);
}

export function updateUserApi(params: UpdateUserType) {
    return api.post(`${DMS_DOMAIN}/v1/update/user`, params);
}

export function deleteUserApi(params: DeleteUserType) {
    return api.post(`${DMS_DOMAIN}/v1/del/user`, params);
}

export function getUserListApi(params: {
    searchInput?: string,
    tab: RoleTabType,
    pageIndex: number,
    pageSize: number
    sortField: 'updateTime' | 'createTime',
    sortType: 'asc' | 'desc'
}): Promise<{
    data: UserListItemType[],
    pageTotal: number
}> {
    return api.get(`${DMS_DOMAIN}/v1/user/role/list`, {
        params
    });
}
