/*
 * @Description:
 * @FilePath: \dms-web\src\views\access\constants.ts
 * @Author: zys
 * @Date: 2022-11-07 16:27:05
 * @LastEditTime: 2022-11-08 11:42:46
 * @LastEditors: zys
 * @Reference:
 */
import { checkPhoneId, checkVerifyCode, checkPassword } from '@/utils/validate';

export const COUNT_PASSWORD_FORM_RULES = Object.freeze({
    phoneNumber: [{ validator: checkPhoneId, trigger: 'change' }],
    password: [{ validator: checkPassword, trigger: 'change' }],
    inputVerifyCode: [{ validator: checkVerifyCode, trigger: 'change' }],
});
