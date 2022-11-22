/*
 * @Description:
 * @FilePath: \dms-web\src\views\article\news\index.ts
 * @Author: zys
 * @Date: 2022-11-18 14:17:29
 * @LastEditTime: 2022-11-18 14:18:41
 * @LastEditors: zys
 * @Reference:
 */
import type { RouteRecordRaw } from 'vue-router';
import Create from './Create.vue';
import Detail from './Detail.vue';
export const routes: RouteRecordRaw[] = [
    {
        component: Create,
        path: '/create',
        meta: {
            title: '新建新闻',
        },
    },
    {
        component: Create,
        path: '/edit',
        meta: {
            title: '编辑新闻',
        },
    },
    {
        component: Detail,
        path: '/detail',
        meta: {
            title: '新闻详情',
        },
    },
];
