<script lang="ts" setup>

</script>

<template>
  <Text class="i-texthoverable" :class="[
    $attrs.color !== 'disabled' ? '' : 'i-texthoverable--' + $attrs.color,
  ]" v-bind="$attrs">
    <!-- -->
    <slot />
  </Text>
</template>

<style lang="postcss">
.i-texthoverable {
  @apply cursor-pointer;

  &:hover {
    color: var(--el-color-primary);
  }
}

.i-texthoverable--disabled {
  @apply pointer-events-none;

  &:hover {
    @apply text-$el-text-color-disabled;
  }
}
</style>
