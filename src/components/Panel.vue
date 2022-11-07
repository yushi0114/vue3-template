<script lang="ts" setup>
defineProps<{
    title?: string
}>();

</script>

<template>
    <!-- -->
    <Board class="i-panel">
        <div class="i-panel-header">
            <Title level="3">{{ title }}</Title>
            <slot name="panel-header-rest">
            </slot>
        </div>
        <div class="i-panel-container">
            <slot></slot>
        </div>
    </Board>
</template>

<style lang="postcss">
.i-panel {
  @apply;
}
</style>
