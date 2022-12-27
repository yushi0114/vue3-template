<script lang="ts" setup>
import { useDark } from '@vueuse/core';
import { Moon, Sunny } from '@element-plus/icons-vue';

const isDark = useDark();
const props = withDefaults(
    defineProps<{
        modelValue: boolean,
    }>(),
    {
        modelValue: false
    }
);

const innerModel = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
});

const emit = defineEmits<{
    (e: 'update:modelValue', visible: boolean): void
}>();

function cancel() {
    emit('update:modelValue', false);
}
</script>

<template>
<MessageDialog
    title="修改主题"
    class="nav-user-update-name"
    v-model="innerModel"
    @close="cancel">
    <!-- -->
    <el-switch
        v-model="isDark"
        :active-icon="Moon"
        :inactive-icon="Sunny"
        inline-prompt
        style="--el-switch-on-color: var(--el-fill-color-dark); --el-switch-off-color: var(--el-color-info-light-3)"
    />
    <template #footer>
        <el-button type="primary" @click="cancel">关闭</el-button>
    </template>
</MessageDialog>
</template>

<style lang="postcss">
.nav-user-update-name {
  @apply;
}
</style>
