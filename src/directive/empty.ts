/*
 * @Description: 空状态自定义指令
 * @FilePath: \dms-web\src\directive\empty.ts
 * @Author: zys
 * @Date: 2022-12-08 11:30:28
 * @LastEditTime: 2022-12-08 16:18:30
 * @LastEditors: zys
 * @Reference:
 */
import { type DirectiveBinding, createApp } from 'vue';
import { Empty } from '@/components';

export type BindingType = {
    content?: string;
    img?: any;
    visible: boolean;
};
export default {
    name: 'empty',
    updated(el: HTMLElement, binding: DirectiveBinding<BindingType>): void {
        el.style.position = el.style.position || 'relative';
        const { offsetHeight, offsetWidth } = el;
        const { visible, content, img } = binding.value;
        const app = createApp(Empty, {
            offsetHeight,
            offsetWidth,
            image: img,
            content,
        });
        // 提供一个父元素
        const parent = document.createElement('div');
        // mount方法不再像vue2一样支持未挂载的实例，必须得挂载，即必须得给参数
        const instance = app.mount(parent);
        const component = instance.$el;
        if (visible) {
            el.appendChild(component);
        } else {
            el.lastChild && el.removeChild(el.lastChild!);
        }
    },
};
