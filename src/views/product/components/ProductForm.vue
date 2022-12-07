<script lang="ts" setup>
import { PlatformType } from '@/enums';
import { toRefs } from '@vueuse/core';
import { toFixed } from '@/utils';
import { useProductForm } from '../hooks/useProduct';
import { isArray, isString, omit } from 'lodash';

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

const { formValueChange, PRODUCT_FORM_ALL, dynamicForm } = useProductForm(propsRefs.platform, propsRefs.id);

const updateSubmit = ref(new Date().getTime());

const handleOk = () => {
    updateSubmit.value = new Date().getTime();
};

const handleCancel = () => {
    emits('close');
};

const handleSubmit = async(values: any) => {
    const params = values;
    if (Number(params.referenceRateStart) === Number(params.referenceRateEnd)) {
        params.referenceRate = toFixed(params.referenceRateEnd) + '%';
    } else {
        params.referenceRate = toFixed(params.referenceRateStart) + '%' + '-' + toFixed(params.referenceRateEnd) + '%';
    }

    let sortIdArr: any[] = [];
    dynamicForm.value.forEach((item) => {
        if (params[item.keyName] && isArray(params[item.keyName])) {
            sortIdArr = [...sortIdArr, ...params[item.keyName]];
        } else if (params[item.keyName] && isString(params[item.keyName])) {
            sortIdArr.push(params[item.keyName]);
        }
    });
    params.sortIdArr = sortIdArr;
    props.id && (params.id = props.id);
    params.platform = props.platform;
    omit(
        params,
        dynamicForm.value.map((item) => Number(item.keyName))
    );
    emits('submit', params);
};
</script>

<template>
    <div>
        <sjc-form
            :def="PRODUCT_FORM_ALL"
            :update-submit="updateSubmit"
            @change="formValueChange"
            @search="handleSubmit"></sjc-form>
        <slot name="footer">
            <FlexRow horizontal="center">
                <el-button @click="handleCancel">取消</el-button>
                <el-button
                    type="primary"
                    @click="handleOk"
                    >确定</el-button
                >
            </FlexRow>
        </slot>
    </div>
</template>

<style lang="postcss"></style>
