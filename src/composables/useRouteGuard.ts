import { ERROR_404_PATH, ROOT_PATH, SIGNIN_PATH } from '@/router';
import { useUserStore } from '@/stores';
import { getToken } from '@/utils';
import { useRouter, type RouteLocationNormalized, type Router } from 'vue-router';

function hasNecessaryRoute(router: Router, to: RouteLocationNormalized) {
    return router.getRoutes().some(r => {
        if (r.path === '/' && to.path !== '/') return false;
        return to.path.indexOf(r.path.replace(/\/:\w+$/, '')) > -1;
    });
}

export function useRouteGuard() {
    const { getUserInfo } = useUserStore();
    const router = useRouter();
    router.beforeEach((to, from, next) => {
        if (getToken()) {
            if (!hasNecessaryRoute(router, to)) {
                getUserInfo()
                    .then(() => {
                        next({ ...to, replace: true });
                    })
                    .catch(() => {
                        next(ERROR_404_PATH);
                    });
            }
            else {
                if (to.path === SIGNIN_PATH) {
                    next(ROOT_PATH);
                }
                else {
                    if (to.matched.length === 0) {
                        next(ERROR_404_PATH);
                    }
                    else {
                        next();
                    }
                }
            }
        }
        else {
            if (to.path === SIGNIN_PATH) {
                next();
            }
            else {
                next(SIGNIN_PATH);
            }
        }
    });
}
