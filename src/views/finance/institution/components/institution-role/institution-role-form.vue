<template>
    <div>
        <Text class="form-header" size="xl" block color="paragraph">角色管理</Text>
        <el-form
            class="custom-form"
            :model="roleForm"
            :rules="rules"
            label-width="120px"
            ref="ruleFormRef">
            <el-form-item label="角色名称:" required prop="name">
                <el-input
                    v-model="roleForm.name"
                    placeholder="请输入角色名称"
                    clearable
                    maxlength="100"
                    show-word-limit
                    ref="roleNameRef"
                />
            </el-form-item>
            <el-form-item label="角色描述:" prop="desc">
                <el-input
                    v-model="roleForm.desc"
                    placeholder="请输入角色描述"
                    type="textarea"
                    maxlength="255"
                    show-word-limit
                    autocomplete="off"/>
            </el-form-item>
            <el-form-item label="配置菜单:" required>
                <div style="margin-top: 10px; width: 100%;">
                    <el-tree
                        v-if="roleMenuTreeData?.length"
                        ref="institutionMenuTree"
                        :data="roleMenuTreeData"
                        show-checkbox
                        node-key="id"
                        :default-checked-keys="roleForm.menuIdArr"
                        :default-expand-all="true">
                    </el-tree>
                    <div v-else class="empty-tree">暂无数据</div>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button @click="goBack()">
                    取消
                </el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    确定
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { ElTree, FormInstance, FormRules } from 'element-plus';
import { addRole, formType, goBackListView, roleForm, roleMenuTreeData, updateRole } from './institution-role';
import { LoadingService } from '@/views/system/loading-service';
import type { TreeNodeData } from 'element-plus/lib/components/tree/src/tree.type';
import { validateIllegalSymbol } from '@/utils';

const institutionMenuTree = ref<InstanceType<typeof ElTree>>();
const roleNameRef = ref();
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入角色名称', trigger: 'blur' },
        { min: 0, max: 100, message: '角色名称不能超过100个字符', trigger: 'blur' },
        validateIllegalSymbol
    ],
    desc: [
        { min: 0, max: 255, message: '角色描述不能超过255个字符', trigger: 'blur' },
        validateIllegalSymbol
    ],
});

async function submitForm(formElement: FormInstance | undefined) {
    if (!formElement) return;
    await formElement.validate(async (valid) => {
        if (valid) {
            let checkedNodeIds = institutionMenuTree.value?.getCheckedNodes(false, true)
                .map((item: TreeNodeData) => item.id as string);
            if (!checkedNodeIds) {
                ElMessage({
                    type: 'error',
                    message: '请至少配置一个菜单'
                });
                return;
            }
            LoadingService.getInstance().loading();
            let status: boolean;
            if (formType.value === 'create') {
                status = await addRole(checkedNodeIds);
            } else {
                status = await updateRole(checkedNodeIds);
            }
            if (status) {
                await goBackListView();
            }
            LoadingService.getInstance().stop();
        }
    });
}

async function goBack() {
    LoadingService.getInstance().loading();
    await goBackListView();
    LoadingService.getInstance().stop();
}

onMounted(() => {
    roleNameRef.value.focus();
});

</script>

<style scoped lang="scss">
.custom-form {
    width: 700px;
}

.empty-tree {
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 14px;
    color: #909399;
    width: 100%;
}

.form-header {
    margin: 20px 0 30px;
}
</style>
