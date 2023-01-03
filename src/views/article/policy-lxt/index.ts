/*
 * @Description:
 * @FilePath: \dms-web\src\views\article\policy\index.ts
 * @Author: zys
 * @Date: 2022-11-18 14:17:29
 * @LastEditTime: 2022-11-18 14:22:16
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
            title: '新建政策',
        },
    },
    {
        component: Create,
        path: '/edit',
        meta: {
            title: '编辑政策',
        },
    },
    {
        component: Detail,
        path: '/detail',
        meta: {
            title: '政策详情',
        },
    },
];
