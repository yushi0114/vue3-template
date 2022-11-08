/*
 * @Description: 定义枚举类型
 * @FilePath: \dms-web\src\views\enums\index.ts
 * @Author: zys
 * @Date: 2022-11-04 15:03:26
 * @LastEditTime: 2022-11-08 14:59:52
 * @LastEditors: zys
 * @Reference:
 */
export enum STATUS {
    DISABLED = 0,
    ABLED = 1,
}

export const STATUS_LABEL_MAP = Object.freeze({
    [STATUS.DISABLED]: '停用',
    [STATUS.ABLED]: '启用',
});
