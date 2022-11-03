import { ref } from 'vue';

export function useApi<T, K>(apiFunc: (payload: T) => Promise<K>) {
    const loading = ref(false);

    function load(payload: T) {
        loading.value = true;
        // TODO: PREVENT or CANCEL
        return apiFunc(payload)
            .then(res => {
                loading.value = false;
                return res;
            });
    }

    return { loading, load };
}
