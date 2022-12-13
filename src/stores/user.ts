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
        user: UserEntity | null
        navs: DynamicNavEntity[]
        navTree: DynamicNavEntity[]
    }>({
        user: null,
        navs: [],
        navTree: [],
    });

    const router = useRouter();
    const token = useToken();

    function signin(user: SigninPayload) {
        return signinApi(user).then((res) => {
            token.set(res.token);
            localStorage.setItem('dms', res.id);
            return Promise.resolve(res);
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
                // console.log('user: ', user);
                state.user = user;
                return dynamicNavs(user.roleId);
            })
            .then((navs) => {
                const validNavs = navs.filter((nav) => isFunction(genDynamicComponent(nav.component!)));
                return addDynamicRoutes(router, validNavs).then((formatNavs) => {
                    // console.log('navs: ', formatNavs);
                    state.navs = formatNavs;
                    state.navTree = toTree({}, formatNavs);
                    // console.log('state.navTree: ', state.navTree);
                    return state.user as UserEntity;
                });
            })
            .catch(noop);
    }

    const isLogin = computed(() => state.user !== null);

    return { state, signin, signout, isLogin, getUserInfo };
});
