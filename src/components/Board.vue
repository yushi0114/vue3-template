<script lang="ts" setup>

withDefaults(
    defineProps<{
        title?: string
        bordered?: boolean
        full?: boolean
        focusFull?: boolean
    }>(),
    { title: '', bordered: false, full: false, focusFull: false }
);


</script>
<template>
    <div class="i-board" :class="{ bordered, full, 'focus-full': focusFull }" v-bind="$attrs">
        <Text class="i-board-title" v-if="title" size="xl" bold>{{ title }}</Text>
        <slot />
    </div>
</template>
<style lang="scss">
.i-board {
    border-radius: 4px;
    box-sizing: border-box;
    background-color: var(--deep-bg-color);
    border-color: var(--el-border-color-light);
    padding: $gap-md;
    display: flex;
    flex-direction: column;

    &.bordered {
        border-width: 1px;
        border-style: solid;
    }

    &.full {
        min-height: 100%;
        flex: 1;
    }

    &.focus-full {
        height: 100%;
        max-height: 100%;
        overflow-y: auto;
        flex: 1;
    }
}

.i-board-title {
}
</style>
