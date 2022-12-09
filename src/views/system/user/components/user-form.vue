<template>
    <div>
        <div class="form-header">用户管理</div>
        <el-form class="custom-form" :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
            <el-form-item label="姓名:" required prop="name">
                <el-input v-model="form.name"
                          :maxlength="50"
                          show-word-limit
                          placeholder="请输入姓名"/>
            </el-form-item>
            <el-form-item label="手机号:" required prop="account">
                <el-input v-model="form.account"
                          :maxlength="11"
                          show-word-limit
                          placeholder="请输入手机号" :disabled="formType === 'edit'"/>
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
            <div class="form-footer">
                <el-button @click="goBack()">
                    取消
                </el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    确定
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import {
    addUser,
    form,
    formType,
    handleGoBack,
    roleUIList,
    updateUser
} from '@/views/system/user/components/user-list';
import { LoadingService } from '@/views/system/loading-service';
import type { ValidateCallback } from '@/utils';
import { isPhoneNumber, validateIllegalSymbol } from '@/utils';

const validatePhoneId = (rule: any, value: any, callback: ValidateCallback) => {
    if (!isPhoneNumber(value)) {
        callback(new Error('请输入正确的手机号码！'));
    } else {
        callback();
    }
};

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { min: 0, max: 50, message: '姓名长度不能超过50个字符', trigger: 'change' },
        validateIllegalSymbol
    ],
    account: [
        { required: true, message: '手机号码不能为空！', trigger: 'change' },
        { required: true, validator: validatePhoneId, trigger: 'change' },
        validateIllegalSymbol
    ],
    roleId: [{ required: true, message: '请选择角色', trigger: 'change' }]
});

async function submitForm(formElement: FormInstance | undefined) {
    if (!formElement) return;
    await formElement.validate(async (valid, fields) => {
        if (valid) {
            LoadingService.getInstance().loading();
            if (formType.value === 'create') {
                await addUser();
            } else {
                await updateUser();
            }
            await handleGoBack();
            LoadingService.getInstance().stop();
        } else {
            console.log('error submit!', fields);
        }
    });
}

async function goBack() {
    LoadingService.getInstance().loading();
    await handleGoBack();
    LoadingService.getInstance().stop();
}

</script>

<style scoped lang="scss">
.custom-form {
    width: 700px;
}
.form-header {
    font-size: 24px;
    margin: 20px 0 30px;
}
.form-footer {
    margin: 50px 0;
    text-align: center;
}
</style>
