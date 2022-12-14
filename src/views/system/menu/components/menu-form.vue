<template>
    <div style="height: max-content">
        <div v-if="formType === 'create'" class="form-header">新建菜单</div>
        <el-form
            :class="[{ 'custom-create-form': formType !== 'create'}]"
            :label-position="formType === 'create' ? 'right' : 'top'"
            :model="menuForm"
            :rules="rules"
            label-width="120px"
            ref="ruleFormRef"
            style="width: 700px;">
            <el-form-item label="父级菜单" required prop="parentId">
                <el-select
                    v-model="menuForm.parentId"
                    style="width: 100%"
                    filterable
                    clearable
                    placeholder="请选择父级菜单">
                    <el-option
                        v-for="item in firstLevelMenuList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.value"
                        :title="item.label">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单名称" required prop="name">
                <el-input v-model="menuForm.name"
                          :maxlength="255"
                          show-word-limit
                          placeholder="请输入菜单名称"/>
            </el-form-item>
            <el-form-item label="菜单标题" required prop="title">
                <el-input v-model="menuForm.title"
                          :maxlength="32"
                          show-word-limit
                          placeholder="请输入菜单标题"/>
            </el-form-item>
            <el-form-item label="菜单路径" required prop="path">
                <el-input v-model="menuForm.path"
                          :maxlength="255"
                          show-word-limit
                          placeholder="请输入菜单路径"/>
            </el-form-item>
            <el-form-item label="菜单描述" prop="desc">
                <el-input v-model="menuForm.desc"
                          :maxlength="255"
                          show-word-limit
                          type="textarea"
                          placeholder="请输入菜单描述"/>
            </el-form-item>
            <el-form-item label="菜单图标" prop="icon">
                <el-input v-model="menuForm.icon"
                          :maxlength="255"
                          show-word-limit
                          placeholder="请输入菜单图标"/>
            </el-form-item>
            <el-form-item label="排序字段" required prop="sort">
                <el-input v-model.number="menuForm.sort"
                          :maxlength="3"
                          show-word-limit placeholder="请输入排序字段"/>
            </el-form-item>
            <el-form-item label="组件名称" required prop="component">
                <el-input v-model="menuForm.component"
                          :maxlength="255"
                          show-word-limit
                          placeholder="请输入菜组件称"/>
            </el-form-item>
            <el-form-item label="是否启用" required prop="status">
                <el-switch v-model="menuForm.status"/>
            </el-form-item>
            <div :class="[formType === 'create' ? 'form-footer' : 'form-edit-footer']">
                <el-button @click="goBack">
                    取消
                </el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    确定
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { createMenu, currentMenuId, editMenu, formType, goTreeView, menuForm, menuTreeData, } from './menu-list';
import type { MenuFormType } from '@/types/system-manage';
import { type ValidateCallback, validateIllegalSymbol } from '@/utils';

const validateSort = (rule: any, value: any, callback: ValidateCallback) => {
    if (!value) {
        return callback(new Error('排序只能为1-999的整数！'));
    }
    if (!Number.isInteger(Number(value))) {
        callback(new Error('排序只能为1-999的整数！'));
    } else {
        callback();
    }
};

const emits = defineEmits(['editToDetail']);

const firstLevelMenuList = computed(() => {
    const arr = [
        {
            id: '0',
            label: '顶层菜单',
            value: '0'
        }
    ];
    return arr.concat(menuTreeData.value?.reduce((pre: {
        id: string;
        label: string;
        value: string
    }[], cur) => {
        if (cur.id !== currentMenuId.value) {
            pre.push({
                id: cur.id,
                label: cur.label,
                value: cur.id
            });
        }
        return pre;
    }, []) ?? []);
});

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    parentId: [
        { required: true, message: '请选择父级菜单', trigger: ['blur', 'change'] },
        validateIllegalSymbol
    ],
    name: [
        { required: true, message: '请输入菜单名称', trigger: 'blur' },
        { min: 0, max: 255, message: '菜单名称不能超过255个字符', trigger: 'blur' },
        validateIllegalSymbol
    ],
    title: [
        { required: true, message: '请输入菜单标题', trigger: 'blur' },
        { min: 0, max: 32, message: '菜单标题不能超过32个字符', trigger: 'blur' },
        validateIllegalSymbol
    ],
    path: [
        { required: true, message: '请输入菜单路径', trigger: 'blur' },
        { min: 0, max: 255, message: '菜单路径不能超过255个字符', trigger: 'blur' },
        validateIllegalSymbol
    ],
    desc: [
        { min: 0, max: 255, message: '菜单描述不能超过255个字符', trigger: 'blur' },
        validateIllegalSymbol
    ],
    icon: [
        { min: 0, max: 255, message: '图标不能超过255个字符', trigger: 'blur' },
        validateIllegalSymbol
    ],
    sort: [
        { required: true, message: '请输入排序字段', trigger: 'blur' },
        { type: 'number', message: '排序字段只能是数字' },
        { required: true, validator: validateSort, trigger: 'change' },
        validateIllegalSymbol
    ],
    component: [
        { required: true, message: '请输入组件名称', trigger: 'blur' },
        { min: 0, max: 255, message: '组件名称不能超过255个字符', trigger: 'blur' },
        validateIllegalSymbol
    ],
});

async function submitForm(formElement: FormInstance | undefined) {
    if (!formElement) return;
    await formElement.validate((valid) => {
        if (valid && menuForm.value) {
            handleSaveForm({
                id: currentMenuId.value,
                form: menuForm.value,
                type: formType.value
            });
        }
    });
}

async function handleSaveForm(params: {
    id?: string;
    form: MenuFormType,
    type: 'create' | 'edit' | 'empty' | 'detail'
}) {
    let status = false;
    if (params.type === 'create') {
        status = await createMenu(params.form);
    }
    if (params.type === 'edit' && params.id) {
        status = await editMenu(params.id, params.form);
    }
    if (status) {
        await goTreeView();
    }
}

async function goBack() {
    await goTreeView();
    if (formType.value === 'edit') {
        emits('editToDetail');
    }
}

</script>

<style scoped lang="scss">
.form-header {
    font-size: 24px;
    margin: 20px 0 30px;
}

.form-footer {
    margin: 50px 0;
    text-align: center;
}

.form-edit-footer {
    margin: 50px 0;
    text-align: center;
}

.custom-create-form {
    &::v-deep(.el-form-item__label) {
        font-weight: bold;
    }
}
</style>
