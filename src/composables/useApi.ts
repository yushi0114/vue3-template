import { isFunction } from './../utils/func';
import { isNumber } from '@/utils';
import { ref } from 'vue';
import type { HttpError } from '@/api/types';

export type UseApiOption<T, P = any[]> = {
    cache?: boolean | number;
    onSuccess?: (data: T, params: P) => void;
    onError?: (error: HttpError) => void;
};
export function useApi<T extends (...args: any[]) => Promise<any>>(
    apiFunc: T,
    option?: UseApiOption<Awaited<ReturnType<T>>, any[]>
) {
    const opt: UseApiOption<Awaited<ReturnType<T>>, any[]> = Object.assign({ cache: false }, option);

    const loading = ref(false);
    const cache = ref<Awaited<ReturnType<T>>>();
    let timer: ReturnType<typeof setTimeout>;

    function clear() {
        cache.value = undefined;
        clearTimeout(timer);
    }
    const request: T = ((...args) => {
        loading.value = true;

        const requestResponse = cache.value
            ? Promise.resolve(cache.value)
            : apiFunc(...args).then((res: Awaited<ReturnType<T>>) => {
                if (opt.cache) {
                    cache.value = res;
                    if (isNumber(opt.cache)) {
                        timer = setTimeout(clear, Number(opt.cache));
                    }
                }
                return res;
            });
        if (cache.value) {
            return Promise.resolve(cache.value);
        }

        return requestResponse
            .then((res: Awaited<ReturnType<T>>) => {
                if (isFunction(opt.onSuccess)) {
                    opt.onSuccess!(res, [...args]);
                }
                else {
                    return Promise.resolve(res);
                }
            })
            .catch((error: HttpError) => {
                if (isFunction(opt.onError)) {
                    opt.onError!(error);
                }
                else {
                    return Promise.reject(error);
                }
            })
            .finally(() => {
                loading.value = false;
            });
    }) as T;

    onBeforeUnmount(clear);
    return { loading, request, clear };
}
