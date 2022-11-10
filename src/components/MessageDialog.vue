<script lang="ts" setup>
withDefaults(
    defineProps<{
        modelValue: boolean,
        confirmButtonText?: string
        cancelButtonText?: string
    }>(),
    {
        modelValue: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }
);

const emit = defineEmits<{
    (e: 'update:modelValue', visible: boolean): void,
    (e: 'confirm'): void,
}>();
</script>

<template>
    <el-dialog v-model="modelValue" class="message-dialog" align-center>
        <template v-slot:header>
            <slot name="header"></slot>
        </template>
        <slot />
        <template v-slot:footer>
            <slot name="footer">
                <el-button @click="emit('update:modelValue', false)">{{ cancelButtonText }}</el-button>
                <el-button @click="emit('confirm')" type="primary">{{ confirmButtonText }}</el-button>
            </slot>
        </template>
    </el-dialog>
</template>

<style lang="scss">
.message-dialog {
    max-width: 420px;
    border-radius: 4px;

    & .el-dialog__header,
    & .el-dialog__body {
        padding: 15px 15px 10px;
    }

    & .el-dialog__headerbtn {
        top: 0;
    }
}
</style>
