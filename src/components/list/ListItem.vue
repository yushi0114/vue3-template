<script lang="ts" setup>

</script>

<template>
    <div class="i-list-item">
        <!-- -->
        <slot />
    </div>
</template>

<style lang="scss">
.i-list-item {
    border-bottom: var(--el-border);
    padding: $gap-md;
    &:hover {
        background-color: var(--el-color-info-light-9);
    }
}
</style>
