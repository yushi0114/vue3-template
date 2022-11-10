<template>
    <el-form ref="form" :model="formData" label-width="120px">
        <div class="w-full flex">
            <div class="flex-1 pr-2">
                <el-row>
                    <el-col v-for="(item, index) in formData.form" :key="item.keyName" :span="item.span || 24">
                        <el-form-item :label="item.label" :prop="`form[${index}].value`" :rules="item.rules || []">
                            <el-input
                                v-if="item.type === 'input'"
                                v-model.trim="item.value"
                                :placeholder="item.placeholder"
                                :style="item.style || { width: '100%' }" />
                            <el-select
                                v-if="item.type === 'select'"
                                v-model="item.value"
                                :style="item.style || { width: '100%' }"
                                :borderless="item.borderless || false"
                                :placeholder="item.placeholder || '请选择'">
                                <el-option
                                    v-for="(option, optionIndex) in item.selectOptions"
                                    :key="optionIndex"
                                    :label="option.title"
                                    :value="option.value">
                                    {{ option.title }}
                                </el-option>
                            </el-select>
                            {{ item }}
                            <el-tree
                                v-if="item.type === 'tree'"
                                :ref="(el: any) => bindTreeRef(el, item.keyName)"
                                :data="item.treeData"
                                :props="treeProps"
                                show-checkbox
                                highlight-current
                                default-expand-all
                                :default-checked-keys="item.value"
                                node-key="id"
                                @check-change="handleTreeCheckChange(item)"></el-tree>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>

            <div v-if="props.showBtn">
                <el-space size="small">
                    <el-button type="default" @click="onReset">重置</el-button>
                    <el-button type="primary" :loading="loading" @click="handleSearch">查询</el-button>
                </el-space>
            </div>
        </div>
    </el-form>
</template>
<script lang="ts">
export default {
    name: 'SjcForm',
};
</script>
<script lang="ts" setup>
import type { FormInstance, ElTree } from 'element-plus';
import type { DefItem, IFormValues } from './types';
import { useTree } from './hooks';

const { treeProps, handleTreeCheckChange, bindTreeRef } = useTree();
const props = withDefaults(
    defineProps<{
        def: DefItem[];
        loading?: boolean;
        showBtn?: boolean;
        updateSubmit?: number;
        updateReset?: number;
    }>(),
    { def: () => [], loading: false, showBtn: true, updateSubmit: 0, updateReset: 0 }
);

const emit = defineEmits<{
    (e: 'search', values: IFormValues): void;
}>();

const form = ref<FormInstance>();
const formData = reactive<{ form: DefItem[] }>({ form: [] });
const initForm = () => {
    console.log('props.def：', props.def);
    formData.form.length = 0;
    props.def.forEach((item) => {
        console.log('item: ', item);
        const tmpItem = reactive<DefItem>({
            ...item,
            value: undefined,
        });

        if (item.type === 'date-picker') {
            tmpItem.value = null;
        }
        console.log('item.defaultValue: ', item.defaultValue);

        if (item.defaultValue || item.defaultValue === 0) {
            console.log('item.defaultValue: ', item.defaultValue);
            tmpItem.value = item.defaultValue;
        }

        formData.form.push(tmpItem);
        console.log('formData: ', formData);
    });
};

const handleSearch = async () => {
    if (!form) return;
    await form.value?.validate((valid, fields) => {
        if (valid) {
            const values: IFormValues = {};
            formData.form.forEach((formItem) => {
                if (formItem.keyName) {
                    values[formItem.keyName] = formItem.value;
                }
            });
            console.log('values：', values);
            emit('search', values);
        } else {
            const [[{ message }]] = Object.values(fields ?? {});
            ElMessage({
                message,
                grouping: true,
                type: 'warning',
            });
            console.log('error submit!', fields);
        }
    });
};

const onReset = () => {
    if (!form) return;
    form.value?.resetFields();
    initForm();
};

watch(
    () => props.def,
    () => {
        initForm();
    },
    { deep: true }
);

watch(
    () => props.updateSubmit,
    () => {
        handleSearch();
    }
);

watch(
    () => props.updateReset,
    () => {
        onReset();
    }
);

onMounted(() => {
    initForm();
});
</script>
