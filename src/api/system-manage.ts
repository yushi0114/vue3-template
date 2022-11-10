import {DMS_DOMAIN} from './const';
import {api} from './http';
import type {
    AddRouteType,
    DeleteMenuType,
    RouteTabType,
    UpdateMenuType
} from '@/views/system-manage/type/route-list.type';


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


export function getRoleLIst(params: {
    searchInput?: string,
    tab: RouteTabType
}) {
    return api.get(`${DMS_DOMAIN}/v1/role/list`, {
        params: {
            searchInput,
            tab
        }
    });
}

