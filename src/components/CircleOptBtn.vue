<script lang="ts" setup>
withDefaults(
    defineProps<{
        size?: 'sm' | 'md' | 'lg',
        disabled?: boolean
    }>(),
    {
        size: 'md',
        disabled: false
    }
);
</script>

<template>
    <FlexRow horizontal="center" class="i-circle-opt-btn" :class="[size, disabled && 'disabled']">
        <slot></slot>
    </FlexRow>
</template>

<style lang="scss">
.i-circle-opt-btn {
    cursor: pointer;
    border-radius: 9999px;
    color: $text-color-secondary;
    transition: .2s ease-in-out background, .2s ease-in-out color;

    &:hover {
        background: $color-primary;
        color: $color-white;
    }

    &.disabled {
        color: $text-color-placeholder;
        cursor: not-allowed;
    }

    &.disabled:hover {
        background: $color-info-light-3;
        color: $color-white;
    }

    &.md {
        width: 1.2rem;
        height: 1.2rem;
        font-size: 0.75rem;
    }

    &.lg {
        width: 1.5rem;
        height: 1.5rem;
        font-size: 1rem;
    }
}
</style>
