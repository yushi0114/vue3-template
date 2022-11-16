<script lang="ts" setup>

</script>

<template>
  <Text class="i-texthoverable">
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
</style>
