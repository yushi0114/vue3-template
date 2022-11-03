<script lang="ts" setup>

withDefaults(
    defineProps<{ title: string }>(),
    { title: '' }
);


</script>
<template>
    <div class="i-card">
        <div class="i-card-title">{{ title }}</div>
        <slot />
    </div>
</template>
<style lang="postcss">
.i-card {
    @apply flex-1 p-2 bg-white rounded;
}

.i-card-title {
    @apply font-semibold text-2xl text-gray-800;
}
</style>
