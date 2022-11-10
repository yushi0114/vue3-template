<template>
  <el-form :model="userForm" :rules="rules" label-width="120px" ref="ruleFormRef" style="width: 700px;">
    <el-form-item label="手机号:" required prop="name">
      <el-input v-model="userForm.phone" placeholder="请输入手机号"/>
    </el-form-item>
    <el-form-item label="姓名:"  required prop="desc">
      <el-input v-model="userForm.name" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="角色:"  required prop="roleId">
      <el-select v-model="userForm.roleId" placeholder="请选择角色" >
        <el-option
            v-for="item in roleUIList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="状态:" required prop="status">
      <el-switch v-model="userForm.status" />
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
import {ref, reactive, defineProps, PropType} from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import type {UserFormType} from '@/views/system-manage/type/user-list.type';
import type {RoleListItemType} from '@/views/system-manage/type/role-list.type';

const props = defineProps({
    form: {
        type: Object as PropType<UserFormType>,
        default: () => {}
    },
    roleList: {
        type: Array as PropType<RoleListItemType[]>,
        default: () => []
    },
    formType: {
        type: String as PropType<'create' | 'edit'>,
        default: 'edit'
    }
});

const roleUIList = computed(() => props.roleList?.map(item => ({...item, label: item.name, value: item.id})));

const emit = defineEmits([
    'save', 'goBack'
]);

watch(() => props.form, (value) => {
    userForm.value = value;
});

const userForm = ref({
    phone: '',
    name: '',
    roleId: '',
    status: false
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入用户姓名', trigger: 'blur' },
        { min: 3, max: 255, message: '用户姓名不能超过255个字符', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { min: 3, max: 255, message: '手机号码不能超过255个字符', trigger: 'blur' },
    ],
});

const submitForm = async(formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
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
