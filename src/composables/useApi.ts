import { isNumber } from '@/utils';
import { ref } from 'vue';

export type UseApiOption = {
    cache?: boolean | number,
}

export function useApi<T extends ((...args: any[]) => Promise<any>)>(
    apiFunc: T,
    option?: UseApiOption,
) {
    const opt: UseApiOption = Object.assign({ cache: false }, option);

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
            : apiFunc(...args).then(res => {
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

        return requestResponse.finally(() => {
            loading.value = false;
        });
    }) as T;

    onBeforeUnmount(clear);
    return { loading, request, clear };
}
