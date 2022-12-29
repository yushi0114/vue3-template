
import { ERROR_404_PATH, ROOT_PATH, SIGNIN_PATH, DEFAULT_REDIRECT_PATH } from '@/router';
import { useUserStore } from '@/stores';
import { useRouter, type RouteLocationNormalized, type Router } from 'vue-router';
import { useToken } from './useToken';
import { useNProgress } from './useNProgress';

function hasNecessaryRoute(router: Router, to: RouteLocationNormalized) {
    return router.getRoutes().some((r) => {
        if (r.path === '/' && to.path !== '/') return false;
        return r.path !== ROOT_PATH && to.path.indexOf(r.path.replace(/\/:\w+$/, '')) > -1;
    });
}

const necessaryCheckedRoutePathSet = new Set<string>();
export function useRouteGuard() {
    const { getUserInfo } = useUserStore();
    const router = useRouter();
    const token = useToken();
    const progress = useNProgress();

    router.beforeEach((to, from, next) => {
        progress.start();

        if (token.get()) {
            // 访问的路由如果还没有添加，可能是一个动态路由
            // 需要重新拉取api 动态添加路由，然后通过重定向 next({ ...to, replace }) 再次触发路由
            if (!hasNecessaryRoute(router, to)) {
                if (necessaryCheckedRoutePathSet.has(to.fullPath)) {
                    next(ERROR_404_PATH);
                } else {
                    necessaryCheckedRoutePathSet.add(to.fullPath);
                    getUserInfo()
                        .then(() => {
                            next({ ...to, replace: true });
                        })
                        .catch(() => {
                            next(ERROR_404_PATH);
                        });
                }
            } else {
                if (to.path === SIGNIN_PATH) {
                    next(DEFAULT_REDIRECT_PATH);
                } else {
                    if (to.matched.length === 0) {
                        next(ERROR_404_PATH);
                    } else {
                        next();
                    }
                }
            }
        } else {
            if (to.path === SIGNIN_PATH) {
                next();
            } else {
                next({
                    path: SIGNIN_PATH, query: {
                        redirect: to.path
                    }});
            }
        }
    });

    router.afterEach(() => {
        progress.done();
    });
}
