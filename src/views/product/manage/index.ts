import type { RouteRecordRaw } from 'vue-router';
import New from './New.vue';
import ProductRep from './ProductRep.vue';
export const routes: RouteRecordRaw[] = [
    {
        component: New,
        path: '/new/:p',
        meta: {
            title: '新建产品',
        },
    },
    {
        component: ProductRep,
        path: '/req/:p',
        meta: {
            title: '查看申请企业',
        },
    },
];
