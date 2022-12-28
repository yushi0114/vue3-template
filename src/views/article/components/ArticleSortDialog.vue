<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { checkSort } from '@/utils';

const props = withDefaults(
    defineProps<{
        modelValue: boolean;
        // eslint-disable-next-line no-undef
        data: Recordable;
    }>(),
    {
        data: () => ({}),
    }
);

const emit = defineEmits<{
    // eslint-disable-next-line no-undef
    (e: 'confirm', data: Recordable): void;
    (e: 'update:modelValue', visible: boolean): void;
}>();

const formRef = ref<FormInstance>();
const formModel = reactive({
    sort: undefined,
});

const innerModel = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
});

const rules: any = reactive({
    sort: [
        {
            validator: checkSort,
            trigger: 'change',
        },
    ],
});

async function submit() {
    try {
        await formRef.value?.validate();
        emit('confirm', { ...props.data, sort: formModel.sort});
    } catch {
        // noop
    }
}

function handleOpen() {
    formModel.sort = props.data.sort;
}

function cancel() {
    emit('update:modelValue', false);
}

function clear() {
    formRef.value?.resetFields();
}
</script>

<template>
    <MessageDialog
        title="修改排序"
        width="480px"
        class="nav-user-update-name"
        v-model="innerModel"
        @open="handleOpen"
        @close="cancel"
        @closed="clear"
        @confirm="submit">
        <!-- -->
        <el-form
            ref="formRef"
            size="large"
            :rules="rules"
            :model="formModel">
            <el-form-item
                label="请输入新的序号"
                prop="username">
                <el-input
                    v-model="formModel.sort"
                    placeholder="请输入序号" />
            </el-form-item>
        </el-form>
    </MessageDialog>
</template>
