<template>
    <el-dialog
        :model-value="dialogVisible"
        :title=" formType === 'create' ? '新建用户' : '编辑用户'"
        :width="'650px'"
        :close-on-click-modal="false"
        :modal-append-to-body="true"
        append-to-body
        destroy-on-close
        @close="handleClose">
        <el-form class="custom-form" :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
            <el-form-item label="姓名:" required prop="name">
                <el-input v-model="form.name"
                          :maxlength="50"
                          show-word-limit
                          placeholder="请输入姓名"/>
            </el-form-item>
            <el-form-item label="手机号:" required prop="account">
                <el-input v-model="form.account"
                          :maxlength="11"
                          show-word-limit
                          placeholder="请输入手机号" :disabled="formType === 'edit'"/>
            </el-form-item>
            <el-form-item label="角色:" required prop="roleId">
                <el-select v-model="form.roleId" placeholder="请选择角色">
                    <el-option
                        v-for="item in roleUIList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="状态:" required prop="status">
                <el-switch v-model="form.status"/>
            </el-form-item>
            <FlexRow horizontal="center">
                <el-button @click="goBack()">
                    取消
                </el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    确定
                </el-button>
            </FlexRow>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" setup>
import { type PropType, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import {
    addUser,
    form,
    formType,
    roleUIList,
    updateUser
} from '@/views/system/user/components/user-list';
import { type ValidateCallback, isPhoneNumber, validateIllegalSymbol } from '@/utils';

defineProps({
    dialogVisible: {
        type: Boolean as PropType<boolean>,
        default: false
    }
});

const emits = defineEmits(['close']);

function handleClose() {
    emits('close');
}

const validatePhoneId = (rule: any, value: any, callback: ValidateCallback) => {
    if (!isPhoneNumber(value)) {
        callback(new Error('请输入正确的手机号码！'));
    } else {
        callback();
    }
};

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { min: 0, max: 50, message: '姓名长度不能超过50个字符', trigger: 'change' },
        validateIllegalSymbol
    ],
    account: [
        { required: true, message: '手机号码不能为空！', trigger: 'change' },
        { required: true, validator: validatePhoneId, trigger: 'change' },
        validateIllegalSymbol
    ],
    roleId: [{ required: true, message: '请选择角色', trigger: 'change' }]
});

async function submitForm(formElement: FormInstance | undefined) {
    if (!formElement) return;
    await formElement.validate(async (valid) => {
        if (valid) {
            let status: boolean;
            if (formType.value === 'create') {
                status = await addUser();
            } else {
                status = await updateUser();
            }
            if (status) {
                emits('close');
            }
        }
    });
}

async function goBack() {
    emits('close');
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
</style>
