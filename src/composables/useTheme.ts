import { useDark, createGlobalState } from '@vueuse/core';

export const useTheme = createGlobalState(() => {
    const isDark = useDark();
    return { isDark };
});

