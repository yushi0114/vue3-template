<script lang="ts" setup>
import { isDefined } from '@/utils';

const props = withDefaults(
    defineProps<{
        modelValue?: boolean,
        confirmButtonText?: string,
        cancelButtonText?: string,
        autoFocus?: boolean,
    }>(),
    {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        autoFocus: true
    }
);

const emit = defineEmits<{
    (e: 'update:modelValue', visible: boolean): void,
    (e: 'confirm'): void,
}>();

const bodyRef = ref<HTMLDivElement>();
const innerModel = ref(!!props.modelValue);

function handleOpened() {
    if (bodyRef.value && props.autoFocus) {
        const firstInputDom = bodyRef.value.querySelector('input');
        if (firstInputDom) {
            setTimeout(() => {
                firstInputDom.focus();
            }, 30);
        }
    }
}

function handleCancel() {
    if (isDefined(props.modelValue)) {
        emit('update:modelValue', false);
    }
    else {
        innerModel.value = false;
    }
}

function handleConfirm() {
    emit('confirm');
    if (isDefined(props.modelValue)) {
        //
    }
    else {
        innerModel.value = false;
    }
}

watch(() => props.modelValue, () => {
    innerModel.value = !!props.modelValue;
});
</script>

<template>
    <el-dialog
        v-model="innerModel"
        class="message-dialog"
        align-center
        @opened="handleOpened"
    >
        <template v-slot:header>
            <slot name="header"></slot>
        </template>
        <div class="dialog-body" ref="bodyRef">
            <slot />
        </div>
        <template v-slot:footer>
            <slot name="footer">
                <FlexRow horizontal="center">
                    <el-button @click="handleCancel">{{ cancelButtonText }}</el-button>
                    <el-button @click="handleConfirm" type="primary">{{ confirmButtonText }}</el-button>
                </FlexRow>
            </slot>
        </template>
    </el-dialog>
</template>

<style lang="scss">
.message-dialog {
    max-width: 480px;
    border-radius: 4px !important;
}
</style>
