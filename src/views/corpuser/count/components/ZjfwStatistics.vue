<script lang="ts" setup>
import { getZfFirstPageData, updateZfHomePageStatic } from '@/api/firstPageCount';
import type { zjfwStatistics } from '@/types/statistics';
import { EditPen, Check, Close } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import { validateIllegalSymbol } from '@/utils';

const countForm = reactive<zjfwStatistics>({
    registerEnterprise: 0,
    financialProduct: 0,
    releaseRequirement: 0,
    registerOrg: 0,
    financeResolve: 0,
    propertyFinanceResolve: 0
});

const cloneFormData = reactive<zjfwStatistics>({
    registerEnterprise: 0,
    financialProduct: 0,
    releaseRequirement: 0,
    registerOrg: 0,
    financeResolve: 0,
    propertyFinanceResolve: 0
});

const allDisabled = reactive({
    registerEnterpriseDisabled: true,
    releaseRequirementDisabled: true,
    financeResolveDisabled: true,
    financialProductDisabled: true,
    registerOrgDisabled: true,
    propertyFinanceResolveDisabled: true,
});

const isEdit = ref(false);

const isLoading = ref(true);

const countFormRef = ref<FormInstance>();

// 自定义规则
const isZero = (rule: any, value: string, callback: (message?: Error) => {}) => {
    if (!/^([0]|[1-9][0-9]*)$/.test(value)) {
        callback(new Error('请输入正整数'));
    } else if (Number(value) === 0) {
        callback(new Error('不可为0'));
    } else {
        callback();
    }
};

// 表单规则
const countRules:any = reactive({
    registerEnterprise: [
        { required: true, message: '请输入注册企业数', trigger: 'change' },
        { validator: isZero, trigger: 'change' },
        validateIllegalSymbol
    ],
    registerOrg: [
        { required: true, message: '请输入平台机构数', trigger: 'change' },
        { validator: isZero, trigger: 'change' },
        validateIllegalSymbol
    ],
    financialProduct: [
        { required: true, message: '请输入金融产品数', trigger: 'change' },
        { validator: isZero, trigger: 'change' },
        validateIllegalSymbol
    ],
    releaseRequirement: [
        { required: true, message: '请输入平台发布需求数', trigger: 'change' },
        { validator: isZero, trigger: 'change' },
        validateIllegalSymbol
    ],
    financeResolve: [
        { required: true, message: '请输入解决融资数', trigger: 'change' },
        {
            validator: (rule: any, value: string, callback: (message?: Error) => {}) => {
                if (Number(value) === 0) {
                    callback(new Error('不可为0'));
                } else {
                    callback();
                }
            },
            trigger: 'change'
        },
        {
            validator: (rule: any, value: string, callback: (message?: Error) => {}) => {
                if (!/^\d+(.\d{1,2})?$/.test(value)) {
                    callback(new Error('只能输入数字，且最多保留两位小数'));
                } else {
                    callback();
                }
            },
            trigger: 'change'
        },
        validateIllegalSymbol
    ],
    propertyFinanceResolve: [
        { required: true, message: '请输入产权交易金额', trigger: 'change' },
        {
            validator: (rule: any, value: string, callback: (message?: Error) => {}) => {
                if (Number(value) === 0) {
                    callback(new Error('不可为0'));
                } else {
                    callback();
                }
            },
            trigger: 'change'
        },
        {
            validator: (rule: any, value: string, callback: (message?: Error) => {}) => {
                if (!/^\d+(.\d{1,2})?$/.test(value)) {
                    callback(new Error('只能输入数字，且最多保留两位小数'));
                } else {
                    callback();
                }
            },
            trigger: 'change'
        },
        validateIllegalSymbol
    ]
});

onMounted(() => {
    getHomeData();
});

// 获取首页数据
const getHomeData = () => {
    isLoading.value = true;
    return getZfFirstPageData()
        .then((res) => {
            countForm.registerEnterprise = res.registerEnterprise;
            countForm.financialProduct = res.financialProduct;
            countForm.releaseRequirement = res.releaseRequirement;
            countForm.registerOrg = res.registerOrg;
            countForm.financeResolve = res.financeResolve;
            countForm.propertyFinanceResolve = res.propertyFinanceResolve;
        })
        .finally(() => {
            isLoading.value = false;
        });
};

// 编辑
const clickHandle = ({ field } : { field: string }) => {
    if (isEdit.value) {
        return;
    }
    isEdit.value = true;
    if (field === 'registerEnterprise') {
        allDisabled.registerEnterpriseDisabled = false;
        cloneFormData.registerEnterprise = JSON.parse(JSON.stringify(countForm.registerEnterprise));
    } else if (field === 'financialProduct') {
        allDisabled.financialProductDisabled = false;
        cloneFormData.financialProduct = JSON.parse(JSON.stringify(countForm.financialProduct));
    } else if (field === 'releaseRequirement') {
        allDisabled.releaseRequirementDisabled = false;
        cloneFormData.releaseRequirement = JSON.parse(JSON.stringify(countForm.releaseRequirement));
    } else if (field === 'registerOrg') {
        allDisabled.registerOrgDisabled = false;
        cloneFormData.registerOrg = JSON.parse(JSON.stringify(countForm.registerOrg));
    } else if (field === 'financeResolve') {
        allDisabled.financeResolveDisabled = false;
        cloneFormData.financeResolve = JSON.parse(JSON.stringify(countForm.financeResolve));
    } else if (field === 'propertyFinanceResolve') {
        allDisabled.propertyFinanceResolveDisabled = false;
        cloneFormData.propertyFinanceResolve = JSON.parse(
            JSON.stringify(countForm.propertyFinanceResolve)
        );
    }
};

// 确认
const saveHandle = async({ field } : { field: string }, form: FormInstance | undefined) => {
    if (!form) return;
    await form.validate((valid) => {
        if (valid) {
            const params = {
                registerEnterprise: countForm.registerEnterprise,
                financialProduct: countForm.financialProduct,
                financeResolve: countForm.financeResolve,
                registerOrg: countForm.registerOrg,
                releaseRequirement: countForm.releaseRequirement,
                propertyFinanceResolve: countForm.propertyFinanceResolve
            };
            return updateZfHomePageStatic(params)
                .then(() => {
                    if (field === 'registerEnterprise') {
                        allDisabled.registerEnterpriseDisabled = true;
                    } else if (field === 'financialProduct') {
                        allDisabled.financialProductDisabled = true;
                    } else if (field === 'financeResolve') {
                        allDisabled.financeResolveDisabled = true;
                    } else if (field === 'registerOrg') {
                        allDisabled.registerOrgDisabled = true;
                    } else if (field === 'releaseRequirement') {
                        allDisabled.releaseRequirementDisabled = true;
                    } else if (field === 'propertyFinanceResolve') {
                        allDisabled.propertyFinanceResolveDisabled = true;
                    }
                })
                .finally(() => {
                    isEdit.value = false;
                });
        }
    });
};

// 取消
const cancelHandle = ({ field } : { field: string }) => {
    if (field === 'registerEnterprise') {
        countForm.registerEnterprise = cloneFormData.registerEnterprise;
        allDisabled.registerEnterpriseDisabled = true;
        isEdit.value = false;
    } else if (field === 'financialProduct') {
        countForm.financialProduct = cloneFormData.financialProduct;
        allDisabled.financialProductDisabled = true;
        isEdit.value = false;
    } else if (field === 'financeResolve') {
        countForm.financeResolve = cloneFormData.financeResolve;
        allDisabled.financeResolveDisabled = true;
        isEdit.value = false;
    } else if (field === 'registerOrg') {
        countForm.registerOrg = cloneFormData.registerOrg;
        allDisabled.registerOrgDisabled = true;
        isEdit.value = false;
    } else if (field === 'releaseRequirement') {
        countForm.releaseRequirement = cloneFormData.releaseRequirement;
        allDisabled.releaseRequirementDisabled = true;
        isEdit.value = false;
    } else if (field === 'propertyFinanceResolve') {
        countForm.propertyFinanceResolve = cloneFormData.propertyFinanceResolve;
        allDisabled.propertyFinanceResolveDisabled = true;
        isEdit.value = false;
    }
};

</script>

<template>
    <div class="statistics-container" v-loading="isLoading">
        <div class="header">
            <Text size="xl" color="paragraph">首页统计数据</Text>
        </div>
        <el-form ref="countFormRef" :model="countForm" :rules="countRules" label-width="120px">
            <div class="formItem">
                <el-form-item label="注册企业" prop="registerEnterprise">
                    <el-input
                        v-model.number="countForm.registerEnterprise"
                        size="large"
                        placeholder="请输入注册企业数"
                        :disabled="allDisabled.registerEnterpriseDisabled"
                    >
                        <template #suffix>
                            <el-icon
                                v-if="allDisabled.registerEnterpriseDisabled"
                                class="el-icon-edit el-input__icon icon"
                                :class="{ 'edit-disabled': isEdit }"
                                title="编辑"
                                @click="clickHandle({ field: 'registerEnterprise' })"
                            ><EditPen />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.registerEnterpriseDisabled"
                                title="保存"
                                class="el-icon-check el-input__icon icon"
                                @click="saveHandle({ field: 'registerEnterprise' }, countFormRef)"
                            ><Check />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.registerEnterpriseDisabled"
                                title="取消"
                                class="el-icon-close el-input__icon icon"
                                @click="cancelHandle({ field: 'registerEnterprise' })"
                            ><Close />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <span class="unit">家</span>
            </div>
            <div class="formItem">
                <el-form-item label="平台机构数量" prop="registerOrg">
                    <el-input
                        v-model.number="countForm.registerOrg"
                        size="large"
                        placeholder="请输入平台机构数"
                        :disabled="allDisabled.registerOrgDisabled"
                    >
                        <template #suffix>
                            <el-icon
                                v-if="allDisabled.registerOrgDisabled"
                                class="el-icon-edit el-input__icon icon"
                                :class="{ 'edit-disabled': isEdit }"
                                title="编辑"
                                @click="clickHandle({ field: 'registerOrg' })"
                            ><EditPen />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.registerOrgDisabled"
                                title="保存"
                                class="el-icon-check el-input__icon icon"
                                @click="saveHandle({ field: 'registerOrg' }, countFormRef)"
                            ><Check />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.registerOrgDisabled"
                                title="取消"
                                class="el-icon-close el-input__icon icon"
                                @click="cancelHandle({ field: 'registerOrg' })"
                            ><Close />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <span class="unit">家</span>
            </div>
            <div class="formItem">
                <el-form-item label="金融产品" prop="financialProduct">
                    <el-input
                        v-model.number="countForm.financialProduct"
                        size="large"
                        placeholder="请输入金融产品数"
                        :disabled="allDisabled.financialProductDisabled"
                    >
                        <template #suffix>
                            <el-icon
                                v-if="allDisabled.financialProductDisabled"
                                class="el-icon-edit el-input__icon icon"
                                :class="{ 'edit-disabled': isEdit }"
                                title="编辑"
                                @click="clickHandle({ field: 'financialProduct' })"
                            ><EditPen />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.financialProductDisabled"
                                title="保存"
                                class="el-icon-check el-input__icon icon"
                                @click="saveHandle({ field: 'financialProduct' }, countFormRef)"
                            ><Check />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.financialProductDisabled"
                                title="取消"
                                class="el-icon-close el-input__icon icon"
                                @click="cancelHandle({ field: 'financialProduct' })"
                            ><Close />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <span class="unit">个</span>
            </div>
            <div class="formItem">
                <el-form-item label="平台发布需求" prop="releaseRequirement">
                    <el-input
                        v-model.number="countForm.releaseRequirement"
                        size="large"
                        placeholder="请输入金融产品数"
                        :disabled="allDisabled.releaseRequirementDisabled"
                    >
                        <template #suffix>
                            <el-icon
                                v-if="allDisabled.releaseRequirementDisabled"
                                class="el-icon-edit el-input__icon icon"
                                :class="{ 'edit-disabled': isEdit }"
                                title="编辑"
                                @click="clickHandle({ field: 'releaseRequirement' })"
                            ><EditPen />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.releaseRequirementDisabled"
                                title="保存"
                                class="el-icon-check el-input__icon icon"
                                @click="saveHandle({ field: 'releaseRequirement' }, countFormRef)"
                            ><Check />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.releaseRequirementDisabled"
                                title="取消"
                                class="el-icon-close el-input__icon icon"
                                @click="cancelHandle({ field: 'releaseRequirement' })"
                            ><Close />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <span class="unit">个</span>
            </div>
            <div class="formItem">
                <el-form-item label="解决融资" prop="financeResolve">
                    <el-input
                        v-model.number="countForm.financeResolve"
                        size="large"
                        placeholder="请输入解决融资数"
                        :disabled="allDisabled.financeResolveDisabled"
                    >
                        <template #suffix>
                            <el-icon
                                v-if="allDisabled.financeResolveDisabled"
                                class="el-icon-edit el-input__icon icon"
                                :class="{ 'edit-disabled': isEdit }"
                                title="编辑"
                                @click="clickHandle({ field: 'financeResolve' })"
                            ><EditPen />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.financeResolveDisabled"
                                title="保存"
                                class="el-icon-check el-input__icon icon"
                                @click="saveHandle({ field: 'financeResolve' }, countFormRef)"
                            ><Check />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.financeResolveDisabled"
                                title="取消"
                                class="el-icon-close el-input__icon icon"
                                @click="cancelHandle({ field: 'financeResolve' })"
                            ><Close />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <span class="unit">亿元</span>
            </div>
            <div class="formItem">
                <el-form-item label="产权交易金额" prop="propertyFinanceResolve">
                    <el-input
                        v-model.number="countForm.propertyFinanceResolve"
                        size="large"
                        placeholder="请输入产权交易金额"
                        :disabled="allDisabled.propertyFinanceResolveDisabled"
                    >
                        <template #suffix>
                            <el-icon
                                v-if="allDisabled.propertyFinanceResolveDisabled"
                                class="el-icon-edit el-input__icon icon"
                                :class="{ 'edit-disabled': isEdit }"
                                title="编辑"
                                @click="clickHandle({ field: 'propertyFinanceResolve' })"
                            ><EditPen />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.propertyFinanceResolveDisabled"
                                title="保存"
                                class="el-icon-check el-input__icon icon"
                                @click="saveHandle({ field: 'propertyFinanceResolve' }, countFormRef)"
                            ><Check />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.propertyFinanceResolveDisabled"
                                title="取消"
                                class="el-icon-close el-input__icon icon"
                                @click="cancelHandle({ field: 'propertyFinanceResolve' })"
                            ><Close />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <span class="unit">亿元</span>
            </div>
        </el-form>
    </div>

</template>

<style lang="scss" scoped>
.statistics-container {
    margin: 0 auto;

    .header {
        margin: $gap-md 0;
    }

    .el-form {
        flex: 1;
        padding-top: 15px;

        .formItem {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 40px;

            .el-form-item {
                margin-bottom: 0;

                .el-input {
                    width: 300px;
                }

                .icon {
                    color: #6f86ed;
                }

                .icon:hover {
                    color: #4b68e9;
                    cursor: pointer;
                }

                .edit-disabled {
                    cursor: not-allowed;

                    &:hover {
                        cursor: not-allowed;
                    }
                }
            }

            .unit {
                height: 100%;
                margin-left: 5px;
                flex: 1;
                color: #999999;
                font-size: 14px;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: flex-start;
            }
        }
    }
}
</style>
