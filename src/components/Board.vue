<script lang="ts" setup>

withDefaults(
    defineProps<{
        title?: string
        bordered?: boolean
    }>(),
    { title: '', bordered: false }
);


</script>
<template>
    <div class="i-board" :class="{ bordered }" v-bind="$attrs">
        <div class="i-board-title" v-if="title">{{ title }}</div>
        <slot />
    </div>
</template>
<style lang="postcss">
.i-board {
    @apply flex-1 p-2 rounded border-box;
    background-color: var(--deep-bg-color);
    border-color: var(--el-border-color-light);

    &.bordered {
        border-width: 1px;
        border-style: solid;
    }
}

.i-board-title {
    @apply font-semibold text-2xl;
}
</style>
