import { isFunction } from './../utils/func';
import { isNumber } from '@/utils';
import { ref } from 'vue';
import { useNProgress } from './useNProgress';
import type { HttpError } from '@/api/types';

export type UseApiOption<T> = {
    cache?: boolean | number;
    onSuccess?: (data: T) => void;
    onError?: (error: HttpError) => void;
};
export function useApi<T extends (...args: any[]) => Promise<any>>(
    apiFunc: T,
    option?: UseApiOption<Awaited<ReturnType<T>>>
) {
    const opt: UseApiOption<Awaited<ReturnType<T>>> = Object.assign({ cache: false }, option);

    const loading = ref(false);
    const progress = useNProgress();
    const cache = ref<Awaited<ReturnType<T>>>();
    let timer: ReturnType<typeof setTimeout>;

    function clear() {
        cache.value = undefined;
        clearTimeout(timer);
    }
    const request: T = ((...args) => {
        progress.start();
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
                if (opt.onSuccess && isFunction(opt.onSuccess)) {
                    opt.onSuccess(res);
                }
                return Promise.resolve(res);
            })
            .catch((error: HttpError) => {
                if (opt.onError && isFunction(opt.onError)) {
                    opt.onError(error);
                }
                return Promise.reject(error);
            })
            .finally(() => {
                loading.value = false;
                progress.done();
            });
    }) as T;

    onBeforeUnmount(clear);
    return { loading, request, clear };
}
