<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

withDefaults(
    defineProps<{ title?: string }>(),
    {}
);

const route = useRoute();

onMounted(() => {
    console.log('page permission', route.meta.permission);
});
</script>

<template>
  <Layout class="page-panel" v-bind="$attrs">
    <!-- -->
    <header class="page-panel-header" v-if="title">
        <Title>{{ title }}</Title>
        <div class="page-panel-header__rest">
            <button>delete</button>
            <button>edit</button>
            <button>edit</button>
        </div>
    </header>
    <Layout class="page-panel-content">
        <slot />
    </Layout>
  </Layout>
</template>

<style lang="postcss">
.page-panel {
  @apply flex-1 bg-green;
}

.page-panel-header {
  @apply flex mb-2;
}

.page-panel-header__rest {
    @apply flex-1 flex justify-end;
}


</style>
