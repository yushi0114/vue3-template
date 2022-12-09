<template>
    <div>
        <div class="form-header">机构编码</div>
        <el-form :model="categoryForm" :rules="rules" label-width="120px" ref="ruleFormRef" style="width: 700px;">
            <el-form-item label="机构分类:" required prop="name">
                <el-input v-model="categoryForm.name" placeholder="请输入分类名称" show-word-limit maxlength="255"/>
            </el-form-item>
            <el-form-item label="描述:" prop="desc">
                <el-input
                    type="textarea"
                    v-model="categoryForm.desc"
                    placeholder="请输入分类描述"
                    show-word-limit
                    maxlength="255"/>
            </el-form-item>
            <el-form-item label="分类排序:" required prop="sort">
                <el-input v-model="categoryForm.sort" placeholder="请输入分类描述" show-word-limit maxlength="3"/>
            </el-form-item>
            <el-form-item label="展现形式:" required prop="typeModuleId">
                <el-select v-model="categoryForm.typeModuleId" placeholder="请选择展现形式">
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
                <el-button @click="goBack()">取消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { ElTree, FormInstance, FormRules } from 'element-plus';
import {
    addFinanceCategory,
    allSystemMenuTree,
    categoryForm,
    currentCategoryId,
    formType,
    goListView,
    orgTypeModuleList,
    updateFinanceCategory
} from './category-list';
import { LoadingService } from '@/views/system/loading-service';
import type { TreeNodeData } from 'element-plus/lib/components/tree/src/tree.type';
import { illegalSymbolRegExp, regexOrgType } from '@/utils/regExp';

const menuTree = ref<InstanceType<typeof ElTree>>();
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
                if (!value && value !== 0) {
                    return callback(new Error('机构分类不能为空！'));
                }
                if (illegalSymbolRegExp.test(value)) {
                    callback(new Error('输入内容不支持SQL和JS代码类型'));
                } else if (!regexOrgType.test(value)) {
                    callback(new Error('机构分类只能为中文、数字、英文及-、（）()·，,特殊字符'));
                } else {
                    callback();
                }
            }
        }
    ],
    desc: [
        {
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
                if (illegalSymbolRegExp.test(value)) {
                    callback(new Error('输入内容不支持SQL和JS代码类型'));
                } else {
                    callback();
                }
            }
        }
    ],
    sort: [
        {
            required: true,
            trigger: ['change', 'blur'],
            validator: (rule, value, callback) => {
                if (!value && value !== 0) {
                    return callback(new Error('排序不能为空！'));
                }
                if (!/^[1-9]\d*$/.test(value)) {
                    callback(new Error('排序只能为1-999的整数！'));
                } else {
                    callback();
                }
            }
        }
    ],
    typeModuleId: [
        {
            required: true,
            trigger: 'blur',
            message: '展现形式不能为空！'
        }
    ],
    menuIdArr: [
        {
            type: 'array',
            required: true,
            trigger: 'change',
            message: '请至少选择一个菜单项！'
        }
    ]
});

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
        if (valid) {
            let checkedNodeIds = menuTree.value?.getCheckedNodes(false, true)
                .map((item: TreeNodeData) => item.id as string);
            if (!checkedNodeIds) {
                return;
            }
            LoadingService.getInstance().loading();
            if (formType.value === 'create') {
                await addFinanceCategory({
                    ...categoryForm.value,
                    menuIdArr: checkedNodeIds
                });
            } else {
                if (!currentCategoryId.value) {
                    return;
                }
                await updateFinanceCategory({
                    id: currentCategoryId.value,
                    ...categoryForm.value,
                    menuIdArr: checkedNodeIds
                });
            }
            await goListView();
            LoadingService.getInstance().stop();
        }
    });
};

async function goBack() {
    LoadingService.getInstance().loading();
    await goListView();
    LoadingService.getInstance().stop();
}


</script>

<style scoped lang="scss">
.form-header {
    font-size: 24px;
    margin: 20px 0 30px;
}

</style>
