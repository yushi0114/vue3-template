<template>
    <el-form style="width: 100%" ref="institutionForm1" :model="institutionForm" :rules="institutionRules"
             label-width="100px">
        <el-form-item label="机构名称" prop="orgId">
            <el-select
                v-model="institutionForm.orgId"
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
                    :title="item.orgName"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="机构编码" prop="orgCode">
            <el-input v-model="institutionForm.orgCode" placeholder="请输入机构编码" disabled
                      ref="institutionCode">
            </el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
            <el-input
                v-model.number.trim="institutionForm.sort"
                placeholder="请输入序号"
                :maxlength="3"
                show-word-limit
                ref="institutionSort"
            >
            </el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
            <el-input
                v-model="institutionForm.desc"
                type="textarea"
                maxlength="255"
                show-word-limit
                placeholder="请输入机构描述"
                autocomplete="off"
            ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <el-switch v-model="institutionForm.status" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="配置菜单" required>
            <div style="margin-top: 10px">
                <el-tree
                    ref="institutionMenuTree"
                    :data="typeMenuTree"
                    :default-checked-keys="institutionForm.menuIdArr"
                    show-checkbox
                    node-key="id"
                    :default-expand-all="true"
                >
                </el-tree>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button @click="goBack()">
                <template #icon>
                    <Icon :name="'ep:back'"></Icon>
                </template>
            </el-button>
            <el-button type="primary" @click="submitForm">
                <template #icon>
                    <Icon :name="'ep:edit'"></Icon>
                </template>
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { institutionForm, institutionItemData, mode, orgDic, typeMenuTree } from './finance-institution';

const validateSort = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('排序只能为1-999的整数！'));
    }
    if (!Number.isInteger(Number(value))) {
        callback(new Error('排序只能为1-999的整数！'));
    } else {
        callback();
    }
};
const orgUIList = computed(() => orgDic.value.map(item => ({
    ...item,
    value: item.id,
    label: item.orgName
})));
const institutionMenuTree = ref();
const institutionRules = ref({
    orgId: [{ required: true, trigger: 'change', message: '请选择机构' }],
    orgCode: [{ required: true, trigger: 'change', message: '请输入机构编码' }],
    sort: [
        { required: true, trigger: 'change', message: '请输入序号' },
        { required: true, validator: validateSort, trigger: 'change' }
    ],
    desc: [
        { min: 0, max: 255, message: '描述长度不能超过255个字符', trigger: 'change' }
    ]
});

function getInstitutionCode(value: string) {
    institutionForm.value.orgCode = orgDic.value.find(item => item.id === value)?.orgCode!;

}

function resetInstitutionCode() {

}

function goBack() {
    mode.value = 'board';
    institutionItemData.value = undefined;
}

function submitForm() {

}


</script>

<style scoped>
.bank-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
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
