<template>
    <el-form :model="codeForm" :rules="rules" label-width="120px" ref="ruleFormRef" style="width: 700px;">
        <el-form-item label="机构分类:" required prop="name">
            <el-select v-model="codeForm.orgTypeCode" placeholder="请选择展现形式">
                <el-option
                    v-for="item in orgTypeCodeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
            </el-select>
        </el-form-item>
        <el-form-item label="所属城市:" prop="desc">
            <el-select v-model="codeForm.cityCode" placeholder="请选择展现形式">
                <el-option
                    v-for="item in cityCodeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
            </el-select>
        </el-form-item>
        <el-form-item label="机构名称:" required prop="sort">
            <el-input v-model="codeForm.orgName" placeholder="请输入分类描述"/>
        </el-form-item>
        <el-form-item label="机构编码:" required prop="sort">
            <el-input v-model="codeForm.orgCode" placeholder="请输入分类描述"/>
        </el-form-item>
        <el-form-item label="机构地址:" required prop="sort">
            <el-input v-model="codeForm.address" placeholder="请输入分类描述"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                {{ formType === 'edit' ? '编辑' : '创建' }}
            </el-button>
            <el-button @click="goBack()">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { cityCodeList, codeForm, currentCodeId, formType, handleGoBack, orgTypeCodeList } from './code-list';
import { LoadingService } from '@/views/system/loading-service';
import { addFinanceCode, updateFinanceCode } from '@/api/finance/finance-code';

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        {required: true, message: '请输入角色名称', trigger: 'blur'},
        {min: 3, max: 255, message: '角色名称不能超过255个字符', trigger: 'blur'},
    ],
    desc: [
        {required: true, message: '请输入角色描述', trigger: 'blur'},
        {min: 3, max: 255, message: '角色描述不能超过255个字符', trigger: 'blur'},
    ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
        if (valid) {
            LoadingService.getInstance().loading();
            if (formType.value === 'create') {
                await addFinanceCode({
                    ...codeForm.value,
                    menuName: ''
                });
            } else {
                if (!currentCodeId.value) {
                    return;
                }
                await updateFinanceCode({
                    id: currentCodeId.value,
                    ...codeForm.value,
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

async function goBack() {
    await handleGoBack();
}


</script>

<style scoped>

</style>
