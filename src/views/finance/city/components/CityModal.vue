<script lang="ts" setup>
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { createCity, updateCity } from '@/api/finance';
import type { OperateCityEntity } from '@/types/city';

const props = defineProps({
    dialogVisible: {
        type: Boolean,
        default: false,
    },
    dataEdit: {
        type: Object,
        default: () => ({})
    }
});

const cityForm = reactive<OperateCityEntity>({
    name: '',
    code: '',
    sort: '',
    id: ''
});

watch(props.dataEdit, (val) => {
    props.dataEdit.title = val.title;
    if (val.title === '编辑城市') {
        cityForm.name = val.data.name;
        cityForm.code = val.data.code;
        cityForm.sort = val.data.sort;
        cityForm.id = val.data.id;
    } else {
        initForm(cityForm, '');
    }
});

const emit = defineEmits<{
  (e: 'close', flag: Boolean): void,
  (e: 'refresh'): void
}>();

const cancel = () => {
    initForm(cityForm, '');
    emit('close', false);
};

const initForm = (form: OperateCityEntity , val: string) => {
    form.name = val;
    form.code = val;
    form.sort = val;
    form.id = val;
};

const createOrEditCity = (form: FormInstance | undefined, title: string) => {
    if (!form) return;
    form.validate((valid) => {
        if (valid) {
            if (title.includes('新建')) {
                const params = {
                    name: cityForm.name,
                    code: cityForm.code,
                    sort: cityForm.sort,
                    menuName: 'city'
                };
                return createCity(params)
                    .then(() => {
                        ElMessage({
                            type: 'success',
                            message: '创建城市成功',
                        });
                    })
                    .catch(() => {})
                    .finally(() => {
                        emit('close', false);
                        emit('refresh');
                    });
            } else {
                const params = {
                    id: cityForm.id,
                    name: cityForm.name,
                    code: cityForm.code,
                    sort: cityForm.sort,
                    menuName: 'city'
                };
                return updateCity(params)
                    .then(() => {
                        ElMessage({
                            type: 'success',
                            message: '修改城市成功',
                        });
                    })
                    .catch(() => {})
                    .finally(() => {
                        emit('close', false);
                        emit('refresh');
                    });
            }
        }
    });
};

const cityFormRef = ref<FormInstance>();

const cityRules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: '机构名称不能为空！',
            trigger: 'blur'
        },
        {
            pattern:
                /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]){2,10}$/,
            message: '机构名称长度为2-10个汉字',
            trigger: ['blur', 'change']
        }
    ],
    code: [
        {
            required: true,
            message: '行政区划代码不能为空！',
            trigger: 'blur'
        },
        {
            validator: (rule, value, callback) => {
                if (!value) {
                    return;
                }
                if (!/^\d{6}$/.test(value)) {
                    callback(new Error('行政区划代码必须为6位数字！'));
                } else {
                    callback();
                }
            },
            trigger: ['blur', 'change']
        }
    ],
    sort: [
        {
            required: true,
            message: '排序不能为空！',
            trigger: 'blur'
        },
        {
            required: true,
            validator: (rule, value, callback) => {
                if (!value) {
                    return;
                }
                if (!/^[1-9]\d{0,2}$/.test(value)) {
                    callback(new Error('排序只能为1-999的整数！'));
                } else {
                    callback();
                }
            },
            trigger: ['blur', 'change']
        }
    ]
});

</script>
<template>
    <div class="city-container">
        <el-dialog
            v-model="dialogVisible"
            :title="dataEdit.title"
            :width="'500px'"
            @close="cancel"
        >
            <el-form
                ref="cityFormRef"
                :model="cityForm"
                :rules="cityRules"
                label-width="120px"
            >
                <el-form-item label="城市名称" prop="name">
                    <el-input
                        ref="isFocused"
                        v-model.trim="cityForm.name"
                        :maxlength="10"
                        show-word-limit
                        placeholder="请输入城市名称"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="行政区划代码" prop="code">
                    <el-input
                        v-model.trim="cityForm.code"
                        :minlength="6"
                        :maxlength="6"
                        show-word-limit
                        placeholder="请输入行政区划代码"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input
                        v-model.trim="cityForm.sort"
                        :maxlength="3"
                        show-word-limit
                        placeholder="请输入排序"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="createOrEditCity(cityFormRef, dataEdit.title)">
                  确 定
                </el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.city-container {
    :deep(.el-dialog__footer) {
        text-align: center;
    }
}
</style>
