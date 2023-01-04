/*
 * @Description:
 * @FilePath: \dms-web\src\views\article\news-lxt\index.ts
 * @Author: zys
 * @Date: 2022-11-18 14:17:29
 * @LastEditTime: 2023-01-04 13:51:09
 * @LastEditors: zys
 * @Reference:
 */
import type { RouteRecordRaw } from 'vue-router';
import Create from './Create.vue';
import Detail from './Detail.vue';
export const routes: RouteRecordRaw[] = [
    {
        component: Create,
        path: '/create/:type',
        meta: {
            title: '新建新闻',
        },
    },
    {
        component: Create,
        path: '/edit/:type',
        meta: {
            title: '编辑新闻',
        },
    },
    {
        component: Detail,
        path: '/detail/:type',
        meta: {
            title: '新闻详情',
        },
    },
];
