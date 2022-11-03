import { useUrlSearchParams } from '@vueuse/core';
import { ref, watch } from 'vue';

/**
 * only supports `string` type in url query.
 */
export function useQueryParams<T extends Record<string, any>>(initialValue: T) {

    const searchParams = useUrlSearchParams<T>('history', {
        initialValue
    });

    const queryParams = ref<T>(initialValue);

    function goQuery(params: Partial<T>) {
        Object.assign(searchParams, params);
    }
    watch(searchParams, () => {
        Object.assign(queryParams.value, searchParams);
    }, { immediate: true });

    return { queryParams, goQuery };
}
