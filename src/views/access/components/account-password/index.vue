<template>
    <div class="apl-container">
        <el-form :rules="COUNT_PASSWORD_FORM_RULES" ref="formRef" :model="countAndPasswordForm" label-position="top">
            <el-form-item label="用户名" prop="phoneNumber">
                <el-input
                    placeholder="请输入您的用户名"
                    v-model.trim="countAndPasswordForm.phoneNumber"
                    :maxlength="11"
                    class="login-input"
                    ref="accountRef"
                    @input="handleInputChange($event, 'phoneNumber')">
                </el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input
                    v-if="visible"
                    type="password"
                    ref="passwordRef"
                    v-model="countAndPasswordForm.password"
                    placeholder="请输入您的密码"
                    class="login-input"
                    :maxlength="18">
                    <template #suffix>
                        <i @click="changePass('show')">
                            <img
                                src="@/assets/images/login-icon-password-invisible.svg"
                                alt=""
                                style="width: 16px; height: 16px" />
                        </i>
                    </template>
                </el-input>
                <el-input
                    v-else
                    type="text"
                    v-model="countAndPasswordForm.password"
                    ref="passwordRef"
                    class="login-input"
                    placeholder="请输入您的密码"
                    :maxlength="18">
                    <template #suffix>
                        <i @click="changePass('hide')">
                            <img
                                src="@/assets/images/login-icon-password-visible.svg"
                                alt=""
                                style="width: 16px; height: 16px" />
                        </i>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item label="验证码" prop="inputVerifyCode">
                <div class="flex">
                    <div class="flex-1">
                        <el-input
                            placeholder="请输入验证答案"
                            :maxlength="2"
                            class="login-input"
                            v-model.trim="countAndPasswordForm.inputVerifyCode"
                            @input="handleInputChange($event, 'inputVerifyCode')">
                        </el-input>
                    </div>

                    <div class="verify-code-container">
                        <div @click="getVerifyCode" class="verify-code" v-html="countAndPasswordForm.verifyCode"></div>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="">
                <el-button
                    class="login-btn"
                    type="primary"
                    :loading="loading"
                    block
                    @click="loginCountAndPasswordHandle">
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    name: 'AccountPasswordLogin',
});
</script>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { useUserStore } from '@/stores';
import { getCaptcha } from '@/api/access';
import { encrypt } from '@/utils/crypto';
import { COUNT_PASSWORD_FORM_RULES } from '../../constants';
import { MENU_TAB } from '@/enums';
const { push } = useRouter();
const { signin } = useUserStore();
const { loading, request: login } = useApi(signin);

// 监听Enter键登录！
onKeyStroke(
    'Enter',
    (e) => {
        e.preventDefault();
        loginCountAndPasswordHandle();
    },
    { eventName: 'keydown' }
);

type ICountAndPasswordFormKey = keyof typeof countAndPasswordForm;
const visible = ref(true);
const formRef = ref<FormInstance>();
const passwordRef = ref<HTMLBaseElement>();
const accountRef = ref<HTMLBaseElement>();

const countAndPasswordForm = reactive({
    phoneNumber: '',
    password: '',
    verifyCode: '',
    inputVerifyCode: '',
});

const getVerifyCode = () => {
    return getCaptcha()
        .then((res) => {
            countAndPasswordForm.verifyCode = res;
        })
        .catch(() => {});
};
const loginCountAndPasswordHandle = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            doLoginHandle();
        }
    });
};
const doLoginHandle = () => {
    const reqData = {
        account: countAndPasswordForm.phoneNumber,
        password: encrypt(countAndPasswordForm.password),
        captcha: countAndPasswordForm.inputVerifyCode,
        tab: MENU_TAB.MENU_TAB_DMS,
    };
    return login(reqData)
        .then(() => {
            // 路由跳转
            push('/home');
        })
        .catch(() => {
            getVerifyCode();
        });
};
const changePass = (params: string) => {
    visible.value = !(params === 'show');
    nextTick(() => {
        passwordRef.value?.focus();
    });
};
const handleInputChange = (e: string, prop: ICountAndPasswordFormKey) => {
    countAndPasswordForm[prop] = e.replace(/[^\d]/g, '');
};

onMounted(() => {
    nextTick(() => {
        accountRef.value?.focus();
    });
    getVerifyCode();
});
</script>

<style lang="scss" scoped>
.apl-container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
}

.login-btn {
    margin-top: 40px;
    width: 100%;
    height: 62px;
    font-size: 20px;
    background-color: var(--el-color-primary);
}

.login-input img {
    cursor: pointer;
}

.verify-code-container {
    width: 133px;
    height: 40px;
    margin-left: 16px;
}

.verify-code {
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    width: 133px;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
}
.apl-container {
    :deep(.el-form) {
        padding: 0;
    }
    :deep(.el-form-item) {
        margin-bottom: 22px;
    }
    :deep(.el-input) {
        --el-input-height: 40px;
    }
    :deep(.el-input__suffix) {
        display: flex;
        align-items: center;
        right: 8px;
    }

    :deep(.el-input__wrapper) {
        box-shadow: none;
        border-radius: 0;
        border-bottom: var(--el-border);
        padding: 1px 0;
    }
    :deep(.el-form-item.is-error .el-input__wrapper) {
        border-bottom: var(--el-border-width) var(--el-border-style) var(--el-color-danger);
    }

    :deep(.el-input__inner) {
        font-weight: 600;
        color: #484545;

        &::placeholder {
            font-weight: normal;
            color: #d9d9dc;
        }
    }

    :deep(.el-form-item__label) {
        &::before {
            display: none;
        }

        line-height: 15px;
        height: 15px;
        font-size: 14px;
        color: #a8a8a8;
    }
}
</style>
