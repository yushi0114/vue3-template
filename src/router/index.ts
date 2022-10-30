import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router';
import { Home } from '@/views/home';
import { Signin } from '@/views/access';
import type { DynamicNavEntity } from '@/types';
import { dynamicRouteMap, genDynamicComponent } from '@/views-dynamic';
import { Error404 } from '@/views/system';
import { Base } from '@/views/base';

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
            }
        ],
    },{
        path: SIGNIN_PATH,
        name: 'signin',
        component: Signin
    }
];


export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});


export function addDynamicRoutes(router: Router, navs: DynamicNavEntity[]) {
    navs
        .map((nav) => ({ nav, routePair: dynamicRouteMap.get(nav.value) }))
        .filter(navSource => !!navSource.routePair)
        .forEach(({ nav, routePair }) => {
            const [routePath, filePath] = routePair as [string, string];
            nav.defaultPath = routePath.replace(/\/:\w+/g, '/0');
            router.addRoute(ROOT_NAME, {
                path: routePath,
                component: genDynamicComponent(filePath),
                meta: {
                    title: nav.name,
                    permission: nav.permission || RoutePermission.read
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
