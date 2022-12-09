<script lang="ts" setup>

</script>

<template>
  <div class="i-list" v-bind="$attrs">
    <slot />
  </div>
</template>

<style lang="postcss">
.i-list {
  @apply;
}
</style>
