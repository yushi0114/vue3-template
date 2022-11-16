<template>
  <el-form :model="categoryForm" :rules="rules" label-width="120px" ref="ruleFormRef" style="width: 700px;">
    <el-form-item label="分类名称:" required prop="name">
      <el-input v-model="categoryForm.name" placeholder="请输入分类名称"/>
    </el-form-item>
    <el-form-item label="分类描述:" prop="desc">
      <el-input v-model="categoryForm.desc" placeholder="请输入分类描述" />
    </el-form-item>
    <el-form-item label="分类排序:"  required prop="sort">
      <el-input v-model="categoryForm.sort" placeholder="请输入分类描述" />
    </el-form-item>
    <el-form-item label="展现形式:"  required prop="typeModuleId">
      <el-select v-model="categoryForm.typeModuleId" placeholder="请选择展现形式" >
        <el-option
            v-for="item in orgTypeModuleList"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="配置菜单" required>
      <div style="margin-top: 10px">
        <el-tree
            ref="menuTree"
            :data="allSystemMenuTree"
            show-checkbox
            node-key="id"
            :default-checked-keys="categoryForm.menuIdArr"
            :default-expand-all="true">
        </el-tree>
      </div>
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
import type { FormInstance, FormRules, ElTree } from 'element-plus';
import {categoryForm, formType, allSystemMenuTree, handleGoBack, currentCategoryId, orgTypeModuleList} from './category-list';
import {LoadingService} from '@/views/system/loading-service';
import type {TreeNodeData} from 'element-plus/lib/components/tree/src/tree.type';
import {addFinanceCategory, updateFinanceCategory} from '@/api/finance/finance-category';

const menuTree = ref<InstanceType<typeof ElTree>>();
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
    await formEl.validate(async(valid) => {
        if (valid) {
            let checkedNodeIds = menuTree.value?.getCheckedNodes(false, true)
                .map((item: TreeNodeData) => item.id as string);
            if (!checkedNodeIds){
                return;
            }
            LoadingService.getInstance().loading();
            if (formType.value === 'create'){
                await addFinanceCategory({
                    ...categoryForm.value,
                    menuIdArr: checkedNodeIds,
                    menuName: ''
                });
            } else {
                if (!currentCategoryId.value){
                    return;
                }
                await updateFinanceCategory({
                    id: currentCategoryId.value,
                    ...categoryForm.value,
                    menuIdArr: checkedNodeIds,
                    menuName: ''
                });
            }
            LoadingService.getInstance().stop();
            await handleGoBack();
        } else {
            // todo
        }
    });
};

async function goBack(){
    await handleGoBack();
}


</script>

<style scoped>

</style>
