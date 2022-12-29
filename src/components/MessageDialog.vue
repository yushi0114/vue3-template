<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        modelValue: boolean,
        confirmButtonText?: string,
        cancelButtonText?: string,
        autoFocus?: boolean,
        showFooter?: boolean,
    }>(),
    {
        modelValue: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        autoFocus: true,
        showFooter: true
    }
);

defineExpose({
    cancel: handleCancel
});

const emit = defineEmits<{
    (e: 'update:modelValue', visible: boolean): void,
    (e: 'confirm'): void,
}>();

const innerModel = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
});

const bodyRef = ref<HTMLDivElement>();

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
    emit('update:modelValue', false);
}
</script>

<template>
    <el-dialog
        v-bind="$attrs"
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
        <template v-slot:footer v-if="showFooter">
            <slot name="footer">
                <FlexRow horizontal="center">
                    <el-button @click="handleCancel">{{ cancelButtonText }}</el-button>
                    <el-button @click="emit('confirm')" type="primary">{{ confirmButtonText }}</el-button>
                </FlexRow>
            </slot>
        </template>
    </el-dialog>
</template>

<style lang="scss">
.message-dialog {
    max-width: 650px;
    border-radius: 4px !important;
    .el-dialog__body {
        padding-top: $gap-sm;
    }
}
</style>
