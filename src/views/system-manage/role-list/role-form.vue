<template>
  <el-form :model="roleForm" :rules="rules" label-width="120px" ref="ruleFormRef" style="width: 700px;">
    <el-form-item label="角色名称:" required prop="name">
      <el-input v-model="roleForm.name" placeholder="请输入角色名称"/>
    </el-form-item>
    <el-form-item label="角色描述:"  required prop="desc">
      <el-input v-model="roleForm.desc" placeholder="请输入角色描述" />
    </el-form-item>
    <el-form-item label="配置菜单" required>
      <div style="margin-top: 10px">
        <el-tree
            ref="menuTree"
            :data="dataSource"
            show-checkbox
            node-key="id"
            :default-expand-all="true"
        >
        </el-tree>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        {{formType === 'edit' ? '编辑' : '创建'}}
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      <el-button @click="goBack()">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {ref, reactive} from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import {roleForm, formType, dataSource} from './role-list';

const emit = defineEmits([
    'save', 'goBack'
]);
const menuTree = ref();

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入角色名称', trigger: 'blur' },
        { min: 3, max: 255, message: '角色名称不能超过255个字符', trigger: 'blur' },
    ],
    desc: [
        { required: true, message: '请输入角色描述', trigger: 'blur' },
        { min: 3, max: 255, message: '角色描述不能超过255个字符', trigger: 'blur' },
    ],
});

const submitForm = async(formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            let checkedNodeIds = menuTree.value.getCheckedNodes(false, true).map((item) => item.id);
            console.log(checkedNodeIds);
        } else {
            console.log('error submit!', fields);
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

function goBack(){
    emit('goBack');
}

</script>

<style scoped>

</style>
