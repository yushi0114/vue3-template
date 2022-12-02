<script lang="ts" setup>
import { OPERATE_TYPE } from '@/enums';
import type { DefItem } from '@/components/SjcForm/types';
import SjcForm from '@/components/SjcForm/index.vue';
import { useModal } from '@/composables';
import { toRefs } from '@vueuse/core';
import type { ProductFilterEntity } from '@/types';
import { isDefind } from '@/utils';
import { pick } from 'lodash';

const effectFields = ['typeCode', 'typeValue'];
const props = withDefaults(
    defineProps<{
        form: DefItem[];
    }>(),
    {
        form: () => [],
    }
);

const emits = defineEmits<{
    // eslint-disable-next-line no-undef
    (e: 'submit', type: OPERATE_TYPE, v: Recordable): void;
}>();

const propsRefs = toRefs(props);
const title = ref('');
const modalType = ref<OPERATE_TYPE>(OPERATE_TYPE.ADD);
const initialData = ref<ProductFilterEntity | null>(null);
const publicFormRef = ref<InstanceType<typeof SjcForm> | null>(null);
const openCallback = (data?: { type: OPERATE_TYPE; data?: any,}) => {
    console.log('data: ', data);
    if (data?.type === OPERATE_TYPE.ADD) {
        title.value = '新建过滤项';
        modalType.value = OPERATE_TYPE.ADD;
        initialData.value = data?.data ?? null;
        propsRefs.form.value.forEach((formItem) => {
            formItem.defaultValue = undefined;
        });
        return;
    }
    title.value = '编辑过滤项';
    modalType.value = OPERATE_TYPE.EDIT;
    initialData.value = data?.data;
    propsRefs.form.value.forEach((formItem) => {
        if (isDefind(data?.data[formItem.keyName])) {
            console.log('data[formItem.keyName]：', data?.data[formItem.keyName]);
            formItem.defaultValue = data?.data[formItem.keyName];
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
    const a = pick(initialData.value, effectFields);
    console.log('a: ', a);
    const params = { ...pick(initialData.value, effectFields),...values };
    initialData.value?.id && (params.id = initialData.value.id);
    emits('submit', modalType.value, params);
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
                @click="handleOk"
                >确 定</el-button
            >
        </FlexRow>
    </el-dialog>
</template>

<style lang="scss" scoped></style>
