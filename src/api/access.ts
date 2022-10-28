import type { DynamicNavEntity } from '@/types/system';
import type { UserEntity } from '@/types/user';
import type { AxiosResponse } from 'axios';
import { SYS_DOMAIN } from './const';
import { api } from './http';

export type SigninPayload = {
    username: string,
    password: string,
}

export type SigninResponse = UserEntity & {
    token: string
}

export function signin(p: SigninPayload) {
    return api.post<SigninResponse>(`${SYS_DOMAIN}/v1/signin`, p, {
        // mock
        adapter: (conf) => {
            if (p.username !== '123') return Promise.reject();

            return Promise.resolve<AxiosResponse<SigninResponse, any>>({
                data: { username: p.username, uid: '1', token: 'abc', roleId: '55' },
                status: 200,
                statusText: 'OK',
                config: conf,
                headers: {},
            });
        }
    });
}

export function signout() {
    return api.post(`${SYS_DOMAIN}/v1/signout`, null, {
        // mock
        adapter: (conf) => {
            return Promise.resolve({
                data: null,
                status: 200,
                statusText: 'OK',
                config: conf,
                headers: {},
            });
        }
    });
}

export type DynamicNavsPayload = string

export type DynamicNavsResponse = DynamicNavEntity[]

export function dynamicNavs(uid: DynamicNavsPayload) {
    return api.get<DynamicNavsResponse>(`${SYS_DOMAIN}/v1/signout`, {
        // mock
        adapter: (conf) => {
            if (!uid) return Promise.reject();

            return Promise.resolve({
                data: [
                    { id: '1', name: 'Dashboard', value: '1' },
                    { id: '2', name: 'Demo', value: '2' },
                    { id: '3', name: 'Demo Table', pid: '2', value: '3' },
                    { id: '4', name: 'Demo Permission', pid: '2', value: '4' },
                ],
                status: 200,
                statusText: 'OK',
                config: conf,
                headers: {},
            });
        }
    });
}
