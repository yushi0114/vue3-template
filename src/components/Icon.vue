<script lang="ts" setup>
import { Icon } from '@iconify/vue';

withDefaults(
    defineProps<{
        name: string
    }>(),
    {
        name: 'ep-folder'
    }
);
</script>

<template>
    <Icon class="i-icon" :icon="name" />
</template>

<style lang="css">
.i-icon {
    --color: inherit;
    height: 1em;
    width: 1em;
    line-height: 1em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    fill: currentColor;
    color: var(--color);
    font-size: inherit;
}
</style>
