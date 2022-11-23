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
            <slot name="label-rest"></slot>
        </div>
        <div class="icb-content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
.i-content-board {
    padding: $gap-sm 0;
    display: flex;
    flex-direction: column;
    &.background {
        background-color: var(--light-bg-color);
    }

    & + & {
        margin-top: $gap-md;
    }
}

.icb-label {
    border-left: 4px solid var(--el-color-primary);
    padding: 0 $gap-sm;
    margin-bottom: $gap-xs;
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.icb-content {
    flex: 1;
    padding: 0 $gap-md;
    display: grid;
    gap: $gap-xs;
    grid-template-columns: repeat(v-bind(cols), minmax(0,1fr));
}
</style>
