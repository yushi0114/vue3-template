<script lang="ts" setup>
withDefaults(
    defineProps<{
        horizontal?: 'start' | 'center' | 'end',
        vertical?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
    }>(),
    {
        horizontal: 'center',
        vertical: 'start',
    }
);
</script>
<template>
    <div class="i-flex-column" v-bind="$attrs" :class="[
        'i-flex-column-vertical-' + vertical,
        'i-flex-column-horizontal-' + horizontal,
    ]">
        <slot />
    </div>
</template>
<style lang="postcss">
.i-flex-column {
    @apply flex flex-col;
}

.i-flex-column-horizontal-center {
    @apply items-center;
}

.i-flex-column-horizontal-start {
    @apply items-start;
}

.i-flex-column-horizontal-end {
    @apply items-end;
}

.i-flex-column-vertical-start {
    @apply justify-start;
}

.i-flex-column-vertical-center {
    @apply justify-center;
}

.i-flex-column-vertical-end {
    @apply justify-end;
}

.i-flex-column-vertical-between {
    @apply justify-between;
}

.i-flex-column-vertical-around {
    @apply justify-around;
}

.i-flex-column-vertical-evenly {
    @apply justify-evenly;
}
</style>
