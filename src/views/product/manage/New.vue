<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <div class="product-manage-new">
    <!--  -->
    新建产品

    platform: {{ route.params.type }}
    self: {{ route.params.p }}
  </div>
</template>

<style lang="postcss">
.product-manage-new {
  @apply;
}
</style>
