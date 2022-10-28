/**
 * 生成UUID
 */
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).replace(/-/g, '');
}

/**
 * 生成签名时，get请求的参数，number类型都转换为string类型
 */
export function jsonReplacer(key: string, value: any) {
    if (key === '' || typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    return undefined;
}
