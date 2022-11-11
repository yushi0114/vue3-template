<template>
    <el-form class="sjc-form" ref="form" :model="formData" label-width="120px">
        <div class="w-full flex">
            <div class="flex-1">
                <el-row>
                    <el-col
                        v-for="(item, index) in formData.form"
                        :key="item.keyName"
                        :span="item.span || 24"
                        :style="item.style">
                        <el-form-item
                            :label="item.label"
                            :prop="`form[${index}].value`"
                            :rules="item.rules || []"
                            :label-width="item.labelWidth">
                            <el-input
                                v-if="item.type === 'input'"
                                v-model.trim="item.value"
                                :placeholder="item.placeholder || ''"
                                :disabled="item.disabled || false"
                                :readonly="item.readonly || false"
                                :show-word-limit="item.showWordLimit || false"
                                :maxlength="item.maxlength || 255"
                                :style="item.style || { width: '100%' }" />

                            <el-input-number
                                v-if="item.type === 'input-number'"
                                v-model.trim="item.value"
                                :min="item.min"
                                :max="item.max"
                                :placeholder="item.placeholder || ''"
                                :disabled="item.disabled"
                                :controls="item.controls || false"
                                :style="item.style || { width: '100%' }" />
                            <!-- textarea输入框 -->
                            <el-input
                                size="small"
                                type="textarea"
                                v-if="item.type === 'textarea'"
                                :disabled="item.disabled"
                                :autosize="item.autosize || { minRows: 2 }"
                                v-model.trim="item.value"
                                :maxlength="item.maxlength || 255"
                                show-word-limit
                                :placeholder="item.placeholder"
                                :style="item.style || { width: '100%' }"></el-input>
                            <el-select
                                v-if="item.type === 'select'"
                                v-model="item.value"
                                :style="item.style || { width: '100%' }"
                                :disabled="item.disabled"
                                filterable
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
                            <el-tree
                                v-if="item.type === 'tree'"
                                :ref="(el: any) => bindTreeRef(el, item.keyName)"
                                :data="item.treeData"
                                :props="item.fieldNames || treeProps"
                                show-checkbox
                                highlight-current
                                default-expand-all
                                :default-checked-keys="item.value"
                                node-key="id"
                                :style="item.style || { width: '100%' }"
                                @check-change="handleTreeCheckChange(item)">
                            </el-tree>
                            <!-- 日期选择器 -->
                            <el-date-picker
                                v-if="item.type === 'date-picker'"
                                :value-format="item.valueFormat || 'yyyy-MM-dd'"
                                :type="item.datePickerType || 'date'"
                                size="small"
                                :disabled="item.disabled"
                                :disabled-date="item.disabledDate"
                                :start-placeholder="item.startPlaceholder || '开始时间'"
                                :end-placeholder="item.endPlaceholder || '结束时间'"
                                :range-separator="item.rangeSeparator || '至'"
                                v-model="item.value"
                                :placeholder="item.placeholder">
                            </el-date-picker>
                            <!-- 时分秒选择器 -->
                            <el-time-picker
                                v-if="item.type === 'time-picker'"
                                :value-format="item.valueFormat || 'yyyy-MM-dd'"
                                :type="item.datePickerType || 'date'"
                                size="small"
                                clearable
                                :is-range="item.isRange"
                                :disabled="item.disabled"
                                :start-placeholder="item.startPlaceholder || '开始时间'"
                                :end-placeholder="item.endPlaceholder || '结束时间'"
                                :range-separator="item.rangeSeparator || '至'"
                                v-model="item.value"
                                :placeholder="item.placeholder || '选择时间范围'">
                            </el-time-picker>
                            <!-- switch开关 -->
                            <el-switch
                                size="small"
                                v-if="item.type === 'switch'"
                                :disabled="item.disabled"
                                v-model="item.value"
                                :active-value="item.activeValue"
                                :inactive-value="item.inactiveValue"></el-switch>
                            <!-- radio单选框 -->
                            <el-radio-group v-if="item.type === 'radio'" :disabled="item.disabled" v-model="item.value">
                                <el-radio
                                    :label="option.value"
                                    v-for="(option, index) in item.radioOptions"
                                    :key="index">
                                    {{ option.label }}
                                </el-radio>
                            </el-radio-group>
                            <!-- checkbox复选框 -->
                            <el-checkbox-group
                                v-if="item.type === 'checkbox'"
                                :disabled="item.disabled"
                                v-model="item.value">
                                <el-checkbox
                                    :label="option.value"
                                    :key="index"
                                    v-for="(option, index) in item.checkboxOptions">
                                    {{ option.label }}
                                </el-checkbox>
                            </el-checkbox-group>
                            <!-- text展示 -->
                            <span v-if="item.type === 'text'" v-text="item.value"></span>
                            <!-- 计量单位 -->
                            <span class="ml-2" v-if="item.type === 'unit'">{{ item.value }}</span>
                            <!-- 文件上传 --><!-- 如果对象有值就回显，没有值就为空 -->
                            <el-upload
                                v-if="item.type === 'upload'"
                                :ref="(el: any) => bindUploadRef(el, item.keyName)"
                                v-model:file-list="item.value"
                                :limit="item.uploadObj!.limit"
                                :class="{
                                    hide: isHiddenUploadBtn(item),
                                }"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="
                                    (file: UploadFile, fileList: UploadFile[]) =>
                                        handleRemove(
                                            {fileList,item,index}
                                        )
                                "
                                :on-success="
                                    (response: any, file: UploadFile, fileList: UploadFile[]) =>
                                        uploadSuccess({fileList,item, index})
                                "
                                :on-exceed="(files: UploadFile[]) => handleExceed({ fileList: files, item })"
                                :http-request="() => handleUpload({ item, index })"
                                :show-file-list="item.uploadObj!.showFileList"
                                :before-upload="(file: UploadFile) => beforeUpload(file, item.uploadObj as UploadObj)"
                                :auto-upload="true"
                                :list-type="item.uploadObj!.listType">
                                <el-button class="el-upload__btn mr-4" type="primary">点击上传 </el-button>
                                <template #tip>
                                    <span class="el-upload__tip">{{ item.uploadObj!.tips }}</span>
                                </template>
                            </el-upload>
                            <slot
                                name="fileList"
                                :fileList="item.value"
                                :limit="item.uploadObj!.limit"
                                :prop="item.keyName"
                                :index="index"
                                v-if="item.type === 'upload'"></slot>
                            <el-dialog
                                v-model="dialogVisible"
                                v-if="item.type === 'upload'"
                                :modal-append-to-body="true"
                                append-to-body
                                width="40%">
                                <img class="w-full block" width="100%" :src="dialogImageUrl" alt="" />
                            </el-dialog>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>

            <div v-if="props.showBtn" class="pl-2">
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
import type { Ref} from 'vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { FormInstance, ElTree, UploadFile } from 'element-plus';
import type { DefItem, IFormValues, UploadObj } from './types';
import { useTree, useUpload } from './hooks';
import { FormType } from '@/enums';

const form = ref<FormInstance>();
const { treeProps, handleTreeCheckChange, bindTreeRef } = useTree();
const {
    bindUploadRef,
    isHiddenUploadBtn,
    dialogVisible,
    dialogImageUrl,
    beforeUpload,
    handlePictureCardPreview,
    handleUpload,
    handleRemove,
    uploadSuccess,
    handleExceed,
} = useUpload(form as Ref<FormInstance>);
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

const formData = reactive<{ form: DefItem[] }>({ form: [] });
const initForm = () => {
    formData.form.length = 0;
    props.def.forEach((item) => {
        const tmpItem = reactive<DefItem>({
            ...item,
            value: undefined,
        });

        if (item.type === FormType.DATA_PICKER) {
            tmpItem.value = null;
        }

        if (item.type === FormType.UPLOAD) {
            tmpItem.value = [];
        }

        if (item.defaultValue || item.defaultValue === 0) {
            tmpItem.value = item.defaultValue;
        }

        formData.form.push(tmpItem);
    });
};

const handleSearch = async() => {
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

<style lang="scss" scoped>
.sjc-form {
    .hide {
        display: flex;

        .el-upload__btn {
            display: none;
        }

        .el-upload__tip {
            display: none;
        }
    }
}
</style>
