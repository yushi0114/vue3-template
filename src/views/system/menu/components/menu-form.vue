<template>
  <el-form v-if="menuForm" :model="menuForm" :rules="rules" label-width="120px" ref="ruleFormRef" style="width: 700px;">
    <el-form-item label="菜单名称:" required prop="name">
      <el-input v-model="menuForm.name" placeholder="请输入菜单名称"/>
    </el-form-item>
    <el-form-item label="菜单标题:"  required prop="title">
      <el-input v-model="menuForm.title" placeholder="请输入菜单标题" />
    </el-form-item>
    <el-form-item label="菜单路径:"  required prop="path">
      <el-input v-model="menuForm.path" placeholder="请输入菜单路径" />
    </el-form-item>
    <el-form-item label="菜单描述:"  prop="desc">
      <el-input v-model="menuForm.desc" placeholder="请输入菜单描述" />
    </el-form-item>
    <el-form-item label="菜单图标:"  prop="desc">
      <el-input v-model="menuForm.icon" placeholder="请输入菜单图标" />
    </el-form-item>
    <el-form-item label="排序字段:"  required prop="sort">
      <el-input v-model.number="menuForm.sort" placeholder="请输入排序字段" />
    </el-form-item>
    <el-form-item label="组件名称:" required prop="component">
      <el-input v-model="menuForm.component" placeholder="请输入菜组件称" />
    </el-form-item>
    <el-form-item label="是否启用:" required prop="status">
      <el-switch v-model="menuForm.status" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        {{formType === 'edit' ? '编辑' : '创建'}}
      </el-button>
      <el-button v-if="formType === 'create'" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {ref, reactive} from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import {
    activeName,
    currentMenuId,
    menuForm,
    formType,
    createMenu,
    editMenu,
    getTreeData,
    setFormType
} from './menu-list';
import type {MenuFormType} from '@/views/system/type/menu-list.type';

const emit = defineEmits([
    'goBack'
]);

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入菜单名称', trigger: 'blur' },
        { max: 255, message: '菜单名称不能超过255个字符', trigger: 'blur' },
    ],
    title: [
        { required: true, message: '请输入菜单标题', trigger: 'blur' },
        { max: 32, message: '菜单标题不能超过32个字符', trigger: 'blur' },
    ],
    path: [
        { required: true, message: '请输入菜单路径', trigger: 'blur' },
        { max: 255, message: '菜单路径不能超过255个字符', trigger: 'blur' },
    ],
    desc: [
        // { required: true, message: '请输入菜单描述', trigger: 'blur' },
        { max: 255, message: '菜单描述不能超过255个字符', trigger: 'blur' },
    ],
    sort: [
        { required: true, message: '请输入排序字段', trigger: 'blur' },
        { type: 'number', message: '排序字段只能是数字' },
    ],
    component: [
        { required: true, message: '请输入组件名称', trigger: 'blur' },
        { max: 255, message: '组件名称不能超过255个字符', trigger: 'blur' },
    ],
});

const submitForm = async(formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid && menuForm.value) {
            handleSaveForm({
                id: currentMenuId.value,
                form: menuForm.value,
                type: formType.value
            });
        } else {
            console.log('error submit!', fields);
        }
    });
};

async function handleSaveForm(params: {
  id?: string;
  form: MenuFormType,
  type: 'create' | 'edit'
}){
    if (params.type === 'create'){
        await createMenu(params.form);
        setFormType('edit');
        menuForm.value = undefined;
        await getTreeData(activeName.value);
    }
    if (params.type === 'edit' && params.id){
        await editMenu(params.id, params.form);
    }
}

function cancel(){
    emit('goBack');
}

</script>

<style scoped>

</style>
