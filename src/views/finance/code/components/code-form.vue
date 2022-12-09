<template>
    <div>
        <div class="form-header">机构编码</div>
        <el-form :model="codeForm" :rules="rules" label-width="120px" ref="ruleFormRef" style="width: 700px;">
            <el-form-item label="机构分类:" required prop="orgTypeCode">
                <el-select v-model="codeForm.orgTypeCode" placeholder="请选择机构分类">
                    <el-option
                        v-for="item in orgTypeCodeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="所属城市:" prop="cityCode">
                <el-select v-model="codeForm.cityCode" placeholder="请选择城市">
                    <el-option
                        v-for="item in cityCodeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="机构名称:" required prop="orgName">
                <el-input v-model="codeForm.orgName" show-word-limit maxlength="255" placeholder="请输入机构名称"/>
            </el-form-item>
            <el-form-item label="机构编码:" required prop="orgCode">
                <el-input v-model="codeForm.orgCode" show-word-limit maxlength="15" placeholder="请输入机构编码"/>
            </el-form-item>
            <el-form-item label="机构地址:" required prop="address">
                <el-input
                    type="textarea"
                    v-model="codeForm.address"
                    show-word-limit
                    maxlength="255"
                    placeholder="请输入机构地址"/>
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
import type { FormInstance, FormRules } from 'element-plus';
import {
    addFinanceCode,
    cityCodeList,
    codeForm,
    formType,
    handleGoBack,
    orgTypeCodeList,
    updateFinanceCode
} from './code-list';
import { LoadingService } from '@/views/system/loading-service';

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    orgName: [
        {
            required: true,
            message: '机构名称不能为空！',
            trigger: 'blur'
        },
        {
            pattern:
                /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]){1,255}$/,
            message: '机构名称长度为1-255个中文汉字',
            trigger: ['blur', 'change']
        },
    ],
    orgCode: [
        {
            required: true,
            message: '机构编码不能为空！',
            trigger: ['blur', 'change']
        },
        {
            pattern: new RegExp(/^(?=.*\d)(?=.*[A-Z])[A-Z0-9]{15}$/),
            message: '请输入正确的机构编码，15位数字与大写字母的组合！',
            trigger: ['blur', 'change']
        },
    ],
    address: [
        {
            required: true,
            message: '机构地址不能为空！',
            trigger: ['blur', 'change']
        },
        {
            pattern: new RegExp(/^[a-zA-Z0-9-#、（）()·，\u4E00-\u9FA5]{1,255}$/),
            message: '地址只能为中文、数字、英文及-#、（）()·，特殊字符',
            trigger: ['blur', 'change']
        },
    ],
    cityCode: [
        {
            required: true,
            message: '所属城市不能为空！',
            trigger: ['blur', 'change']
        }
    ],
    orgTypeCode: [
        {
            required: true,
            message: '机构分类不能为空！',
            trigger: ['blur', 'change']
        }
    ]
});

const submitForm = async(formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async(valid) => {
        if (valid) {
            LoadingService.getInstance().loading();
            let status: boolean;
            if (formType.value === 'create') {
                status = await addFinanceCode();
            } else {
                status = await updateFinanceCode();
            }
            if (status) {
                await handleGoBack();
            }
            LoadingService.getInstance().stop();
        }
    });
};

async function goBack() {
    LoadingService.getInstance().loading();
    await handleGoBack();
    LoadingService.getInstance().stop();
}


</script>

<style scoped lang="scss">
.form-header {
    font-size: 24px;
    margin: 20px 0 30px;
}

</style>
