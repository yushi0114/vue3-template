import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router';
import Home from '@/views/home/Home.vue';
import { Signin } from '@/views/access';
import type { DynamicNavEntity } from '@/types';
import { genDynamicComponent } from '@/views';
import { Error404 } from '@/views/system';
import { Base } from '@/views/base';
import { isFunction } from '@/utils';

// @/store/user signin()
export const SIGNIN_PATH = '/signin';
export const ROOT_PATH = '/';
export const ERROR_404_PATH = '/error-404';
export const ROOT_NAME = 'base';
export enum RoutePermission {
    read = 1,
    exec = 2,
    update = 4,
    add = 8,
    delete = 16,
}

const routes: RouteRecordRaw[] = [
    {
        path: ROOT_PATH,
        name: ROOT_NAME,
        // redirect: ROOT_PATH,
        component: Base,
        children: [
            {
                path: '/home',
                name: 'homepage',
                component: Home,
                meta: {
                    title: 'Home'
                }
            },
            // {
            //     path: '/routerList',
            //     name: 'routerList',
            //     component: () => import('@/views/system/menu/index.vue')
            // },
            // {
            //     path: '/roleList',
            //     name: 'roleList',
            //     component: () => import('@/views/system/role/index.vue')
            // },
            // {
            //     path: '/userList',
            //     name: 'userList',
            //     component: () => import('@/views/system/user/index.vue')
            // }
        ],
    },{
        path: SIGNIN_PATH,
        name: 'signin',
        component: Signin
    },

];


export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});


export function addDynamicRoutes(router: Router, navs: DynamicNavEntity[]) {
    navs
        .forEach((nav) => {
            nav.defaultPath = nav.path.replace(/\/:\w+/g, '/0');
            router.addRoute(ROOT_NAME, {
                path: nav.path,
                component: genDynamicComponent(nav.component!),
                meta: {
                    title: nav.title,
                    permission: RoutePermission.read
                }
            });
        });

    router.addRoute(ROOT_NAME, {
        path: ERROR_404_PATH,
        component: Error404,
        meta: {
            title: 'Not Found',
            permission: RoutePermission.read
        }
    });
}
