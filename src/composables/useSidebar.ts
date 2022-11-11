import { isBoolean } from '@/utils';
import { createGlobalState, useLocalStorage } from '@vueuse/core';

export const useSidebar = createGlobalState(() => {
    const expand = useLocalStorage('SJZX_DMS_SIDEBAR_EXPAND', false);
    function toggleExpand(next?: any) {
        expand.value = isBoolean(next) ? next : !expand.value;
    }
    return { expand, toggleExpand };
});

