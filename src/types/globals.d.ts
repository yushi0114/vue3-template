/*
 * @Description: 通用声明
 * @FilePath: \dms-web\src\types\globals.d.ts
 * @Author: zys
 * @Date: 2022-11-07 16:13:20
 * @LastEditTime: 2022-11-09 15:56:46
 * @LastEditors: zys
 * @Reference:
 */

// Vue
declare module '*.vue' {
    import { DefineComponent } from 'vue';

    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare type ClassName = { [className: string]: any } | ClassName[] | string;

declare module '*.svg' {
    const CONTENT: string;
    export default CONTENT;
}

declare type Recordable<T = any> = Record<string, T>;
