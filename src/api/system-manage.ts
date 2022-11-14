import {DMS_DOMAIN} from './const';
import {api} from './http';
import type {
    AddRouteType,
    DeleteMenuType,
    RouteTabType,
    UpdateMenuType
} from '@/views/system-manage/type/route-list.type';
import type {AddRoleType, DeleteRoleType, RoleTabType, UpdateRoleType} from '@/views/system-manage/type/role-list.type';
import type {AddUserType, DeleteUserType, UpdateUserType} from '@/views/system-manage/type/user-list.type';


export function addMenu(params: AddRouteType) {
    return api.post(`${DMS_DOMAIN}/v1/add/menu`, params);
}

export function updateMenu(params: UpdateMenuType) {
    return api.post(`${DMS_DOMAIN}/v1/update/menu`, params);
}

export function deleteMenu(params: DeleteMenuType) {
    return api.post(`${DMS_DOMAIN}/v1/del/menu`, params);
}

export function getMenuTree(tab: RouteTabType) {
    return api.get(`${DMS_DOMAIN}/v1/menu/tree`, {
        params: {
            tab
        }
    });
}

export function getMenuList(tab: RouteTabType) {
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

export function getMenuDetailById(id: string, tab: RouteTabType) {
    return api.get(`${DMS_DOMAIN}/v1/menu/detail`, {
        params: {
            id,
            tab
        }
    });
}

export function getRoleList(params: {
    searchInput?: string,
    tab: RoleTabType,
    pageIndex: number,
    pageSize: number
    sortField: 'updateTime',
    sortType: 'asc' | 'desc'
}) {
    return api.get(`${DMS_DOMAIN}/v1/role/list`, {
        params
    });
}

export function getTotalRoleList(params: {
    tab: RoleTabType
}) {
    return api.get(`${DMS_DOMAIN}/v1/role/all`, {
        params
    });
}


export function addRole(params: AddRoleType) {
    return api.post(`${DMS_DOMAIN}/v1/add/role`, params);
}

export function updateRole(params: UpdateRoleType) {
    return api.post(`${DMS_DOMAIN}/v1/update/role`, params);
}

export function deleteRole(params: DeleteRoleType) {
    return api.post(`${DMS_DOMAIN}/v1/del/role`, params);
}

export function getRoleMenuIds(params: {
    tab: RoleTabType;
    roleId: string;
}) {
    return api.get(`${DMS_DOMAIN}/v1/role/menu/ids`, {
        params
    });
}


export function addUser(params: AddUserType) {
    return api.post(`${DMS_DOMAIN}/v1/add/user`, params);
}

export function updateUser(params: UpdateUserType) {
    return api.post(`${DMS_DOMAIN}/v1/update/user`, params);
}

export function deleteUser(params: DeleteUserType) {
    return api.post(`${DMS_DOMAIN}/v1/del/user`, params);
}

export function getUserList(params: {
    searchInput?: string,
    tab: RoleTabType,
    pageIndex: number,
    pageSize: number
    sortField: 'updateTime',
    sortType: 'asc' | 'desc'
}) {
    return api.get(`${DMS_DOMAIN}/v1/user/role/list`, {
        params
    });
}
