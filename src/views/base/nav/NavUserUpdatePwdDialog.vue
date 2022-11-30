<script lang="ts" setup>
import { updatePassword } from '@/api';
import { MENU_TAB } from '@/enums';
import { useUserStore } from '@/stores';
import { checkPassword, encrypt, type ValidateCallback } from '@/utils';
import { ElMessageBox, type FormInstance } from 'element-plus';

withDefaults(
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

const { signout } = useUserStore();
const router = useRouter();
const formRef = ref<FormInstance>();
const formModel = reactive({
    oldPassword: '',
    newPassword: '',
});

function checkNewPassword(rule: any, value: string, callback: ValidateCallback) {
    if (value === formModel.oldPassword) {
        return callback(new Error('旧密码不能与原始密码相同'));
    }
    return checkPassword(rule, value, callback);
}

const rules: any = reactive({
    oldPassword: [{ validator: checkPassword, trigger: 'change' }],
    newPassword: [{ validator: checkNewPassword, trigger: 'change' }],
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
            router.replace('/signin');
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
    class="nav-user-update-pwd"
    v-model="modelValue"
    @close="cancel"
    @closed="clear"
    @confirm="submit">
    <!-- -->
    <el-form
        ref="formRef"
        :rules="rules"
        :model="formModel"
        label-position="top">
        <el-form-item label="输入旧密码" prop="oldPassword">
            <el-input
                v-model="formModel.oldPassword"
                size="large"
                autocomplete="new-password"
                type="password"
                show-password
                />
        </el-form-item>
        <el-form-item label="输入新密码" prop="newPassword">
                <el-input
                v-model="formModel.newPassword"
                size="large"
                autocomplete="new-password"
                type="password"
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
