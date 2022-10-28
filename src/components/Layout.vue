<script lang="ts" setup>
withDefaults(
    defineProps<{ type?: 'vertical' | 'horizontal' }>(),
    { type: 'vertical' }
);

</script>
<template>
    <div class="i-layout" v-bind="$attrs" :class="['i-layout-' + type]">
        <slot />
    </div>
</template>
<style lang="postcss">
.i-layout {
    @apply h-full flex-1 flex overflow-auto;
}

.i-layout-vertical {
    @apply flex-col;
}

.i-layout-horizontal {
    @apply flex-row;
}
</style>
