import type { DynamicNavEntity, NavEntity, UserEntity } from '@/types';
import { DMS_DOMAIN } from './const';
import { api } from './http';

export type DynamicNavsPayload = UserEntity['roleId'];
export type DynamicNavsResponse = DynamicNavEntity[];

export function dynamicNavs(roleId: DynamicNavsPayload): Promise<DynamicNavsResponse> {
    return api.get(`${DMS_DOMAIN}/v1/role/menu/list`, {
        params: { roleId },
        // mock
        // adapter: (conf) => {
        //     if (!roleId) return Promise.reject();

<<<<<<< HEAD
            return Promise.resolve({
                data: {
                    data: [
                        { id: '1', label: 'Dashboard', value: '1', permisson: 1 },
                        { id: '2', label: 'Demo', value: '2' },
                        { id: '3', label: 'Demo Table', pid: '2', value: '3', permisson: 7 },
                        { id: '4', label: 'Demo Permission', pid: '2', value: '4', permisson: 3 },
                        { id: '5', label: 'Example', value: '5' },
                        { id: '6', label: 'Example Table', pid: '5', value: '6', permisson: 5 },
                        { id: '7', label: '金融机构', value: '7' },
                        { id: '8', label: '城市管理', pid: '7', value: '8', permisson: 6}
                    ],
                },
                status: 200,
                statusText: 'OK',
                config: conf,
                headers: {},
            });
        },
    });
=======
        //     return Promise.resolve({
        //         data: {
        //             data: [
        //                 { id: '1', label: 'Dashboard', value: '1', permisson: 1 },
        //                 { id: '2', label: 'Demo', value: '2' },
        //                 { id: '3', label: 'Demo Table', pid: '2', value: '3', permisson: 7 },
        //                 { id: '4', label: 'Demo Permission', pid: '2', value: '4', permisson: 3 },
        //                 { id: '5', label: 'Example', value: '5' },
        //                 { id: '6', label: 'Example Table', pid: '5', value: '6', permisson: 5 },
        //             ],
        //         },
        //         status: 200,
        //         statusText: 'OK',
        //         config: conf,
        //         headers: {},
        //     });
        // },
    }).then(res => res.data);
>>>>>>> 477f4b1994ee38aecb4e86c6f5e4ce1e72e5d2ac
}

export function allNavs(): Promise<NavEntity[]> {
    return api.get(`${DMS_DOMAIN}/v1/menu/tree/all`);
}
