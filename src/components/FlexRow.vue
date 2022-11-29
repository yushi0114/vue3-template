<script lang="ts" setup>
withDefaults(
    defineProps<{
        vertical?: 'start' | 'center' | 'end' | 'stretch',
        horizontal?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
        gap?: 'none' | 'line' | 'xs' | 'sm' | 'md' | 'lg'
    }>(),
    {
        horizontal: 'start',
        vertical: 'center',
    }
);


</script>
<template>
    <div class="i-flex-row" v-bind="$attrs" :class="[
        'i-flex-row-vertical-' + vertical,
        'i-flex-row-horizontal-' + horizontal,
        'i-flex-row-gap-' + gap,
    ]">
        <slot />
    </div>
</template>
<style lang="postcss">
.i-flex-row {
    @apply flex;
}

.i-flex-row-vertical-center {
    @apply items-center;
}

.i-flex-row-vertical-start {
    @apply items-start;
}

.i-flex-row-vertical-end {
    @apply items-end;
}

.i-flex-row-vertical-stretch {
    @apply items-stretch;
}

.i-flex-row-horizontal-start {
    @apply justify-start;
}

.i-flex-row-horizontal-center {
    @apply justify-center;
}

.i-flex-row-horizontal-end {
    @apply justify-end;
}

.i-flex-row-horizontal-between {
    @apply justify-between;
}

.i-flex-row-horizontal-around {
    @apply justify-around;
}

.i-flex-row-horizontal-evenly {
    @apply justify-evenly;
}

.i-flex-row-gap-line {
    gap: 2px;
}
.i-flex-row-gap-xs {
    @apply gap-2;
}
.i-flex-row-gap-sm {
    @apply gap-3
}
.i-flex-row-gap-md {
    @apply gap-4
}
.i-flex-row-gap-lg {
    @apply gap-5
}

.i-flex-row-gap-xl {
    @apply gap-6
}
</style>
