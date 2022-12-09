import type { RouteRecordRaw } from 'vue-router';
import ReportDetail from '@/components/ReportDetail/index.vue';
export const routes: RouteRecordRaw[] = [
    {
        component: ReportDetail,
        path: '/detail',
        name: 'report',
        meta: {
            title: '企业征信报告',
            menu: 'report',
            notRootChild: true
        },
    },
];
