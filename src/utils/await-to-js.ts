/*
 * @Description:
 * @FilePath: \dms-web\src\utils\await-to-js.ts
 * @Author: zys
 * @Date: 2022-11-15 17:24:07
 * @LastEditTime: 2022-11-15 17:25:33
 * @LastEditors: zys
 * @Reference:
 */

/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function to<T, U = Error>(promise: Promise<T>, errorExt?: object): Promise<[U, undefined] | [null, T]> {
    // 返回的类型有两种：失败/成功
    return promise
        .then<[null, T]>((data: T) => [null, data]) // 成功
        .catch<[U, undefined]>((err: U) => {
            // 如果有错误
            if (errorExt) {
                // 如果有错误信息的扩展
                const parsedError = Object.assign({}, err, errorExt); // 就把他和错误信息一起合到一个空对象上
                return [parsedError, undefined];
            }

            return [err, undefined];
        });
}
