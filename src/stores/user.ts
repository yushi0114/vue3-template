import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import {
    signin as signinApi,
    signout as signoutApi,
    getUserInfo as getUserInfoApi,
    dynamicNavs,
    type SigninPayload,
} from '@/api';
import type { DynamicNavEntity, UserEntity } from '@/types';
import { toTree } from '@/utils/tree';
import { removeToken, setToken } from '@/utils';
import { addDynamicRoutes } from '@/router';
import { useRouter } from 'vue-router';
export const useUserStore = defineStore('user', () => {

    const state = reactive<{
        user: UserEntity | null,
        navs: DynamicNavEntity[],
        navTree: DynamicNavEntity[],
        prevNavTree: DynamicNavEntity[],
    }>({
        user: null,
        navs: [],
        navTree: [],
        prevNavTree: [
            {
                id: '',
                defaultPath: '/home',
                permission: 1,
                name: 'Homepage',
                value: ''
            }
        ]
    });

    const router = useRouter();
    function signin(user: SigninPayload) {
        return signinApi(user).then(({ data: user }) => {
            state.user = user;
            setToken(user.token);
            localStorage.setItem('dms', user.uid);
            return getUserInfo();
        });
    }

    function signout() {
        return signoutApi().then(() => {
            removeToken();
            localStorage.removeItem('dms');
            state.user = null;
        });
    }

    function getUserInfo() {
        const uid = state.user?.uid || localStorage.getItem('dms');
        if (!uid) return Promise.reject();
        return getUserInfoApi(uid).then(({ data: user }) => {
            state.user = user;
            return dynamicNavs(user.uid);
        }).then(({ data: navs }) => {
            state.navs = navs;
            addDynamicRoutes(router, navs);
            state.navTree = toTree({}, navs);
            return state.user as UserEntity;
        });
    }

    const isLogin = computed(() => state.user !== null);

    return { state, signin, signout, isLogin, getUserInfo };
});
