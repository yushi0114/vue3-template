/*
 * @Description: 定义枚举类型
 * @FilePath: \dms-web\src\enums\index.ts
 * @Author: zys
 * @Date: 2022-11-04 15:03:26
 * @LastEditTime: 2022-11-11 10:03:59
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

export enum FILE_TYPE {
    VIDEO = 'video',
    IMAGE = 'image',
    FILE = 'file',
}
// 文件校验
export enum FILE_SIZE_ENUMS {
    // 图片最大2M
    IMAGE_SIZE_LIMIT = 2 * 1024 * 1024,

    // 视频最大20M
    VIDEO_SIZE_LIMIT = 20 * 1024 * 1024,

    // 文件最大5M
    FILE_SIZE_LIMIT = 5 * 1024 * 1024,
}

export enum FormType {
    INPUT = 'input',
    SELECT = 'select',
    TEXTAREA = 'textarea',
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    DATA_PICKER = 'date-picker',
    TREE = 'tree',
    TIME_PICKER = 'time-picker',
    SWITCH = 'switch',
    TEXT = 'text',
    UNIT = 'unit',
    UPLOAD = 'upload',
    INPUT_NUMBER = 'input-number',
}
