<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        modelValue: boolean,
        confirmButtonText?: string,
        cancelButtonText?: string,
        autoFocus?: boolean,
    }>(),
    {
        modelValue: false,
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
</script>

<template>
    <el-dialog
        v-model="modelValue"
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
                    <el-button @click="emit('update:modelValue', false)">{{ cancelButtonText }}</el-button>
                    <el-button @click="emit('confirm')" type="primary">{{ confirmButtonText }}</el-button>
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
