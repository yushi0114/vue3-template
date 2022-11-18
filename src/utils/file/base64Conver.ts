/**
 * @description: base64 to blob
 */
export function dataURLtoBlob(base64Buf: string) {
    const arr = base64Buf.split(',');
    const typeItem = arr[0];
    const mime = typeItem.match(/:(.*?);/) ? typeItem.match(/:(.*?);/)?.[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    // eslint-disable-next-line no-plusplus
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

/**
 * @description: blob to file
 */
// eslint-disable-next-line no-undef
export function blobToFile(theBlob: Blob & { lastModifiedDate?: Date }, type: FilePropertyBag) {
    theBlob.lastModifiedDate = new Date();

    return new File([theBlob], `${new Date().getTime()}.png`, type);
}

/**
 * @description: base64 to file
 */
export function dataURLToFile(base64Buf: string) {
    const theBlob = dataURLtoBlob(base64Buf);
    return blobToFile(theBlob, { type: theBlob.type });
}

/**
 * img url to base64
 * @param url
 */
export function urlToBase64(url: string, mineType?: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let canvas: any = document.createElement('CANVAS');
        const ctx = canvas ? canvas.getContext('2d') : '';

        const img = new Image();
        img.crossOrigin = '';
        // eslint-disable-next-line consistent-return
        img.onload = function() {
            if (!canvas || !ctx) {
                return reject(new Error());
            }
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL(mineType || 'image/png');
            canvas = null;
            resolve(dataURL);
        };
        img.src = url;
    });
}

/**
 * file to img url
 * @param url
 */
export function fileToURL(file: File) {
    let url = null;
    if ((window as any).createObjectURL != undefined) {
        url = (window as any).createObjectURL(file);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

/**
 * file转base64
 */
export const blobToDataURL = (blob: Blob, cb: Function) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function(evt) {
            const base64 = evt.target?.result || '';
            cb(base64);
            resolve(base64);
        };
        reader.readAsDataURL(blob);
    });
};

/**
 * url转blob
 */
// export const urlToBlob = async (url) => {
//     if (typeof url !== 'string' || !url) {
//         return false;
//     }
//     const blob = await downloadFile(url);
//     return blob;
// };

export function getBase64Size(base64url: string) {
    // 获取base64图片大小，返回KB数字
    const indexBase64 = base64url.indexOf('base64,');
    if (indexBase64 < 0) return -1;
    const base64Content = base64url.substr(indexBase64 + 6);
    const base64ContentLength = base64Content.length;
    return Math.floor(base64ContentLength - (base64ContentLength / 8) * 2);
}
