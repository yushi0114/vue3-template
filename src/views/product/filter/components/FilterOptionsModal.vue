<script lang="ts" setup>
import { OPERATE_TYPE } from '@/enums';
import type { DefItem } from '@/components/SjcForm/types';
import SjcForm from '@/components/SjcForm/index.vue';
import { useModal } from '@/composables';
import type { ProductFilterEntity } from '@/types';
import { isDefind } from '@/utils';
import { pick, cloneDeep } from 'lodash';
import { FILTER_UNIT_MAP } from '../../constants';

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

const form = ref(cloneDeep(props.form));
const title = ref('');
const modalType = ref<OPERATE_TYPE>(OPERATE_TYPE.ADD);
const initialData = ref<ProductFilterEntity | null>(null);
const publicFormRef = ref<InstanceType<typeof SjcForm> | null>(null);
const openCallback = (data?: { type: OPERATE_TYPE; data?: any }) => {
    form.value = cloneDeep(props.form);
    if (data?.type === OPERATE_TYPE.ADD) {
        title.value = '新建过滤项';
        modalType.value = OPERATE_TYPE.ADD;
        initialData.value = data?.data ?? null;
        filterForm();
        return;
    }
    title.value = '编辑过滤项';
    modalType.value = OPERATE_TYPE.EDIT;
    initialData.value = data?.data;
    filterForm();
    form.value.forEach((formItem) => {
        if (isDefind(data?.data[formItem.keyName])) {
            formItem.defaultValue = data?.data[formItem.keyName];
        }

        if (data?.data.filterValue) {
            const [start, end] = (data?.data.filterValue ?? '').split('-');
            formItem.keyName === 'filterValueStart' && (formItem.defaultValue = start);
            formItem.keyName === 'filterValueEnd' && (formItem.defaultValue = end);
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
    if (!values.filterValue && values.filterValueStart && values.filterValueEnd) {
        values.filterValue = values.filterValueStart + '-' + values.filterValueEnd;
        Reflect.deleteProperty(values, 'filterValueStart');
        Reflect.deleteProperty(values, 'filterValueEnd');
    }
    const params = { ...pick(initialData.value, effectFields), ...values };
    initialData.value?.id && (params.id = initialData.value.id);
    emits('submit', modalType.value, params);
};

const filterForm = () => {
    const rangeInputFields = ['贷款额度', '贷款期限', '融资额度', '融资期限'];
    if (rangeInputFields.includes(initialData.value?.typeValue ?? '')) {
        form.value = form.value.filter((item) => item.keyName !== 'filterValue').map((item) => {
            if (item.keyName === 'unit') {
                item.defaultValue = FILTER_UNIT_MAP[initialData.value?.typeValue as keyof typeof FILTER_UNIT_MAP];
            }
            return item;
        });
    } else {
        form.value = form.value.filter((item) =>
            ['filterValue', 'isFilterShow'].includes(item.keyName)
        );
    }
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
            :def="form"
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
