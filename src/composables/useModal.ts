/*
 * @Description:
 * @FilePath: \dms-web\src\composables\useModal.ts
 * @Author: zys
 * @Date: 2022-10-28 14:14:14
 * @LastEditTime: 2022-11-08 15:22:24
 * @LastEditors: zys
 * @Reference:
 */
export function useModal(callback: (data: any) => void) {
    const visible = ref<boolean>(false);

    async function open(data: any) {
        visible.value = true;
        if (typeof callback === 'function') {
            callback(data);
        }
    }

    function close() {
        visible.value = false;
    }

    return {
        visible,
        open,
        close,
    };
}
