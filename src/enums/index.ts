/*
 * @Description: 定义枚举类型
 * @FilePath: \dms-web\src\enums\index.ts
 * @Author: zys
 * @Date: 2022-11-04 15:03:26
 * @LastEditTime: 2022-11-09 10:44:23
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

// 菜单tabs
export const enum MENU_TAB {
    MENU_TAB_DMS = 'dms',
    MENU_TAB_FIN = 'fin',
    MENU_TAB_CRE = 'cre',
}
