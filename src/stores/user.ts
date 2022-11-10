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
        prevNavTree: [
            {
                id: '',
                defaultPath: '/home',
                permission: 1,
                label: 'Homepage',
                parentId: '',
                sort: 0,
            },
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
                state.user = user;
                return dynamicNavs(user.roleId);
            })
            .then((navs) => {
                console.log('eeeeeeeeeeeee', navs);
                state.navs = navs;
                console.log(navs);
                addDynamicRoutes(router, navs);
                state.navTree = toTree({}, navs);
                return state.user as UserEntity;
            })
            .catch(noop);
    }

    const isLogin = computed(() => state.user !== null);

    return { state, signin, signout, isLogin, getUserInfo };
});
