/*
 * @Description:
 * @FilePath: \dms-web\src\utils\file\file-check.ts
 * @Author: zys
 * @Date: 2022-11-10 17:38:06
 * @LastEditTime: 2022-11-10 17:38:23
 * @LastEditors: zys
 * @Reference:
 */
// 校验上传文件格式
export function checkFileType(fileValueSuffix: string) {
    if (/(.*)\.(mp4|avi|wmv|mpeg)$/.test(fileValueSuffix)) {
        // 根据后缀，判断是否符合视频格式
        return 'video';
    } else if (/(.*)\.(jpg|jpeg|png)$/.test(fileValueSuffix)) {
        // 根据后缀，判断是否符合图片格式
        return 'image';
    } else if (/(.*)\.(xls|xlsx|doc|docx|txt|pdf|ppt|zip|rar)$/.test(fileValueSuffix)) {
        // 根据后缀，判断是否符合附件格式
        return 'file';
    }
    return false;
}
