import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { signin as signinApi, signout as signoutApi, dynamicNavs, type SigninPayload } from '@/api';
import type { UserEntity } from '@/types/user';
import type { DynamicNavEntity } from '@/types/system';
import { toTree } from '@/utils/tree';
import { addDynamicRoutes } from '@/router';
import { removeToken, setToken } from '@/utils';
export const useUserStore = defineStore('user', () => {

    const state = reactive<{
        user: UserEntity | null,
        navs: DynamicNavEntity[],
        navTree: DynamicNavEntity[],
    }>({
        user: null,
        navs: [],
        navTree: [],
    });

    function signin(user: SigninPayload) {
        return signinApi(user).then(({ data: user }) => {
            state.user = user;
            setToken(user.token);
            return dynamicNavs(user.uid);
        }).then(({ data: navs }) => {
            // add route dynamic
            addDynamicRoutes(navs);
            state.navs = navs;

            state.navTree = toTree({}, navs);
            return state.user as UserEntity;
        });
    }

    function signout() {
        return signoutApi().then(() => {
            removeToken();
            state.user = null;
        });
    }

    function getUserInfo() {

    }

    const isLogin = computed(() => state.user !== null);

    return { state, signin, signout, isLogin, getUserInfo };
});
