<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

withDefaults(
    defineProps<{ title?: string }>(),
    {}
);

const route = useRoute();

onMounted(() => {
    console.log('page', route.meta.permission);
});
</script>

<template>
  <div class="page-panel" v-bind="$attrs">
    <!-- -->
    <header class="page-panel-header" v-if="title">
        <div>{{ title }}</div>
        <div class="page-panel-header__rest">
            <button>delete</button>
            <button>edit</button>
            <button>edit</button>
        </div>
    </header>
    <div class="page-panel-content">
        <slot />
    </div>
  </div>
</template>

<style lang="postcss">
.page-panel {
  @apply bg-white rounded p-4 flex-1;
}

.page-panel-header {
  @apply border-b border-gray-600 flex;
}

.page-panel-header__rest {
    @apply flex-1 flex justify-end;
}


</style>
