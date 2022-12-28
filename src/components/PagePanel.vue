<script lang="ts" setup>
withDefaults(
    defineProps<{ title?: string; full?: boolean }>(),
    {full: false}
);
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
        <div class="page-panel-content" :class="{'h-full': full}">
            <slot />
        </div>
    </Layout>
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
    flex: 1;
}
</style>
