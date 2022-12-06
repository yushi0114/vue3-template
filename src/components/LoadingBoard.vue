<script lang="ts" setup>
withDefaults(
    defineProps<{
        loading: boolean,
        empty: boolean,
    }>(),
    {
        loading: false,
        empty: false,
    }
);
</script>

<template>
  <Layout class="loading-board">
    <!-- -->
    <div v-if="loading">loading</div>
    <div v-if="empty">
        empty
    </div>
    <Layout v-else>
        <slot></slot>
    </Layout>
  </Layout>
</template>

<style lang="scss">
.loading-board {
}
</style>
