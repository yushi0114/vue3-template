<script lang="ts" setup>
import { getFirstPageData, updateHomePageStatic } from '@/api/firstPageCount';
import type { statistics } from '@/types/statistics';
import { EditPen, Check, Close } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';

const countForm = reactive<statistics>({
    registerCorp: 0,
    financeProduct: 0,
    successFinance: 0,
    solveFinance: 0
});

const cloneFormData = reactive<statistics>({
    registerCorp: 0,
    financeProduct: 0,
    successFinance: 0,
    solveFinance: 0
});

const allDisabled = reactive({
    registerCorpDisabled: true,
    financeProductDisabled: true,
    successFinanceDisabled: true,
    solveFinanceDisabled: true
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
    registerCorp: [
        { required: true, message: '请输入注册企业数', trigger: 'change' },
        { validator: isZero, trigger: 'change' }
    ],
    financeProduct: [
        { required: true, message: '请输入金融产品数', trigger: 'change' },
        { validator: isZero, trigger: 'change' }
    ],
    successFinance: [
        { required: true, message: '请输入成功融资数', trigger: 'change' },
        { validator: isZero, trigger: 'change' }
    ],
    solveFinance: [
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
        }
    ]
});

onMounted(() => {
    getHomeData();
});

// 获取首页数据
const getHomeData = () => {
    isLoading.value = true;
    return getFirstPageData()
        .then((res) => {
            countForm.registerCorp = res.registerEnterprise;
            countForm.financeProduct = res.financialProduct;
            countForm.successFinance = res.financeSuccess;
            countForm.solveFinance = res.financeResolve;
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
    if (field === 'registerCorp') {
        allDisabled.registerCorpDisabled = false;
        cloneFormData.registerCorp = JSON.parse(JSON.stringify(countForm.registerCorp));
    } else if (field === 'financeProduct') {
        allDisabled.financeProductDisabled = false;
        cloneFormData.financeProduct = JSON.parse(JSON.stringify(countForm.financeProduct));
    } else if (field === 'successFinance') {
        allDisabled.successFinanceDisabled = false;
        cloneFormData.successFinance = JSON.parse(JSON.stringify(countForm.successFinance));
    } else if (field === 'solveFinance') {
        allDisabled.solveFinanceDisabled = false;
        cloneFormData.solveFinance = JSON.parse(JSON.stringify(countForm.solveFinance));
    }
};

// 确认
const saveHandle = async({ field } : { field: string }, form: FormInstance | undefined) => {
    if (!form) return;
    await form.validate((valid) => {
        if (valid) {
            const params = {
                registerEnterprise: countForm.registerCorp,
                financialProduct: countForm.financeProduct,
                financeSuccess: countForm.successFinance,
                financeResolve: countForm.solveFinance
            };
            return updateHomePageStatic(params)
                .then(() => {
                    if (field === 'registerCorp') {
                        allDisabled.registerCorpDisabled = true;
                    } else if (field === 'financeProduct') {
                        allDisabled.financeProductDisabled = true;
                    } else if (field === 'successFinance') {
                        allDisabled.successFinanceDisabled = true;
                    } else if (field === 'solveFinance') {
                        allDisabled.solveFinanceDisabled = true;
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
    if (field === 'registerCorp') {
        countForm.registerCorp = cloneFormData.registerCorp;
        allDisabled.registerCorpDisabled = true;
        isEdit.value = false;
    } else if (field === 'financeProduct') {
        countForm.financeProduct = cloneFormData.financeProduct;
        allDisabled.financeProductDisabled = true;
        isEdit.value = false;
    } else if (field === 'successFinance') {
        countForm.successFinance = cloneFormData.successFinance;
        allDisabled.successFinanceDisabled = true;
        isEdit.value = false;
    } else if (field === 'solveFinance') {
        countForm.solveFinance = cloneFormData.solveFinance;
        allDisabled.solveFinanceDisabled = true;
        isEdit.value = false;
    }
};

</script>

<template>
    <div class="statistics-container" v-loading="isLoading">
        <div class="header">
            <Text size="xl" color="paragraph">首页统计数据</Text>
        </div>
        <el-form ref="countFormRef" :model="countForm" :rules="countRules">
            <div class="formItem">
                <el-form-item label="注册企业" prop="registerCorp">
                    <el-input
                        v-model.number="countForm.registerCorp"
                        size="large"
                        placeholder="请输入注册企业数"
                        :disabled="allDisabled.registerCorpDisabled"
                    >
                        <template #suffix>
                            <el-icon
                                v-if="allDisabled.registerCorpDisabled"
                                class="el-icon-edit el-input__icon icon"
                                :class="{ 'edit-disabled': isEdit }"
                                title="编辑"
                                @click="clickHandle({ field: 'registerCorp' })"
                            ><EditPen />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.registerCorpDisabled"
                                title="保存"
                                class="el-icon-check el-input__icon icon"
                                @click="saveHandle({ field: 'registerCorp' }, countFormRef)"
                            ><Check />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.registerCorpDisabled"
                                title="取消"
                                class="el-icon-close el-input__icon icon"
                                @click="cancelHandle({ field: 'registerCorp' })"
                            ><Close />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <span class="unit">家</span>
            </div>
            <div class="formItem">
                <el-form-item label="金融产品" prop="financeProduct">
                    <el-input
                        v-model.number="countForm.financeProduct"
                        size="large"
                        placeholder="请输入金融产品数"
                        :disabled="allDisabled.financeProductDisabled"
                    >
                        <template #suffix>
                            <el-icon
                                v-if="allDisabled.financeProductDisabled"
                                class="el-icon-edit el-input__icon icon"
                                :class="{ 'edit-disabled': isEdit }"
                                title="编辑"
                                @click="clickHandle({ field: 'financeProduct' })"
                            ><EditPen />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.financeProductDisabled"
                                title="保存"
                                class="el-icon-check el-input__icon icon"
                                @click="saveHandle({ field: 'financeProduct' }, countFormRef)"
                            ><Check />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.financeProductDisabled"
                                title="取消"
                                class="el-icon-close el-input__icon icon"
                                @click="cancelHandle({ field: 'financeProduct' })"
                            ><Close />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <span class="unit">个</span>
            </div>
            <div class="formItem">
                <el-form-item label="成功融资" prop="successFinance">
                    <el-input
                        v-model.number="countForm.successFinance"
                        size="large"
                        placeholder="请输入金融产品数"
                        :disabled="allDisabled.successFinanceDisabled"
                    >
                        <template #suffix>
                            <el-icon
                                v-if="allDisabled.successFinanceDisabled"
                                class="el-icon-edit el-input__icon icon"
                                :class="{ 'edit-disabled': isEdit }"
                                title="编辑"
                                @click="clickHandle({ field: 'successFinance' })"
                            ><EditPen />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.successFinanceDisabled"
                                title="保存"
                                class="el-icon-check el-input__icon icon"
                                @click="saveHandle({ field: 'successFinance' }, countFormRef)"
                            ><Check />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.successFinanceDisabled"
                                title="取消"
                                class="el-icon-close el-input__icon icon"
                                @click="cancelHandle({ field: 'successFinance' })"
                            ><Close />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <span class="unit">笔</span>
            </div>
            <div class="formItem">
                <el-form-item label="解决融资" prop="solveFinance">
                    <el-input
                        v-model.number="countForm.solveFinance"
                        size="large"
                        placeholder="请输入解决融资数"
                        :disabled="allDisabled.solveFinanceDisabled"
                    >
                        <template #suffix>
                            <el-icon
                                v-if="allDisabled.solveFinanceDisabled"
                                class="el-icon-edit el-input__icon icon"
                                :class="{ 'edit-disabled': isEdit }"
                                title="编辑"
                                @click="clickHandle({ field: 'solveFinance' })"
                            ><EditPen />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.solveFinanceDisabled"
                                title="保存"
                                class="el-icon-check el-input__icon icon"
                                @click="saveHandle({ field: 'solveFinance' }, countFormRef)"
                            ><Check />
                            </el-icon>
                            <el-icon
                                v-if="!allDisabled.solveFinanceDisabled"
                                title="取消"
                                class="el-icon-close el-input__icon icon"
                                @click="cancelHandle({ field: 'solveFinance' })"
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
