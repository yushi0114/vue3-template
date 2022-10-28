import { createRouter, createWebHistory } from 'vue-router';
import { Home } from '@/views/home';
import { Signin } from '@/views/access';
import { Error404 } from '@/views/system';
import type { DynamicNavEntity } from '@/types/system';
import { getToken, identity } from '@/utils';

// @/store/user signin()
export const dynmicRouteMap = new Map<DynamicNavEntity['value'], [string, string]>([
    ['1', ['/dashboard', '@/views-dynamic/dashboard/index.vue']],
    ['3', ['/demo-table', '@/views-dynamic/demo-table/index.vue']],
    ['4', ['/demo-permission', '@/views-dynamic/demo-permission/index.vue']],
]);

const SIGNIN_PATH = '/signin';
const ROOT_PATH = '/';
const ERROR_404_PATH = '/error-404';
const routes = [
    {
        path: ROOT_PATH,
        name: 'home',
        component: Home,
        // children: [{
        //     path: '/dashboard',
        //     name: 'dashboard',
        //     component: () => import('@/views-dynamic/dashboard/index.vue')
        // }]
    },{
        path: SIGNIN_PATH,
        name: 'signin',
        component: Signin
    },{
        path: ERROR_404_PATH,
        name: 'error404',
        component: Error404,
    }
];


export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});


export function addDynamicRoutes(navs: DynamicNavEntity[]) {
    navs
        .map((nav) => dynmicRouteMap.get(nav.value))
        .filter(identity)
        .forEach((routePair) => {
            const [routePath, filePath] = routePair as [string, string];
            router.addRoute('home', {
                path: routePath,
                component: () => {
                    console.log('&&&&', filePath);
                    return import(filePath);
                },
            });
        });
}

router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === SIGNIN_PATH) {
            next(ROOT_PATH);
        }
        else {
            if (to.matched.length === 0) {
                next(ERROR_404_PATH);
            }
            else {
                next();
            }
        }
    }
    else {
        if (to.path === SIGNIN_PATH) {
            next();
        }
        else {
            next(SIGNIN_PATH);
        }
    }
});

