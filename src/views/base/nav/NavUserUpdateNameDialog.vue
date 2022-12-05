<script lang="ts" setup>
import { updateUsername } from '@/api';
import { MENU_TAB } from '@/enums';
import { useUserStore } from '@/stores';
import { genCheckEmpty } from '@/utils';
import type { FormInstance } from 'element-plus';

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


const { state, getUserInfo } = useUserStore();

const formRef = ref<FormInstance>();
const formModel = reactive({
    username: state.user?.name!,
});

const rules: any = reactive({
    username: [{ validator: genCheckEmpty('用户名不能为空'), trigger: 'change' }],
});

async function submit() {
    try {
        await formRef.value?.validate();
        await updateUsername({
            id: state.user?.id!,
            name: formModel.username,
            tab: MENU_TAB.MENU_TAB_DMS
        });
        cancel();
        ElMessage({ message: '修改用戶名成功', type: 'success' });
        await getUserInfo();
    }
    catch {
        // noop
    }
}

function handleOpen() {
    formModel.username = state.user?.name!;
}

function cancel() {
    emit('update:modelValue', false);
}

function clear() {
    formRef.value?.resetFields();
}
</script>

<template>
<MessageDialog
    title="修改用户名"
    class="nav-user-update-name"
    v-model="modelValue"
    @open="handleOpen"
    @close="cancel"
    @closed="clear"
    @confirm="submit">
    <!-- -->
    <el-form
        ref="formRef"
        size="large"
        :rules="rules"
        :model="formModel">
        <el-form-item label="请输入新的用户名" prop="username">
            <el-input v-model="formModel.username" />
        </el-form-item>
    </el-form>
</MessageDialog>
</template>

<style lang="postcss">
.nav-user-update-name {
  @apply;
}
</style>
