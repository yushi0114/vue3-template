/*
 * @Description:
 * @FilePath: \dms-web\src\stores\user.ts
 * @Author: zys
 * @Date: 2022-11-22 10:47:59
 * @LastEditTime: 2022-11-30 16:56:36
 * @LastEditors: zys
 * @Reference:
 */
import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import {
    signin as signinApi,
    signout as signoutApi,
    getUserInfo as getUserInfoApi,
    dynamicNavs,
    type SigninPayload,
    type GetUserInfoPayload,
} from '@/api';
import type { DynamicNavEntity, UserEntity } from '@/types';
import { toTree } from '@/utils/tree';
import { addDynamicRoutes } from '@/router';
import { useRouter } from 'vue-router';
import { useToken } from '@/composables';
import { noop } from '@vueuse/core';
import { MENU_TAB } from '@/enums';
import { isFunction } from '@/utils';
import { genDynamicComponent } from '@/views';
export const useUserStore = defineStore('user', () => {
    const state = reactive<{
        user: UserEntity | null;
        navs: DynamicNavEntity[];
        navTree: DynamicNavEntity[];
        prevNavTree: DynamicNavEntity[];
    }>({
        user: null,
        navs: [],
        navTree: [],
        // 插入动态导航之前
        prevNavTree: [
        ],
    });

    const router = useRouter();
    const token = useToken();

    function signin(user: SigninPayload) {
        return signinApi(user).then((res) => {
            token.set(res.token);
            localStorage.setItem('dms', res.id);
            return getUserInfo({ tab: user.tab });
        });
    }

    function signout() {
        return signoutApi().then(() => {
            token.remove();
            localStorage.removeItem('dms');
            state.user = null;
        });
    }

    function getUserInfo(params?: GetUserInfoPayload) {
        const uid = state.user?.id || localStorage.getItem('dms');
        if (!uid) return Promise.reject();
        const queryParams = {
            id: uid,
            tab: params?.tab ?? MENU_TAB.MENU_TAB_DMS,
        };

        return getUserInfoApi(queryParams)
            .then((user) => {
                console.log('user: ', user);
                state.user = user;
                return dynamicNavs(user.roleId);
            })
            .then((navs) => {
                console.log('navs: ', navs);
                const validNavs = navs.filter((nav) => isFunction(genDynamicComponent(nav.component!)));
                state.navs = validNavs;
                return addDynamicRoutes(router, validNavs).then(() => {
                    state.navTree = toTree({}, validNavs);
                    console.log('state.navTree: ', state.navTree);
                    return state.user as UserEntity;
                });
            })
            .catch(noop);
    }

    const isLogin = computed(() => state.user !== null);

    return { state, signin, signout, isLogin, getUserInfo };
});
