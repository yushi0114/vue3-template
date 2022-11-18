/*
 * @Description:
 * @FilePath: \dms-web\src\utils\xss.ts
 * @Author: zys
 * @Date: 2022-11-17 16:37:06
 * @LastEditTime: 2022-11-17 16:41:47
 * @LastEditors: zys
 * @Reference:
 */
import { FilterXSS, whiteList, escapeAttrValue } from 'xss';
const commonAttrs = ['style', 'class', 'name'];
const newWhiteList = Object.assign(whiteList, {
    marquee: [],
    label: [],
    fieldset: [],
    legend: [],
    blockquote: [],
    video: [
        'autoplay',
        'controls',
        'crossorigin',
        'loop',
        'muted',
        'playsinline',
        'poster',
        'preload',
        'src',
        'height',
        'width',
    ],
    source: ['src', 'type'],
    img: ['data-href', 'src', 'alt'],
    p: [],
    div: ['data-w-e-type', 'data-w-e-is-void'],
    span: ['data-w-e-type', 'data-w-e-is-void', 'data-w-e-is-inline', 'data-link', 'data-fileName'],
    input: ['type', 'disabled', 'placeholder', 'checked'],
});
Object.keys(newWhiteList).forEach((key) => {
    newWhiteList[key] = [...(newWhiteList as any)[key], ...commonAttrs];
});
const onIgnoreTagAttr = (tag: string, name: string, value: any) => {
    if (name.substr(0, 5) === 'data-') {
        // 通过内置的escapeAttrValue函数来对属性值进行转义
        return name + '="' + escapeAttrValue(value) + '"';
    }
};
const options = {
    whiteList: newWhiteList,
    onIgnoreTagAttr,
    stripIgnoreTag: true, // 过滤所有非白名单标签的HTML
    stripIgnoreTagBody: ['script'], // script标签较特殊，需要过滤标签中间的内容
    css: false,
}; // 自定义过滤规则
export const xss = new FilterXSS(options);
