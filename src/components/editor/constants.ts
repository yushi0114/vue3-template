import { isUrl } from '@/utils';
import { FILE_SERVER } from '@/enums';

const errorUrlTip = (text = '链接') => `${text}不合法，请输入合法${text}！`;
const isLocalUrl = (url: string) => {
    if (url.includes(FILE_SERVER.LXT) || url.includes(FILE_SERVER.ZJFW) || url.includes('base64')) {
        // eslint-disable-next-line no-useless-escape
        const localUrlRegex = /^[\w \/ \-]+\.[\w]+$/;
        return localUrlRegex.test(url);
    }
    return false;
};

export const customParseLinkUrl = (url: string) => {
    if (url.indexOf('http') !== 0 && !url.includes(FILE_SERVER.LXT) && !url.includes(FILE_SERVER.ZJFW)) {
        return `http://${url}`;
    }
    return url;
};

export const customCheckLinkFn = (text: string, url: string) => {
    if (!url) {
        return;
    }
    if (!isUrl(url) && !isLocalUrl(url)) {
        return errorUrlTip();
    }
    return true;
};

export const customCheckImageFn = (src: string, alt: string, url: string) => {
    if (!src) {
        return;
    }
    if (!isUrl(src) && !isLocalUrl(src)) {
        return errorUrlTip();
    }
    if (!/\.(png|jpg|jpeg)$/.test(src)) {
        return '只支持png、jpeg或jpg格式的文件';
    }

    if (!isUrl(url) && !isLocalUrl(url)) {
        return errorUrlTip();
    }

    if (!/\.(png|jpg|jpeg)$/.test(url)) {
        return '只支持png、jpeg或jpg格式的文件';
    }

    return true;
};

export const customCheckVideoFn = (src: string) => {
    if (!src) {
        return;
    }
    if (!isUrl(src) && !isLocalUrl(src)) {
        return errorUrlTip();
    }
    if (!/\.(mp4|avi|wmv|mpeg)$/.test(src)) {
        return '只支持mp4、avi、wmv或mpeg格式的文件';
    }

    return true;
};

export const customParseVideoSrc = (src: string) => {
    return src;
};

/**
 * 从html代码中匹配返回图片标签img的属性src的值的集合
 * @param htmlData
 * @return Array
 */
export function findAllImgSrcsFromHtml(htmlData: string) {
    const imgReg = /<img.*?(?:>|\/>)/gi; // 匹配图片中的img标签
    // eslint-disable-next-line no-useless-escape
    const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i; // 匹配图片中的src

    const arr = htmlData.match(imgReg); // 筛选出所有的img
    if (!arr || (Array.isArray(arr) && !arr.length)) {
        return false;
    }

    const srcArr = [];
    for (let i = 0; i < arr.length; i++) {
        const src = arr[i].match(srcReg);
        // 获取图片地址
        srcArr.push(src![1]);
    }

    return srcArr;
}

/**
 * 从rtf内容中匹配返回图片数据的集合
 * @param rtfData
 * @return Array
 */
export function extractImageDataFromRtf(rtfData: string) {
    if (!rtfData) {
        return [];
    }

    const regexPictureHeader = /{\\pict[\s\S]+?({\\\*\\blipuid\s?[\da-fA-F]+)[\s}]*/;
    const regexPicture = new RegExp('(?:(' + regexPictureHeader.source + '))([\\da-fA-F\\s]+)\\}', 'g');
    const images = rtfData.match(regexPicture);
    const result = [];

    if (images) {
        for (const image of images) {
            let imageType: string | boolean = false;

            if (image.includes('\\pngblip')) {
                imageType = 'image/png';
            } else if (image.includes('\\jpegblip')) {
                imageType = 'image/jpeg';
            }

            if (imageType) {
                result.push({
                    hex: image.replace(regexPictureHeader, '').replace(/[^\da-fA-F]/g, ''),
                    type: imageType,
                });
            }
        }
    }

    return result;
}

/**
 * 将html内容中img标签的属性值替换
 * @param htmlData html内容
 * @param imageSrcs html中img的属性src的值的集合
 * @param imagesHexSources rtf中图片数据的集合，与html内容中的img标签对应
 * @param isBase64Data 是否是Base64的图片数据
 * @return String
 */
export function replaceImagesFileSourceWithInlineRepresentation(
    htmlData: string,
    imageSrcs: string[],
    imagesHexSources: { type: any; hex: any }[],
    isBase64Data = true
) {
    if (imageSrcs.length === imagesHexSources.length) {
        for (let i = 0; i < imageSrcs.length; i++) {
            const newSrc = isBase64Data
                ? `data:${imagesHexSources[i].type};base64,${_convertHexToBase64(imagesHexSources[i].hex)}`
                : imagesHexSources[i];

            htmlData = htmlData.replace(imageSrcs[i], newSrc as string);
        }
    }

    return htmlData;
}

/**
 * 十六进制转base64
 */
export function _convertHexToBase64(hexString: string) {
    return btoa(
        hexString
            .match(/\w{2}/g)!
            .map((char: string) => {
                return String.fromCharCode(parseInt(char ?? '', 16));
            })!
            .join('')
    );
}
