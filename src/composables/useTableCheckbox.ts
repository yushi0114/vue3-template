/*
 * @Description: 表格多选操作
 * @FilePath: \dms-web\src\composables\useTableCheckbox.ts
 * @Author: zys
 * @Date: 2022-12-06 16:09:55
 * @LastEditTime: 2022-12-07 11:53:59
 * @LastEditors: zys
 * @Reference:
 */
import type { Ref } from 'vue';

export const useTableCheckbox = (list: Ref<any[]>) => {
    const ids = ref<string[]>([]);

    const isSelectAll = ref(false);
    const tableSelectAll = ref(false);

    const isIndeterminate = computed(() => {
        return !isSelectAll.value && !!ids.value.length && list.value.length > ids.value.length;
    });

    const handleSelectionChange = (selection: any) => {
        ids.value = selection.map((item: any) => item.id);
        isSelectAll.value = ids.value.length === list.value.length;
    };

    const handleChangeCheckAll = () => {
        isSelectAll.value = !isSelectAll.value;
        tableSelectAll.value = !tableSelectAll.value;
    };

    return {
        ids,
        isSelectAll,
        tableSelectAll,
        isIndeterminate,
        handleSelectionChange,
        handleChangeCheckAll,
    };
};
