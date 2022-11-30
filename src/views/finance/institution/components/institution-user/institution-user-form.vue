<template>
    <el-form class="custom-form" :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
        <el-form-item label="姓名:" required prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="手机号:" required prop="account">
            <el-input v-model="form.account" placeholder="请输入手机号" :disabled="formType === 'edit'"/>
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
                <template #icon>
                    <Icon :name="'ep:back'"></Icon>
                </template>
            </el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                <template #icon>
                    <Icon :name="'ep:edit'"></Icon>
                </template>
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import Icon from '@/components/Icon.vue';
import { addUser, form, formType, handleGoBack, roleUIList, updateUser } from './institution-user';
import { LoadingService } from '@/views/system/loading-service';
import { isPhoneNumber, validateIllegalSymbol } from '@/utils';
import type { ValidateCallback } from '@/utils';

const validatePhoneId = (rule: any, value: any, callback: ValidateCallback) => {
    if (!isPhoneNumber(value)) {
        callback(new Error('请输入正确的手机号码！'));
    } else {
        callback();
    }
};

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    account: [
        { required: true, message: '手机号码不能为空！', trigger: ['blur', 'change'] },
        { required: true, validator: validatePhoneId, trigger: ['blur', 'change'] },
        validateIllegalSymbol
    ],
    name: [
        { required: true, message: '姓名不能为空！', trigger: ['blur', 'change'] },
        { min: 0, max: 50, message: '姓名长度不能超过50个字符', trigger: ['blur', 'change'] },
        validateIllegalSymbol
    ],
    roleId: [
        {required: true, trigger: 'change', message: '角色不能为空'}
    ]
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
    padding: 40px 0;
}
</style>
