<script lang="ts" setup>

withDefaults(
    defineProps<{
        disabled?: boolean,
        variables?: any
    }>(),
    {
        variables: () => ({})
    }
);
</script>

<template>
    <div class="i-list-item" :class="{ disabled }">
        <!-- -->
        <slot v-bind="variables" />
    </div>
</template>

<style lang="scss">
.i-list-item {
    position: relative;
    border-bottom: var(--el-border);
    padding: $gap-md;
    &:hover {
        background-color: var(--el-color-info-light-9);
    }

    &.disabled {
        opacity: 0.6;
    }
}
</style>
