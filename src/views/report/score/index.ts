import type { RouteRecordRaw } from 'vue-router';
import ReportDetail from '@/components/ReportDetail/index.vue';
export const routes: RouteRecordRaw[] = [
    {
        component: ReportDetail,
        path: '/detail',
        name: 'score',
        meta: {
            title: '企业信用评分',
            menu: 'score',
            notRootChild: true
        },
    },
];
