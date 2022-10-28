<script lang="ts" setup>
withDefaults(
    defineProps<{ title?: string }>(),
    {}
);
</script>

<template>
  <div class="page-panel" v-bind="$attrs">
    <!-- -->
    <header class="page-panel-header" v-if="title">
        <div>{{ title }}</div>
    </header>
    <div class="page-panel-content">
        <slot />
    </div>
  </div>
</template>

<style lang="postcss">
.page-panel {
  @apply bg-white rounded p-4;
}
</style>
