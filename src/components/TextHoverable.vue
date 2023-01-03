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

<style lang="scss">
.i-texthoverable {
  cursor: pointer;

  &:hover {
    color: $color-primary;
  }
}

.i-texthoverable--disabled {
  pointer-events: none;

  &:hover {
    color: $text-color-disabled;
  }
}
</style>
