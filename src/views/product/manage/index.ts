import type { RouteRecordRaw } from 'vue-router';
import New from './New.vue';
export const routes: RouteRecordRaw[] = [
    {
        component: New,
        path: '/new/:p',
        meta: {
            title: '新建产品'
        }
    }
];
