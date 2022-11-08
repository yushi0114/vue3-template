import type { DynamicNavEntity, NavEntity, UserEntity } from '@/types';
import { SYS_DOMAIN } from './const';
import { api } from './http';

export type DynamicNavsPayload = UserEntity['roleId'];
export type DynamicNavsResponse = DynamicNavEntity[];

export function dynamicNavs(roleId: DynamicNavsPayload): Promise<DynamicNavsResponse> {
    return api.get(`${SYS_DOMAIN}/v1/menu/tree`, {
        params: { roleId },
        // mock
        adapter: (conf) => {
            if (!roleId) return Promise.reject();

            return Promise.resolve({
                data: {
                    data: [
                        { id: '1', label: '仪表盘', value: '1', permisson: 1 },
                        { id: '2', label: 'Demo', value: '2', },
                        { id: '3', label: 'Demo Table', pid: '2', value: '3', permisson: 7 },
                        { id: '4', label: 'Demo Permission', pid: '2', value: '4', permisson: 3 },
                    ]
                },
                status: 200,
                statusText: 'OK',
                config: conf,
                headers: {},
            });
        }
    });
}

export function allNavs(): Promise<NavEntity[]> {
    return api.get(`${SYS_DOMAIN}/v1/menu/tree/all`);
}
