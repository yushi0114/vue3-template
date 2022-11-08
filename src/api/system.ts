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
                        { id: '1', name: 'Dashboard', value: '1', permisson: 1 },
                        { id: '2', name: 'Demo', value: '2' },
                        { id: '3', name: 'Demo Table', pid: '2', value: '3', permisson: 7 },
                        { id: '4', name: 'Demo Permission', pid: '2', value: '4', permisson: 3 },
                        { id: '5', name: 'Example', value: '5' },
                        { id: '6', name: 'Example Table', pid: '5', value: '6', permisson: 5 },
                    ],
                },
                status: 200,
                statusText: 'OK',
                config: conf,
                headers: {},
            });
        },
    });
}

export function allNavs(): Promise<NavEntity[]> {
    return api.get(`${SYS_DOMAIN}/v1/menu/tree/all`);
}
