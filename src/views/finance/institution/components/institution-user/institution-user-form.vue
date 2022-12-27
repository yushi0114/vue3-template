<template>
    <div>
        <div class="form-header">用户管理</div>
        <el-form class="custom-form" :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
            <el-form-item label="手机号:" required prop="account">
                <el-input v-model="form.account" placeholder="请输入手机号" :disabled="formType === 'edit'" ref="userAccountRef"/>
            </el-form-item>
            <el-form-item label="姓名:" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名"/>
            </el-form-item>
            <el-form-item label="角色:" required prop="roleId">
                <el-select v-model="form.roleId" placeholder="请选择角色">
                    <el-option
                        v-for="item in roleUIList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="状态:" required prop="status">
                <el-switch v-model="form.status"/>
            </el-form-item>
            <el-form-item>
                <el-button @click="goBack()">
                    取消
                </el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    确定
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { addUser, form, formType, handleGoBack, roleUIList, updateUser } from './institution-user';
import { LoadingService } from '@/views/system/loading-service';
import { isPhoneNumber, type ValidateCallback, validateIllegalSymbol } from '@/utils';

const validatePhoneId = (rule: any, value: any, callback: ValidateCallback) => {
    if (!isPhoneNumber(value)) {
        callback(new Error('请输入正确的手机号码！'));
    } else {
        callback();
    }
};

const userAccountRef = ref();
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    account: [
        { required: true, message: '手机号码不能为空！', trigger: ['blur', 'change'] },
        { required: true, validator: validatePhoneId, trigger: ['blur', 'change'] },
        validateIllegalSymbol
    ],
    name: [
        { min: 0, max: 50, message: '姓名长度不能超过50个字符', trigger: ['blur', 'change'] },
        validateIllegalSymbol
    ],
    roleId: [
        { required: true, trigger: 'change', message: '角色不能为空' },
        validateIllegalSymbol
    ]
});

async function submitForm(formElement: FormInstance | undefined) {
    if (!formElement) return;
    await formElement.validate(async(valid) => {
        if (valid) {
            LoadingService.getInstance().loading();
            let status: boolean;
            if (formType.value === 'create') {
                status = await addUser();
            } else {
                status = await updateUser();
            }
            if (status) {
                await handleGoBack();
            }
            LoadingService.getInstance().stop();
        }
    });
}

async function goBack() {
    LoadingService.getInstance().loading();
    await handleGoBack();
    LoadingService.getInstance().stop();
}

onMounted(() => {
    userAccountRef.value.focus();
});

</script>

<style scoped lang="scss">
.custom-form {
    width: 700px;
}

.form-header {
    font-size: 24px;
    margin: 20px 0 30px;
}
</style>
