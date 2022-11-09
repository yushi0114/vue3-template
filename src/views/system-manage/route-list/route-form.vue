<template>
  <el-form v-if="form" :model="routeForm" :rules="rules" label-width="120px" ref="ruleFormRef" style="width: 700px;">
    <el-form-item label="菜单名称:" required prop="name">
      <el-input v-model="routeForm.name" placeholder="请输入菜单名称"/>
    </el-form-item>
    <el-form-item label="菜单标题:"  required prop="title">
      <el-input v-model="routeForm.title" placeholder="请输入菜单标题" />
    </el-form-item>
    <el-form-item label="菜单路径:"  required prop="path">
      <el-input v-model="routeForm.path" placeholder="请输入菜单路径" />
    </el-form-item>
    <el-form-item label="菜单描述:"  required prop="desc">
      <el-input v-model="routeForm.desc" placeholder="请输入菜单描述" />
    </el-form-item>
    <el-form-item label="排序字段:"  required prop="sort">
      <el-input v-model.number="routeForm.sort" placeholder="请输入排序字段" />
    </el-form-item>
    <el-form-item label="组件名称:" required prop="component">
      <el-input v-model="routeForm.component" placeholder="请输入菜组件称" />
    </el-form-item>
    <el-form-item label="是否启用:" required prop="status">
      <el-switch v-model="routeForm.status" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        {{formType === 'edit' ? '编辑' : '创建'}}
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {ref, reactive, defineProps, PropType} from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import type {RouteFormType} from '@/views/system-manage/type/route-list.type';

const props = defineProps({
    form: {
        type: Object as PropType<RouteFormType>,
        default: () => {}
    },
    formType: {
        type: String as PropType<'create' | 'edit'>,
        default: 'edit'
    }
});

const emit = defineEmits([
    'save'
]);

watch(() => props.form, (value) => {
    routeForm.value = value;
});

const routeForm = ref({
    name: '',
    title: '',
    path: '',
    desc: '',
    sort: 0,
    component: '',
    status: false
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入菜单名称', trigger: 'blur' },
        { min: 3, max: 255, message: '菜单名称不能超过255个字符', trigger: 'blur' },
    ],
    title: [
        { required: true, message: '请输入菜单标题', trigger: 'blur' },
        { min: 3, max: 32, message: '菜单标题不能超过32个字符', trigger: 'blur' },
    ],
    path: [
        { required: true, message: '请输入菜单路径', trigger: 'blur' },
        { min: 3, max: 255, message: '菜单路径不能超过255个字符', trigger: 'blur' },
    ],
    desc: [
        { required: true, message: '请输入菜单描述', trigger: 'blur' },
        { min: 3, max: 255, message: '菜单描述不能超过255个字符', trigger: 'blur' },
    ],
    sort: [
        { required: true, message: '请输入排序字段', trigger: 'blur' },
        { type: 'number', message: '排序字段只能是数字' },
    ],
    component: [
        { required: true, message: '请输入组件名称', trigger: 'blur' },
        { min: 3, max: 255, message: '组件名称不能超过255个字符', trigger: 'blur' },
    ],
});

const submitForm = async(formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            emit('save', {
                form: routeForm,
                type: props.formType
            });
        } else {
            console.log('error submit!', fields);
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

</script>

<style scoped>

</style>
