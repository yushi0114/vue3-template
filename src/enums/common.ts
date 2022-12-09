/*
 * @Description: 定义枚举类型
 * @FilePath: \dms-web\src\enums\common.ts
 * @Author: zys
 * @Date: 2022-11-04 15:03:26
 * @LastEditTime: 2022-12-09 15:41:41
 * @LastEditors: zys
 * @Reference:
 */

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

export enum UPLOAD_FILE_TYPE {
    IMAGE = 1,
    ANY_FILE = 2,
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
    EDITOR = 'editor',
    IMAGE = 'image',
}

export enum FILE_SERVER {
    LXT = '/lncredit/files',
    ZJFW = '/zjfw/files',
}

export enum ELEMENT_TAG_TYPE {
    SUCCESS = 'success',
    WARNING = 'warning',
    DANGER = 'danger',
    INFO = 'info',
}

export enum OPERATE_TYPE {
    ADD = 'add',
    EDIT = 'edit',
    DELETE = 'delete',
    READ = 'read',
}

export enum PROCESS_BAR_STATUS {
    SUCCESS = 'success',
    EXCEPTION = 'exception',
    WARNING = 'warning',
    NORMAL = '',
}
