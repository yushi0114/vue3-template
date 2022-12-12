<script lang="ts" setup>
withDefaults(
    defineProps<{ type?: 'vertical' | 'horizontal' }>(),
    { type: 'vertical' }
);

</script>
<template>
    <div class="i-layout" v-bind="$attrs" :class="['i-layout-' + type]">
        <slot></slot>
    </div>
</template>
<style lang="scss">
.i-layout {
    height: 100%;
    flex: 1;
    display: flex;
    overflow: auto;
}

.i-layout-vertical {
    flex-direction: column;
}

.i-layout-horizontal {
    flex-direction: row;
}
</style>
