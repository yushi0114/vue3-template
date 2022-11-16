<template>
  <el-form :model="userForm" :rules="rules" label-width="120px" ref="ruleFormRef" style="width: 700px;">
    <el-form-item label="姓名:" required prop="name">
      <el-input v-model="userForm.name" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机号:" required prop="account">
      <el-input v-model="userForm.account" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="角色:" required prop="roleId">
      <el-select v-model="userForm.roleId" placeholder="请选择角色" >
        <el-option
            v-for="item in roleUIList"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="状态:" required prop="status">
      <el-switch v-model="userForm.status" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        {{formType === 'edit' ? '编辑' : '创建'}}
      </el-button>
      <el-button @click="goBack()">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {ref, reactive} from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import {
    mode,
    formType,
    userForm,
    roleUIList,
    activeName,
    currentUserId,
    handleGoBack
} from '@/views/system/user/components/user-list';
import {addUser, updateUser} from '@/api/system-manage';

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入用户姓名', trigger: 'blur' },
        { min: 3, max: 255, message: '用户姓名不能超过255个字符', trigger: 'blur' },
    ],
});

const submitForm = async(formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async(valid, fields) => {
        if (valid) {
            if (formType.value === 'create'){
                await addUser({
                    ...userForm.value,
                    status: userForm.value.status ? 1 : 0,
                    tab: activeName.value,
                    menuName: ''
                });
            } else {
                await updateUser({
                    id: currentUserId.value,
                    ...userForm.value,
                    status: userForm.value.status ? 1 : 0,
                    tab: activeName.value,
                    menuName: ''
                });
            }
            await handleGoBack();
        } else {
            console.log('error submit!', fields);
        }
    });
};

function goBack(){
    mode.value = 'list';
}

</script>

<style scoped>

</style>
