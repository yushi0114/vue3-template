<script lang="ts" setup>
import { updateUsername } from '@/api';
import { MENU_TAB } from '@/enums';
import { useUserStore } from '@/stores';
import type { FormInstance } from 'element-plus';

const { state, getUserInfo } = useUserStore();

const formRef = ref<FormInstance>();
const dialogRef = ref();

const formModel = reactive({
    username: state.user?.name!,
});

const rules: any = reactive({
    username: [{ min: 0, max: 50, message: '姓名长度不能超过50个字符', trigger: 'change' }],
});

async function submit() {
    try {
        await formRef.value?.validate();
        await updateUsername({
            id: state.user?.id!,
            name: formModel.username,
            tab: MENU_TAB.MENU_TAB_DMS
        });
        dialogRef.value.cancel();
        ElMessage({ message: '修改姓名成功', type: 'success' });
        await getUserInfo();
    }
    catch {
        // noop
    }
}

function handleOpen() {
    formModel.username = state.user?.name!;
}

function clear() {
    formRef.value?.resetFields();
}
</script>

<template>
<MessageDialog
    ref="dialogRef"
    title="修改姓名"
    width="480px"
    class="nav-user-update-name"
    @open="handleOpen"
    @closed="clear"
    @confirm="submit">
    <!-- -->
    <el-form
        ref="formRef"
        size="large"
        :rules="rules"
        :model="formModel">
        <el-form-item label="姓名" prop="username">
            <el-input v-model="formModel.username" placeholder="请输入姓名" />
        </el-form-item>
    </el-form>
</MessageDialog>
</template>

