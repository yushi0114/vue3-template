<script lang="ts" setup>
import { updatePassword } from '@/api';
import { MENU_TAB } from '@/enums';
import { useUserStore } from '@/stores';
import { checkPassword, encrypt, type ValidateCallback } from '@/utils';
import { ElMessageBox, type FormInstance } from 'element-plus';

const props = withDefaults(
    defineProps<{
        modelValue: boolean,
    }>(),
    {
        modelValue: false
    }
);

const emit = defineEmits<{
    (e: 'update:modelValue', visible: boolean): void
}>();

const innerModel = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
});

const { signout } = useUserStore();
const router = useRouter();
const formRef = ref<FormInstance>();
const formModel = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
});

function checkOldPassword(rule: any, value: string, callback: ValidateCallback) {
    if (value === '') {
        return callback(new Error('旧密码不能为空'));
    }
    return checkPassword(rule, value, callback);
}

function checkNewPassword(rule: any, value: string, callback: ValidateCallback) {
    if (value === '') {
        return callback(new Error('新密码不能为空'));
    }
    if (value === formModel.oldPassword) {
        return callback(new Error('新密码不能与原始密码相同'));
    }
    return checkPassword(rule, value, callback);
}

function checkConfirmPassword(rule: any, value: string, callback: ValidateCallback) {
    if (value === '') {
        return callback(new Error('确认新密码不能为空'));
    }
    if (value !== formModel.newPassword) {
        return callback(new Error('两次输入的密码不相同'));
    }
    return checkPassword(rule, value, callback);
}

const rules: any = reactive({
    oldPassword: [{ validator: checkOldPassword, trigger: ['blur', 'change'], require: true }],
    newPassword: [{ validator: checkNewPassword, trigger: ['blur', 'change'], require: true }],
    confirmPassword: [{ validator: checkConfirmPassword, trigger: ['blur', 'change'], require: true }]
});

async function submit() {
    try {
        await formRef.value?.validate();
        await ElMessageBox.confirm('您确认修改登录密码？您将需要重新登录系统', '修改密码');
        await updatePassword({
            newPassword: encrypt(formModel.newPassword),
            oldPassword: encrypt(formModel.oldPassword),
            tab: MENU_TAB.MENU_TAB_DMS,
        });
        cancel();
        await ElMessageBox.alert('修改密码成功，请退出重新登录');
        try {
            await signout();
        }
        finally {
            router.replace('/login');
        }
    }
    catch {
        // noop
    }
}

function cancel() {
    // emit('update:modelValue', false);
    emit('update:modelValue', false);
}

function clear() {
    formRef.value?.resetFields();
}
</script>

<template>
<MessageDialog
    title="修改密码"
    width="480px"
    class="nav-user-update-pwd"
    v-model="innerModel"
    @close="cancel"
    @closed="clear"
    @confirm="submit">
    <!-- -->
    <el-form
        ref="formRef"
        size="large"
        :rules="rules"
        :model="formModel"
        label-width="100px">
        <el-form-item label="旧密码" prop="oldPassword" required>
            <el-input
                v-model="formModel.oldPassword"
                type="password"
                placeholder="请输入旧密码"
                show-password
                />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" required>
            <el-input
                v-model="formModel.newPassword"
                type="password"
                placeholder="请输入新密码"
                show-password
            />
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword" required>
            <el-input
                v-model="formModel.confirmPassword"
                type="password"
                placeholder="请确认新密码"
                show-password
            />
        </el-form-item>
    </el-form>
</MessageDialog>
</template>

<style lang="postcss">
.nav-user-update-pwd {
  @apply;
}
</style>
