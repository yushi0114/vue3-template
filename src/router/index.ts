import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router';
import { Home } from '@/views/home';
import { Signin } from '@/views/access';
import type { DynamicNavEntity } from '@/types';
import { genDynamicComponent, genDynamicViewConfig } from '@/views';
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
                meta: {
                    title: 'Home'
                }
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
    const navAddedPromises = navs.map((nav) => {
        // 生成 侧边栏的默认路径
        // demo-permission/:id => demo-permission/0
        nav.defaultPath = nav.path.replace(/\/:\w+/g, '/0');

        // 添加接口返回的动态路由
        router.addRoute(ROOT_NAME, {
            path: nav.path,
            component: genDynamicComponent(nav.component!),
            meta: {
                title: nav.title,
                menu: nav.name,
                permission: RoutePermission.read
            }
        });

        // 动态添加本地路由
        // 由接口返回的 `component` 字段，还会读取同名的 ts 配置文件,
        // 如果没有此文件则跳过此步骤
        // 例如 `/demo/permission/index` -> `/demo/permission/index.ts`
        // 此文件必须导出 `export const routes`
        const configFile = genDynamicViewConfig(nav.component!);
        return configFile?.().then(({ routes }: any) => {
            return (routes || []).map((route: any) => {
                const newRoute: RouteRecordRaw = {
                    // 生成与父级相同字符串开始的路径 -> 侧边导航高亮
                    // demo-permisson/:id + /yourPath
                    path: nav.path + route.path,
                    component: route.component,
                    meta: {
                        menu: nav.name,
                        ...route.meta
                    }
                };
                router.addRoute(ROOT_NAME, newRoute);
            });
        }) ?? Promise.resolve();
    });

    return Promise.all(navAddedPromises)
        .then(() => {
            router.addRoute(ROOT_NAME, {
                path: ERROR_404_PATH,
                component: Error404,
                meta: {
                    title: 'Not Found',
                    permission: RoutePermission.read
                }
            });
        });

}
