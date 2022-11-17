import { isNumber, useUrlSearchParams } from '@vueuse/core';
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
        Object.keys(searchParams).forEach((key) => {
            let value = searchParams[key];
            if (isNumber(queryParams.value[key])) {
                value = Number(value);
            }
            if (queryParams.value[key] !== value) {
                queryParams.value[key] = value;
            }
        });
    }, { immediate: true });

    return { queryParams, goQuery };
}
