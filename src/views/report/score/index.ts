import type { RouteRecordRaw } from 'vue-router';
import ScoreDetail from '@/components/ScoreDetail/index.vue';
export const routes: RouteRecordRaw[] = [
    {
        component: ScoreDetail,
        path: '/detail',
        name: 'score',
        meta: {
            title: '企业信用评分',
            menu: 'score',
            notRootChild: true
        },
    },
];
