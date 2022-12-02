/*
 * @Description:
 * @FilePath: \dms-web\src\views\access\constants.ts
 * @Author: zys
 * @Date: 2022-11-07 16:27:05
 * @LastEditTime: 2022-11-28 14:51:38
 * @LastEditors: zys
 * @Reference:
 */
import { checkPhoneId, checkVerifyCode, checkPassword } from '@/utils/validate';
import type { FormItemRule } from 'element-plus';

export const COUNT_PASSWORD_FORM_RULES: { [K in string]: FormItemRule[] } = {
    phoneNumber: [{ validator: checkPhoneId, trigger: ['blur', 'change'] }],
    password: [
        { required: true, message: '密码不能为空', trigger: ['blur', 'change'] },
        { validator: checkPassword, trigger: ['blur', 'change'] },
    ],
    inputVerifyCode: [{ validator: checkVerifyCode, trigger: ['blur', 'change'] }],
};
