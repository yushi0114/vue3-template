/*
 * @Description: 加载图片指令
 * @FilePath: \dms-web\src\directive\real-img.ts
 * @Author: zys
 * @Date: 2022-11-14 16:03:53
 * @LastEditTime: 2022-12-08 11:25:44
 * @LastEditors: zys
 * @Reference:
 */
import loading from '../assets/images/loading.gif';
import errImg from '../assets/images/empty-image.png';
export const realImg = {
    name: 'real-img',
    beforeMount: async(el: HTMLElement, binding: any) => {
        // 指令名称为：real-img
        const imgURL = binding.value.img; // 获取图片地址
        const errorImg = binding.value.errImg || errImg; // 获取错误图片地址
        if (imgURL) {
            el.setAttribute('src', loading); // 设置默认图片
            try {
                // 判断图片是否存在
                const exist = await imageIsExist(imgURL);
                if (exist) {
                    el.setAttribute('src', imgURL);
                } else {
                    el.setAttribute('src', errorImg);
                }
            } catch (error) {
                el.setAttribute('src', errorImg);
            }
        } else {
            el.setAttribute('src', errorImg);
        }
    }
};
/** * 检测图片能否存在 * @param url */
const imageIsExist = (url: string) => {
    return new Promise((resolve) => {
        let img: any = new Image();
        img.onload = function(this: any) {
            if (this.complete === true) {
                resolve(true);
                img = null;
            }
        };
        img.onerror = function() {
            resolve(false);
            img = null;
        };
        img.src = url;
    });
};
