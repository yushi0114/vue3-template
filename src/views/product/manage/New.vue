<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <PagePanel class="product-manage-new">
    <Board full>
      <PlatformTab />
      <!--  -->
        新建产品

    platform: {{ route.params.type }}
    self: {{ route.params.p }}
    </Board>
  </PagePanel>
</template>

<style lang="postcss">
.product-manage-new {
  @apply;
}
</style>
