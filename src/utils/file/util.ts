/*
 * @Description: 处理文件的方法
 * @FilePath: \dms-web\src\utils\file\util.ts
 * @Author: zys
 * @Date: 2022-11-15 17:15:55
 * @LastEditTime: 2022-11-22 16:53:46
 * @LastEditors: zys
 * @Reference:
 */
import { FILE_SERVER } from '@/enums';
const imgVideoSrcRegExp = new RegExp(/((\/lncredit\/files|\/zjfw\/files)(\w|=|\?|\.|\/|&|-)+)\.(\w+)/g);

export const getFileIdByUrl = (url: string): string => {
    if (typeof url !== 'string') return '';
    const [idUrl, dateUrl] = url.split('/').reverse();
    if (!dateUrl || !idUrl) return '';
    return `/${dateUrl}/${idUrl}`;
};

// 用word方式计算正文字数
export function getTextWords(str: string) {
    let sLen = 0;
    try {
        // 先将回车换行符做特殊处理
        // eslint-disable-next-line no-irregular-whitespace
        str = str.replace(/(\r\n+|\s+|　+)/g, '龘');
        // 处理英文字符数字，连续字母、数字、英文符号视为一个单词
        // eslint-disable-next-line no-control-regex
        str = str.replace(/[\x00-\xff]/g, 'm');
        // 合并字符m，连续字母、数字、英文符号视为一个单词
        str = str.replace(/m+/g, '*');
        // 去掉回车换行符
        str = str.replace(/龘+/g, '');
        // 返回字数
        sLen = str.length;
        // eslint-disable-next-line no-empty
    } catch {}
    return sLen;
}

export const getUrlListFromText = (string = ''): string[] => {
    if (typeof string !== 'string') {
        return [];
    }
    const srcList = string.match(imgVideoSrcRegExp) ?? [];
    const unitSrcList = [...new Set(srcList)];
    return unitSrcList.filter((item) => item.includes(FILE_SERVER.LXT) || item.includes(FILE_SERVER.ZJFW));
};

// 替换a标签的链接
function replaceCallback(m: any, g1: string) {
    return `<a href="/leave?target=${g1}">`;
}
/**
 * 替换富文本中的链接
 * 将富文本中的不是本站的链接前追加 "/clib/leave?target="
 * @param    html  传入富文本
 * @returns  html  处理后的富文本
 */
export const replaceHTMLHref = (html: string) => {
    /**
     * 替换链接
     */
    const result = html.replace(/<a\s*href="(.*?)"\s*?>/gms, replaceCallback);
    return result;
};
