<script lang="ts" setup>
import type { DynamicNavEntity } from '@/types';

withDefaults(
    defineProps<{
        options: DynamicNavEntity[]
    }>(),
    { options: () => [] }
);
</script>

<template>
    <div class="sidebar">
        <!-- -->
        <ul>
            <li v-for="(opt, i) in options" :key="i">
                <div v-if="opt.children">{{ opt.name }}</div>
                <RouterLink v-else :to="opt.defaultPath || '/'">{{ opt.name }}</RouterLink>
                <ul v-if="opt.children">
                    <li v-for="(optChild, j) in opt.children" :key="j">
                        <RouterLink  :to="optChild.defaultPath || '/'">{{ optChild.name }}</RouterLink>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<style lang="postcss">
.sidebar {
    @apply w-40 bg-blue-gray-600;

    & li {
        @apply pl-2;
    }
}
</style>
