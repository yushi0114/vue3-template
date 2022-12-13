<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        label?: string,
        type?: 'normal' | 'desc',
        hoverable?: boolean,
    }>(),
    {
        type: 'normal'
    }
);

const color = computed(() => {
    return props.type === 'normal' ? 'paragraph' : 'regular';
});
const size = computed(() => {
    return props.type === 'normal' ? 'sm' : 'xs';
});
</script>

<template>
    <Text
        v-bind="$attrs"
        class="list-field"
        :class="{ hoverable }"
        :color="color"
        :size="size"
    >
        <!-- -->
        <span v-if="label">
            {{ label }}:
        </span>
        <slot></slot>
    </Text>
</template>

<style lang="scss">
.list-field {
    &.hoverable {
        cursor: pointer;
        &:hover {
            color: var(--el-color-primary);
        }
    }
}
</style>
