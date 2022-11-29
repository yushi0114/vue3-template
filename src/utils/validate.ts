/*
 * @Description:
 * @FilePath: \dms-web\src\utils\validate.ts
 * @Author: zys
 * @Date: 2022-11-07 17:08:03
 * @LastEditTime: 2022-11-18 17:21:59
 * @LastEditors: zys
 * @Reference:
 */
import type { RuleItem } from 'async-validator';
import { illegalSymbolRegExp } from '@/utils/regExp';

export type ValidateCallback = (error?: string | Error) => void;

// 验证手机号
export function isPhoneNumber(val: string): boolean {
    return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(val);
}

export const checkPhoneId: RuleItem['validator'] = (rule, value, callback) => {
    if (!value) {
        callback(new Error('手机号不能为空！'));
    } else if (!isPhoneNumber(value)) {
        callback(new Error('请输入正确的手机号码！'));
    } else {
        callback();
    }
};

export const checkVerifyCode: RuleItem['validator'] = (rule, value, callback) => {
    if (!value) {
        callback(new Error('图形验证码不能为空！'));
    } else if (!/^\d{1,2}$/.test(value)) {
        callback(new Error('图形验证码答案为1~2位数字'));
    } else {
        callback();
    }
};

export const checkPassword = (rule: any, value: string, callback: ValidateCallback) => {
    const passwordReg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&^*])[a-zA-Z0-9!@#$&^*]{8,18}$/);
    if (!passwordReg.test(value)) {
        callback(new Error('8-18个字符，必须包含数字、大小写字母、符号!@#$&^*的组合'));
    } else {
        callback();
    }
};

export function isUrl(path: string) {
    // eslint-disable-next-line no-useless-escape
    const reg =
        // eslint-disable-next-line no-useless-escape
        /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/;
    return reg.test(path);
}

export function genCheckEmpty(msg: string = '不能为空') {
    return (_rule: any, val: string, callback: ValidateCallback) => {
        callback(val.length === 0 ? new Error(msg) : undefined);
    };
}


export const validatorIllegalSymbolFunction = (rule: any, value: string, callback: ValidateCallback) => {
    if (illegalSymbolRegExp.test(value)) {
        callback(new Error('输入内容不支持SQL和JS代码类型'));
    } else {
        callback();
    }
};

export const validateIllegalSymbol = {
    validator: validatorIllegalSymbolFunction,
    trigger: ['blur', 'change']
};