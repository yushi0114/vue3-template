import { isFunction } from './../utils/func';
import { isNumber } from '@/utils';
import { ref } from 'vue';
import type { HttpError } from '@/api/types';

export type UseApiOption<K> = {
    cache?: boolean | number;
    onSuccess?: (data: K) => void;
    onError?: (error: HttpError) => void;
    formatter?: <U = K>(response: K) => U
};
export function useApi<T extends (...args: any[]) => Promise<any>>(
    apiFunc: T,
    option?: UseApiOption<Awaited<ReturnType<T>>>
) {
    const opt: UseApiOption<Awaited<ReturnType<T>>> = Object.assign({ cache: false }, option);

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
                const response = isFunction(opt.formatter) ? opt.formatter!(res) : res;
                if (opt.cache) {
                    cache.value = response;
                    if (isNumber(opt.cache)) {
                        timer = setTimeout(clear, Number(opt.cache));
                    }
                }
                return response;
            });
        if (cache.value) {
            return Promise.resolve(cache.value);
        }

        return requestResponse
            .then((res: Awaited<ReturnType<T>>) => {
                if (isFunction(opt.onSuccess)) {
                    opt.onSuccess!(res);
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
