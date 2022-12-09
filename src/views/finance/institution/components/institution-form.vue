<template>
    <div class="bank-container">
        <div class="institution-create-content">
            <div class="header">新建机构</div>
            <el-form
                ref="institutionFormRef"
                :model="institutionForm"
                :rules="institutionRules"
                label-width="100px">
                <el-form-item label="机构名称" prop="orgDictionaryId">
                    <el-select
                        v-model="institutionForm.orgDictionaryId"
                        style="width: 100%"
                        filterable
                        clearable
                        @change="getInstitutionCode"
                        @clear="resetInstitutionCode"
                        placeholder="请选择机构">
                        <el-option
                            v-for="item in orgUIList"
                            :key="item.id"
                            :label="item.orgName"
                            :value="item.id"
                            :title="item.orgName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="机构编码" prop="orgCode">
                    <el-input
                        v-model="institutionForm.orgCode"
                        placeholder="请输入机构编码"
                        disabled
                        ref="institutionCode">
                    </el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input
                        v-model.number.trim="institutionForm.sort"
                        placeholder="请输入序号"
                        :maxlength="3"
                        show-word-limit
                        ref="institutionSort">
                    </el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input
                        v-model="institutionForm.desc"
                        type="textarea"
                        maxlength="255"
                        show-word-limit
                        placeholder="请输入机构描述"
                        autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch v-model="institutionForm.status" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="配置菜单" required>
                    <el-tree
                        style="margin-top: 10px;min-height: 50px;width: 100%"
                        ref="institutionMenuTree"
                        :data="typeMenuTree"
                        :default-checked-keys="institutionForm.menuIdArr"
                        show-checkbox
                        node-key="id"
                        :default-expand-all="true">
                    </el-tree>
                </el-form-item>
                <el-form-item>
                    <el-button @click="goBack()">
                        取消
                    </el-button>
                    <el-button type="primary" @click="submitForm(institutionFormRef)">
                        确定
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
    createOrg,
    goBoardView,
    institutionForm,
    orgDic,
    treeToArr,
    typeMenuTree,
    updateOrg,
    willCreateOrEditInstitutionData
} from './finance-institution';
import type { ValidateCallback } from '@/utils';
import { validateIllegalSymbol } from '@/utils';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import type { TreeNodeData } from 'element-plus/lib/components/tree/src/tree.type';
import { LoadingService } from '@/views/system/loading-service';

function sortValidator(rule: any, value: any, callback: ValidateCallback) {
    if (!value) {
        return callback(new Error('排序只能为1-999的整数！'));
    }
    if (!Number.isInteger(Number(value))) {
        callback(new Error('排序只能为1-999的整数！'));
    } else {
        callback();
    }
}
const orgUIList = computed(() => orgDic.value.map(item => ({
    ...item,
    value: item.id,
    label: item.orgName
})));
const institutionFormRef = ref();
const institutionMenuTree = ref();
const institutionRules = ref({
    orgDictionaryId: [
        { required: true, trigger: 'change', message: '请选择机构' },
        validateIllegalSymbol
    ],
    orgCode: [
        { required: true, trigger: 'change', message: '请输入机构编码' },
        validateIllegalSymbol
    ],
    sort: [
        { required: true, trigger: 'change', message: '请输入序号' },
        { required: true, validator: sortValidator, trigger: 'change' },
        validateIllegalSymbol
    ],
    desc: [
        { min: 0, max: 255, message: '描述长度不能超过255个字符', trigger: 'change' },
        validateIllegalSymbol
    ]
});

function getInstitutionCode(value: string) {
    institutionForm.value.orgCode = orgDic.value.find(item => item.id === value)?.orgCode!;
}

function resetInstitutionCode() {
    institutionForm.value.orgCode = '';
}

async function goBack() {
    LoadingService.getInstance().loading();
    await goBoardView();
    LoadingService.getInstance().stop();
}

async function submitForm(formEl: FormInstance | undefined) {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
        if (valid) {
            await createOrEditInstitution();
        }
    });
}

async function createOrEditInstitution() {
    let checkedNodeIds = institutionMenuTree.value
        .getCheckedNodes(false, true)
        .map((item: TreeNodeData) => item.id);
    if (checkedNodeIds.length === 0) {
        ElMessage({ message: '请至少配置一个菜单', type: 'error' });
        return;
    }
    const newTreeData = treeToArr(typeMenuTree.value);
    const newTreeMenu = newTreeData.map((items) => {
        let selected = 0;
        if (checkedNodeIds.includes(items.id)) {
            selected = 1;
        }
        return { ...items, selected };
    });
    LoadingService.getInstance().loading();
    if (willCreateOrEditInstitutionData.value.id) {
        await updateOrg({
            id: willCreateOrEditInstitutionData.value.id,
            orgLevel: willCreateOrEditInstitutionData.value.level,
            orgDictionaryId: institutionForm.value.orgDictionaryId,
            desc: institutionForm.value.desc,
            sort: institutionForm.value.sort,
            status: institutionForm.value.status,
            menuArr: newTreeMenu
        });
    } else {
        await createOrg({
            orgLevel: willCreateOrEditInstitutionData.value.level,
            orgDictionaryId: institutionForm.value.orgDictionaryId,
            desc: institutionForm.value.desc,
            sort: institutionForm.value.sort,
            parentId: willCreateOrEditInstitutionData.value.parentId ?? undefined,
            status: institutionForm.value.status,
            menuArr: newTreeMenu
        });
    }
    await goBoardView();
    LoadingService.getInstance().stop();
}


</script>

<style scoped lang="scss">
.bank-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    //display: flex;
    //flex-flow: row nowrap;
    //justify-content: space-between;
    //align-items: center;
}

.institution-create-content {
    width: 40%;
    max-width: 40%;
    margin: 0 auto;
}

.header {
    font-size: 24px;
    margin: 20px 0 30px;
}

/*.content {*/
/*    height: 100%;*/
/*    width: 100%;*/
/*    flex: 1;*/
/*    padding-top: 15px;*/
/*}*/

/*.footer {*/
/*    text-align: center;*/
/*    margin: 50px 0;*/
/*}*/
</style>
