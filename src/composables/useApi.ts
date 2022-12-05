import { isFunction } from './../utils/func';
import { isNumber } from '@/utils';
import { ref, type Ref } from 'vue';
import type { HttpError } from '@/api/types';

export type UseApiOption<K, P = any[]> = {
    cache?: boolean | number;
    onSuccess?: (data: K, params: P) => void;
    onError?: (error: HttpError) => void;
    formatter?: <U = K>(response: K) => U;
    ready?: Ref<any | undefined>;
};
export function useApi<T extends (...args: any[]) => Promise<any>>(
    apiFunc: T,
    option?: UseApiOption<Awaited<ReturnType<T>>, any[]>
) {
    const opt: UseApiOption<Awaited<ReturnType<T>>, any[]> = Object.assign({ cache: false }, option);

    const loading = ref(false);
    const data = ref<Awaited<ReturnType<T>> | undefined>(undefined);
    const cache = ref<Awaited<ReturnType<T>>>();
    let timer: ReturnType<typeof setTimeout>;
    // const waitFn = ref<any[]>([]);

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
                data.value = response;
                if (opt.cache) {
                    cache.value = response;
                    if (isNumber(opt.cache)) {
                        timer = setTimeout(clear, Number(opt.cache));
                    }
                }
                return response;
            });
        if (cache.value) {
            if (isFunction(opt.onSuccess)) {
                opt.onSuccess!(cache.value, [...args]);
            } else {
                return Promise.resolve(cache.value);
            }
        }

        return requestResponse
            .then((res: Awaited<ReturnType<T>>) => {
                if (isFunction(opt.onSuccess)) {
                    opt.onSuccess!(res, [...args]);
                } else {
                    return Promise.resolve(res);
                }
            })
            .catch((error: HttpError) => {
                if (isFunction(opt.onError)) {
                    opt.onError!(error);
                } else {
                    return Promise.reject(error);
                }
            })
            .finally(() => {
                loading.value = false;
            });
    }) as T;

    // const request: T = (...args) => {
    //     if (option?.ready && !option?.ready?.value) {
    //         waitFn.value.push(() => run(...args));
    //         return noop;
    //     }
    //     return run(...args);
    // };

    // watch(
    //     () => option?.ready,
    //     () => {
    //         if (option?.ready?.value) {
    //             waitFn.value.forEach((fn) => {
    //                 fn();
    //             });
    //         }
    //     }
    // );

    onBeforeUnmount(clear);
    return { loading, request, clear, data };
}
