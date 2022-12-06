import { MENU_TAB } from '@/enums';
import type { DynamicNavEntity, NavEntity, UserEntity } from '@/types';
import { DMS_DOMAIN } from './const';
import { api } from './http';

export type DynamicNavsPayload = UserEntity['roleId'];
export type DynamicNavsResponse = DynamicNavEntity[];

export function dynamicNavs(roleId: DynamicNavsPayload): Promise<DynamicNavsResponse> {
    return api.get(`${DMS_DOMAIN}/v1/role/menu/list`, {
        params: { roleId, tab: MENU_TAB.MENU_TAB_DMS },
    });
}

export function allNavs(): Promise<NavEntity[]> {
    return api.get(`${DMS_DOMAIN}/v1/menu/tree/all`);
}
