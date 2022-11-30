<template>
    <el-dialog
        title="删除机构"
        :width="'550px'"
        :model-value="isDeleteOrgModelShow"
        :close-on-click-modal="false"
        @close="cancel">
        <div class="confirmText">
            删除此机构将立即删除所有信息，包含机构录入的产品信息等。<br/>机构删除后，数据将无法恢复！
        </div>
        <div class="confirmOrg">
            请输入机构名称“{{ orgName }}”进行确认：
        </div>
        <el-form ref="deleteFormRef" :model="deleteForm" :rules="deleteFormRules">
            <el-form-item label="" prop="orgName">
                <el-input v-model="deleteForm.orgName" ref="orgName" placeholder="请输入机构名称"></el-input>
            </el-form-item>
        </el-form>
        <div class="user-footer">
            <el-button size="small" @click="cancel">取 消</el-button>
            <el-button type="primary" size="small" :loading="isLoading" @click="deleteOrg(deleteFormRef)">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { deleteInstitution, isDeleteOrgModelShow, willDeleteOrgIdList } from './finance-institution';
import type { ValidateCallback } from '@/utils';
import { validateIllegalSymbol } from '@/utils';
import type { FormInstance } from 'element-plus';


const isLoading = ref(false);
const deleteForm = ref({
    orgName: ''
});
const deleteFormRef = ref();

const props = defineProps({
    orgName: {
        type: String,
        default: ''
    }
});

const validatePassConfirm = (rule: any, value: string, callback: ValidateCallback) => {
    if (value !== props.orgName) {
        callback(new Error('请确认输入的机构名称是否正确！'));
    } else {
        callback();
    }
};

const deleteFormRules = {
    orgName: [
        { required: true, validator: validatePassConfirm, trigger: 'change' },
        validateIllegalSymbol
    ]
};

function cancel() {
    isDeleteOrgModelShow.value = false;
}

async function deleteOrg(formEl: FormInstance | undefined) {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
        if (valid) {
            if (willDeleteOrgIdList.value?.length) {
                isLoading.value = true;
                await deleteInstitution({
                    orgIdArr: willDeleteOrgIdList.value
                });
                isLoading.value = false;
            }
        } else {
            // todo
        }
    });
}


</script>

<style scoped lang="scss">
.confirmText {
    color: #FF0000;
    font-size: 14px;
    margin-bottom: 24px;
}

.confirmOrg {
    font-size: 14px;
    margin-bottom: 24px;
}

.el-form {
    margin-bottom: 24px;
}

.user-footer {
    text-align: center;
}
</style>