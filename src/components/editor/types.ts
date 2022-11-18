/*
 * @Description:
 * @FilePath: \dms-web\src\components\editor\types.ts
 * @Author: zys
 * @Date: 2022-11-17 15:32:55
 * @LastEditTime: 2022-11-18 10:06:25
 * @LastEditors: zys
 * @Reference:
 */
type InsertImageFnType = (url: string, alt: string, href: string) => void;
type InsertVideoFnType = (url: string, poster?: string) => void;
type InsertAttachmentFnType = (fileName: string, url: string) => void;
type LinkList = string[];
export type { InsertImageFnType, InsertVideoFnType, InsertAttachmentFnType, LinkList };
