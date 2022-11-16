<template>
    <el-form class="custom-form" :model="roleForm" :rules="rules" label-width="120px" ref="ruleFormRef">
        <el-form-item label="角色名称:" required prop="name">
            <el-input v-model="roleForm.name" placeholder="请输入角色名称"/>
        </el-form-item>
        <el-form-item label="角色描述:" required prop="desc">
            <el-input v-model="roleForm.desc" placeholder="请输入角色描述"/>
        </el-form-item>
        <el-form-item label="配置菜单:" required>
            <div style="margin-top: 10px">
                <el-tree
                    v-if="roleMenuTreeData"
                    ref="menuTree"
                    :data="roleMenuTreeData"
                    show-checkbox
                    node-key="id"
                    :default-checked-keys="roleForm.menuIdArr"
                    :default-expand-all="true">
                </el-tree>
            </div>
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
import type { ElTree, FormInstance, FormRules } from 'element-plus';
import Icon from '@/components/Icon.vue';
import {
    addRole,
    formType,
    handleGoBack,
    roleForm,
    roleMenuTreeData,
    updateRole
} from './role-list';
import { LoadingService } from '@/views/system/loading-service';
import type { TreeNodeData } from 'element-plus/lib/components/tree/src/tree.type';

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

async function submitForm(formElement: FormInstance | undefined) {
    if (!formElement) return;
    await formElement.validate(async(valid) => {
        if (valid) {
            let checkedNodeIds = menuTree.value?.getCheckedNodes(false, true)
                .map((item: TreeNodeData) => item.id as string);
            if (!checkedNodeIds) {
                return;
            }
            LoadingService.getInstance().loading();
            if (formType.value === 'create') {
                await addRole(checkedNodeIds);
            } else {
                await updateRole(checkedNodeIds);
            }
            LoadingService.getInstance().stop();
            await handleGoBack();
        } else {
            // todo
        }
    });
};

async function goBack() {
    await handleGoBack();
}


</script>

<style scoped lang="scss">
.custom-form {
    width: 700px;
    padding: 40px 0;
}
</style>
