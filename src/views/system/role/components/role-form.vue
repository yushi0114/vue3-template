<template>
    <el-form class="custom-form" :model="roleForm" :rules="rules" label-width="120px" ref="ruleFormRef">
        <el-form-item label="角色名称:" required prop="name">
            <el-input v-model="roleForm.name"
                      :maxlength="100"
                      show-word-limit
                      placeholder="请输入角色名称"/>
        </el-form-item>
        <el-form-item label="角色描述:" prop="desc">
            <el-input v-model="roleForm.desc"
                      :maxlength="255"
                      show-word-limit
                      type="textarea"
                      placeholder="请输入角色描述"/>
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
import {ElMessage} from 'element-plus';
import Icon from '@/components/Icon.vue';
import {
    activeName,
    addRole,
    formType,
    handleGoBack,
    roleForm,
    roleMenuTreeData,
    updateRole
} from './role-list';
import { LoadingService } from '@/views/system/loading-service';
import type { TreeNodeData } from 'element-plus/lib/components/tree/src/tree.type';
import { validateIllegalSymbol } from '@/utils';

const menuTree = ref<InstanceType<typeof ElTree>>();
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { required: true, trigger: 'change', message: '角色名称不能为空' },
        { min: 0, max: 100, message: '角色名称长度不能超过100个字符', trigger: 'change' },
        validateIllegalSymbol
    ],
    desc: [
        { min: 0, max: 255, message: '描述长度不能超过255个字符', trigger: 'change' },
        validateIllegalSymbol
    ],
});

async function submitForm(formElement: FormInstance | undefined) {
    if (!formElement) return;
    await formElement.validate(async(valid) => {
        if (valid) {
            let checkedNodeIds = menuTree.value?.getCheckedNodes(false, true)
                .map((item: TreeNodeData) => item.id as string);
            if (!checkedNodeIds || checkedNodeIds.length === 0) {
                ElMessage({
                    type: 'error',
                    message: '请至少配置一个菜单'
                });
                return;
            }
            LoadingService.getInstance().loading();
            if (formType.value === 'create') {
                console.log(activeName.value);
                await addRole(checkedNodeIds);
            } else {
                await updateRole(checkedNodeIds);
            }
            LoadingService.getInstance().stop();
            await handleGoBack();
        }
    });
}

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
