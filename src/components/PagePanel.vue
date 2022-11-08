<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

withDefaults(
    defineProps<{ title?: string }>(),
    {}
);

const route = useRoute();

onMounted(() => {
    route;
    // console.log('page permission', route.meta.permission);
});
</script>

<template>
    <div class="page-panel" v-bind="$attrs">
        <!-- -->
        <header class="page-panel-header" v-if="title">
            <Title>{{ title }}</Title>
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

<style lang="scss">
.page-panel {
    box-sizing: border-box;
    padding: $gap-lg;
    min-height: calc(100vh - $nav-height);
}

.page-panel-header {
    display: flex;
    padding-bottom: $gap-lg;
}

.page-panel-header__rest {
    flex: 1;
    display: flex;
    justify-content: flex-end;
}

.page-panel-content {
    box-sizing: border-box;
}
</style>
