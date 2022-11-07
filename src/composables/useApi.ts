import { ref } from 'vue';
import { useNProgress } from './useNProgress';

export function useApi<T extends ((...args: any[]) => Promise<any>)>(apiFunc: T) {
    const loading = ref(false);
    const progress = useNProgress();
    const request: T = ((...args) => {
        progress.start();
        loading.value = true;
        // TODO: PREVENT or CANCEL
        return apiFunc(...args)
            .then(res => {
                return res;
            })
            .finally(() => {
                loading.value = false;
                progress.done();
            });
    }) as T;

    return { loading, request };
}
