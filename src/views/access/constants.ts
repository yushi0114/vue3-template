/*
 * @Description:
 * @FilePath: \dms-web\src\views\access\constants.ts
 * @Author: zys
 * @Date: 2022-11-07 16:27:05
 * @LastEditTime: 2022-11-18 16:50:33
 * @LastEditors: zys
 * @Reference:
 */
import { checkPhoneId, checkVerifyCode, checkPassword } from '@/utils/validate';
import type { FormItemRule } from 'element-plus';

export const COUNT_PASSWORD_FORM_RULES: { [K in string]: FormItemRule[] } = {
    phoneNumber: [{ validator: checkPhoneId, trigger: 'change' }],
    password: [{ validator: checkPassword, trigger: 'change' }],
    inputVerifyCode: [{ validator: checkVerifyCode, trigger: 'change' }],
};
