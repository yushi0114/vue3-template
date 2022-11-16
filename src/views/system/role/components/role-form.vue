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
            :default-checked-keys="roleForm.menuIdArr"
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
import {roleForm, formType, dataSource, activeName, handleGoBack, currentRoleId} from './role-list';
import {addRole, updateRole} from '@/api/system-manage';
import {LoadingService} from '@/views/system/loading-service';
import type {TreeNodeData} from 'element-plus/lib/components/tree/src/tree.type';

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
    await formEl.validate(async(valid, fields) => {
        if (valid) {
            let checkedNodeIds = menuTree.value?.getCheckedNodes(false, true)
                .map((item: TreeNodeData) => item.id as string);
            if (!checkedNodeIds){
                return;
            }
            LoadingService.getInstance().loading();
            if (formType.value === 'create'){
                await addRole({
                    ...roleForm.value,
                    menuIdArr: checkedNodeIds,
                    tab: activeName.value,
                    menuName: ''
                });
            } else {
                await updateRole({
                    roleId: currentRoleId.value,
                    ...roleForm.value,
                    menuIdArr: checkedNodeIds,
                    tab: activeName.value,
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
