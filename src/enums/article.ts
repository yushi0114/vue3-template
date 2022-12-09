/*
 * @Description:
 * @FilePath: \dms-web\src\enums\article.ts
 * @Author: zys
 * @Date: 2022-11-14 10:10:25
 * @LastEditTime: 2022-11-18 10:21:40
 * @LastEditors: zys
 * @Reference:
 */

// 文章状态枚举
export enum ARTICLE_STATUS {
    ALL = '',
    PUBLISHED = 2,
    DRAFT = 1,
    OFFLINE = 0,
    MY_PUBLISHED = 3,
}

// 文章状态label枚举
export enum ARTICLE_STATUS_LABEL {
    ALL = '全部',
    PUBLISHED = '已发布',
    DRAFT = '我的草稿箱',
    OFFLINE = '已下线',
    MY_PUBLISHED = '我发布的',
}

// 文章状态tag枚举
export enum ARTICLE_STATUS_TAG {
    OFFLINE = '已下线',
    PUBLISHED = '已发布',
    DRAFT = '草稿',
}

// 文章排序枚举
export enum SORT_TYPE {
    DESC = 'DESC',
    ASC = 'ASC',
    NONE = '',
}

// 热点新闻枚举
export enum NEWS_TYPE {
    HOT = 1,
    NOT_HOT = 0,
}

// 文章模块枚举
export enum ARTICLE_MODULE {
    NEWS_LXT = 0, // 辽信通新闻
    POLICY_LXT = 1, // 辽信通政策
    NEWS_ZJFW = 2, // 市综服新闻
    POLICY_ZJFW = 3, // 市综服政策
}

// 文章操作枚举
export enum ARTICLE_OPERATE_MODE {
    PUBLISH = '0',
    OFFLINE = '1',
    SORT = '2',
    DELETE = '3',
    EDIT = '4',
    SET_HOT = '5',
    CANCEL_HOT = '6',
}

// 文章操作label枚举
export enum ARTICLE_OPERATE_MODE_LABEL {
    PUBLISH = '发布',
    OFFLINE = '下线',
    SORT = '排序',
    DELETE = '删除',
    EDIT = '编辑',
    SET_HOT = '设为热门',
    CANCEL_HOT = '取消热门',
}

// 文章API集合
export enum ARTICLE_API {
    LOAD_LIST,
    ADD_ARTICLE,
    UPDATE_ARTICLE,
    UPDATE_ARTICLE_STATUS,
    UPDATE_ARTICLE_SORT,
    UPDATE_HOT_NEWS,
    LOAD_ARTICLE_DETAIL,
    UPLOAD_FILE,
    DELETE_FILE,
    DELETE_ARTICLE,
    IS_THUMBNAIL,
    IS_EXIST_FILE
}

// 页面路由
export enum LINK_TYPE {
    ADD = '/create',
    EDIT = '/edit',
    DETAIL = '/detail',
}

// 文章类型label
export enum ARTICLE_TYPE_LABEL {
    NEWS = '新闻',
    POLICY = '政策',
}

// 页面 LIST:列表页  DETAIL:详情页
export enum ARTICLE_PAGE {
    LIST = 1,
    DETAIL = 2,
}
