<script lang="ts" setup>
withDefaults(
    defineProps<{
        label: string,
        cols?: number,
        background?: boolean,
    }>(),
    {
        label: '',
        cols: 1,
        background: true,
    }
);
</script>

<template>
    <div class="i-content-board" :class="{ background }">
        <!-- -->
        <div class="icb-label">
            <Text color="paragraph" bold>{{ label }}</Text>
        </div>
        <div class="icb-content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
.i-content-board {
    padding: $gap-sm 0;
    &.background {
        background-color: var(--light-bg-color);
    }

    & + & {
        margin-top: $gap-md;
    }
}

.icb-label {
    border-left: 4px solid var(--el-color-primary);
    padding-left: $gap-sm;
    margin-bottom: $gap-xs;

}

.icb-content {
    padding: 0 $gap-md;
    display: grid;
    gap: $gap-xs;
    grid-template-columns: repeat(v-bind(cols), minmax(0,1fr));
}
</style>
