<script lang="ts" setup>
import { OPERATE_TYPE } from '@/enums';
import type { DefItem } from '@/components/SjcForm/types';
import SjcForm from '@/components/SjcForm/index.vue';
import { useModal } from '@/composables';
import { toRefs } from '@vueuse/core';
import type { ProductFilterEntity } from '@/types';
import { isDefind } from '@/utils';

const props = withDefaults(
    defineProps<{
        form: DefItem[];
        loading?: boolean;
    }>(),
    {
        form: () => [],
        loading: false
    }
);

const emits = defineEmits<{
    // eslint-disable-next-line no-undef
    (e: 'submit', type: OPERATE_TYPE, v: Recordable): void;
}>();

const propsRefs = toRefs(props);
const title = ref('');
const type = ref<OPERATE_TYPE>(OPERATE_TYPE.ADD);
const initialData = ref<ProductFilterEntity | null>(null);
const publicFormRef = ref<InstanceType<typeof SjcForm> | null>(null);
const openCallback = (data?: any) => {
    if (!data) {
        title.value = '新建筛选类别';
        type.value = OPERATE_TYPE.ADD;
        initialData.value = null;
        propsRefs.form.value.forEach((formItem) => {
            formItem.defaultValue = undefined;
        });
        return;
    }
    title.value = '编辑筛选类别';
    type.value = OPERATE_TYPE.EDIT;
    initialData.value = data;
    propsRefs.form.value.forEach((formItem) => {
        if (isDefind(data[formItem.keyName])) {
            formItem.defaultValue = data[formItem.keyName];
        }
    });
};
const { visible, open, close } = useModal(openCallback);

const handleOk = () => {
    publicFormRef.value?.handleSearch();
};

const handleCancel = () => {
    publicFormRef.value?.onReset();
    close();
};

// eslint-disable-next-line no-undef
const handleSubmit = (values: Recordable) => {
    const params = { ...values };
    initialData.value?.id && (params.id = initialData.value.id);
    emits('submit', type.value, params);
};

defineExpose({
    open,
    handleCancel,
});
</script>

<template>
    <el-dialog
        :title="title"
        :width="'650px'"
        v-model="visible"
        :close-on-click-modal="false"
        destroy-on-close
        @close="handleCancel">
        <sjc-form
            ref="publicFormRef"
            :def="propsRefs.form.value"
            @search="handleSubmit"></sjc-form>
        <FlexRow horizontal="center">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button
                type="primary"
                :loading="loading"
                @click="handleOk"
                >确 定</el-button
            >
        </FlexRow>
    </el-dialog>
</template>

<style lang="scss" scoped></style>
