/*
 * @Description: 新闻政策api统一管理
 * @FilePath: \dms-web\src\components\editor\useApiManage.ts
 * @Author: zys
 * @Date: 2022-11-15 09:46:15
 * @LastEditTime: 2022-11-18 11:07:43
 * @LastEditors: zys
 * @Reference:
 */
import { ARTICLE_API, FILE_SERVER } from '@/enums';
import { isThumbnail, isExistFile, deleteLxtFile, uploadLxtFile } from '@/api';
export const useApiManage = (fileServer: FILE_SERVER) => {
    const API_MAP = {
        [FILE_SERVER.LXT]: {
            [ARTICLE_API.UPLOAD_FILE]: uploadLxtFile,
            [ARTICLE_API.DELETE_FILE]: deleteLxtFile,
            [ARTICLE_API.IS_THUMBNAIL]: isThumbnail,
            [ARTICLE_API.IS_EXIST_FILE]: isExistFile,
        },
        [FILE_SERVER.ZJFW]: {
            [ARTICLE_API.UPLOAD_FILE]: uploadLxtFile,
            [ARTICLE_API.DELETE_FILE]: deleteLxtFile,
            [ARTICLE_API.IS_THUMBNAIL]: isThumbnail,
            [ARTICLE_API.IS_EXIST_FILE]: isExistFile,
        },
    };

    return API_MAP[fileServer];
};
