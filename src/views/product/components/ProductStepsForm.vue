<script lang="ts" setup>
import { PlatformType, PRODUCT_STEPS } from '@/enums';
import { toRefs, useStepper } from '@vueuse/core';
import { toFixed } from '@/utils';
import { useProductForm } from '../hooks/useProduct';
import { isArray, isString } from 'lodash';
import { PRODUCT_STEPS_MAP } from '../constants';

const { steps, index, current, isFirst, isLast, goToNext, goToPrevious } = useStepper(PRODUCT_STEPS_MAP);

const props = withDefaults(defineProps<{ platform: PlatformType; id?: string }>(), {
    platform: PlatformType.LiaoXinTong,
    id: '',
});
const emits = defineEmits<{
    // eslint-disable-next-line no-undef
    (e: 'submit', v: Recordable): void;
    (e: 'close'): void;
}>();

const propsRefs = toRefs(props);
// eslint-disable-next-line no-undef
const params = ref<Recordable>({});

const { formValueChange, PRODUCT_FORM, dynamicForm } = useProductForm(propsRefs.platform, propsRefs.id);

const handleOk = () => {
    if (isLast.value) {
        emits('close');
    } else {
        current.value.updateSubmit = new Date().getTime();
    }
};

const handleCancel = () => {
    if (!isFirst.value) {
        goToPrevious();
    } else {
        emits('close');
    }
};

const handleSubmitBaseInfo = (values: any) => {
    params.value = values;
    if (Number(params.value.referenceRateStart) === Number(params.value.referenceRateEnd)) {
        params.value.referenceRate = toFixed(params.value.referenceRateEnd) + '%';
    } else {
        params.value.referenceRate =
            toFixed(params.value.referenceRateStart) + '%' + '-' + toFixed(params.value.referenceRateEnd) + '%';
    }
    goToNext();
};
const handleSubmit = async (values: any) => {
    let sortIdArr: any[] = [];
    dynamicForm.value.forEach((item) => {
        if (values[item.keyName] && isArray(values[item.keyName])) {
            sortIdArr = [...sortIdArr, ...values[item.keyName]];
        } else if (values[item.keyName] && isString(values[item.keyName])) {
            sortIdArr.push(values[item.keyName]);
        }
    });
    params.value.sortIdArr = sortIdArr;
    props.id && (params.value.id = props.id);
    params.value.platform = props.platform;
    emits('submit', params.value);
};

defineExpose({
    goToNext,
});
</script>

<template>
    <div>
        <el-steps
            class="justify-center"
            align-center
            :space="200"
            :active="index"
            finish-status="success">
            <el-step
                v-for="step in steps"
                :key="step.title"
                :title="step.title" />
        </el-steps>
        <sjc-form
            v-show="index === 0"
            :def="PRODUCT_FORM"
            :update-submit="steps[PRODUCT_STEPS.BASE_INFO].updateSubmit"
            @change="formValueChange"
            @search="handleSubmitBaseInfo"></sjc-form>
        <sjc-form
            v-show="index === 1"
            :def="dynamicForm"
            :update-submit="steps[PRODUCT_STEPS.FILTERS].updateSubmit"
            @change="formValueChange"
            @search="handleSubmit"></sjc-form>
        <Text v-show="(index === 2)" color="success" align="center">发布成功（待做）</Text>
        <slot name="footer">
            <FlexRow horizontal="center">
                <el-button
                    v-if="current.leftBtnText"
                    @click="handleCancel"
                    >{{ current.leftBtnText }}</el-button
                >
                <el-button
                    type="primary"
                    @click="handleOk"
                    >{{ current.rightBtnText }}</el-button
                >
            </FlexRow>
        </slot>
    </div>
</template>

<style lang="postcss"></style>
