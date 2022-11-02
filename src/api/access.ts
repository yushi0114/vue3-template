import type { UserEntity } from '@/types';
// import type { AxiosResponse } from 'axios';
import { SYS_DOMAIN } from './const';
import { api } from './http';

export type SigninPayload = {
    account: string,
    password: string,
    captcha: string,
}

export type SigninResponse = {
    id: string,
    token: string,
}

export function signin(p: SigninPayload): Promise<SigninResponse> {
    return api.post(`${SYS_DOMAIN}/v1/login/pwd`, p, {
        // mock
        // adapter: (conf) => {
        //     if (p.username !== '123') return Promise.reject();

        //     return Promise.resolve<AxiosResponse<SigninResponse, any>>({
        //         data: { username: p.username, uid: '1', token: 'abc', roleId: '55' },
        //         status: 200,
        //         statusText: 'OK',
        //         config: conf,
        //         headers: {},
        //     });
        // }
    });
}

export function signout() {
    return api.post(`${SYS_DOMAIN}/v1/logout`);
}

export type GetUserInfoPayload = string;
export type GetUserInfoResponse = UserEntity & {
    token: string
}

export function getUserInfo(uid: GetUserInfoPayload): Promise<GetUserInfoResponse> {
    return api.get(`${SYS_DOMAIN}/v1/user?id=${uid}`);
}

export type GetCaptchaResponse = {
    captcha: string
}

export function getCaptcha(): Promise<GetCaptchaResponse> {
    return api.get(`${SYS_DOMAIN}/v1/captcha`);
}
