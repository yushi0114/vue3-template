/*
 * @Description:
 * @FilePath: \dms-web\src\utils\validate.ts
 * @Author: zys
 * @Date: 2022-11-07 17:08:03
 * @LastEditTime: 2022-11-07 17:20:14
 * @LastEditors: zys
 * @Reference:
 */
type ICallback = (message?: Error) => {};
// 验证手机号
export function isPhoneNumber(val: string): boolean {
    return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(val);
}

export const checkPhoneId = (rule: any, value: string, callback: ICallback) => {
    if (!value) {
        callback(new Error('手机号不能为空！'));
    } else if (!isPhoneNumber(value)) {
        callback(new Error('请输入正确的手机号码！'));
    } else {
        callback();
    }
};

export const checkVerifyCode = (rule: any, value: string, callback: ICallback) => {
    if (!value) {
        callback(new Error('图形验证码不能为空！'));
    } else if (!/^\d{1,2}$/.test(value)) {
        callback(new Error('图形验证码答案为1~2位数字'));
    } else {
        callback();
    }
};

export function checkPassword(rule: any, value: string, callback: ICallback) {
    const passwordReg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&^*])[a-zA-Z0-9!@#$&^*]{8,18}$/);
    if (!passwordReg.test(value)) {
        callback(new Error('8-18个字符，必须包含数字、大小写字母、符号!@#$&^*的组合'));
    } else {
        callback();
    }
}
