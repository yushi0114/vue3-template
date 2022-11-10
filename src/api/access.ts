import type { UserEntity } from '@/types';
// import type { AxiosResponse } from 'axios';
import { DMS_DOMAIN } from './const';
import { api } from './http';
import type { MENU_TAB } from '@/enums';

// dengku
export type SigninPayload = {
    account: string;
    password: string;
    captcha: string;
    tab: MENU_TAB;
};

export type SigninResponse = {
    id: string;
    token: string;
};

export function signin(p: SigninPayload): Promise<SigninResponse> {
    return api.post(`${DMS_DOMAIN}/v1/login/pwd`, p);
}

// 退出登录
export function signout() {
    return api.post(`${DMS_DOMAIN}/v1/logout`);
}

// 获取用户信息
export type GetUserInfoPayload = {
    id?: string;
    tab?: MENU_TAB;
};
export type GetUserInfoResponse = UserEntity & {
    token: string;
};

export function getUserInfo(params: GetUserInfoPayload): Promise<GetUserInfoResponse> {
    return api.get(`${DMS_DOMAIN}/v1/user`, {
        params,
    });
}

// 获取验证码
export type GetCaptchaResponse = string;

export function getCaptcha(): Promise<GetCaptchaResponse> {
    return api.get(`${DMS_DOMAIN}/v1/captcha`);
}

// 修改用户名
export type UpdateUsernamePayload = {
    id: UserEntity['id']
    name: UserEntity['name']
    tab: MENU_TAB,
}

export function updateUsername(p: UpdateUsernamePayload) {
    return api.post(`${DMS_DOMAIN}/v1/update/name`, p);
}

// 修改密码
export type UpdatePasswordPayload = {
    newPassword: string,
    oldPassword: string,
    tab: MENU_TAB,
}

export function updatePassword(p: UpdatePasswordPayload) {
    return api.post(`${DMS_DOMAIN}/v1/update/pwd`, p);
}
