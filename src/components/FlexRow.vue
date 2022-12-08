<script lang="ts" setup>
withDefaults(
    defineProps<{
        vertical?: 'start' | 'center' | 'end' | 'stretch',
        horizontal?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
        gap?: 'none' | 'line' | 'xs' | 'sm' | 'md' | 'lg'
        full?: boolean
    }>(),
    {
        horizontal: 'start',
        vertical: 'center',
        full: false
    }
);
</script>
<template>
    <div class="i-flex-row" v-bind="$attrs" :class="[
        'i-flex-row-vertical-' + vertical,
        'i-flex-row-horizontal-' + horizontal,
        'i-flex-row-gap-' + gap,
        full ? 'i-flex-row-full' : '',
    ]">
        <slot></slot>
    </div>
</template>
<style lang="scss">
.i-flex-row {
    display: flex;
}

.i-flex-row-full {
    flex: 1; width: 100%;
}

.i-flex-row-vertical-center {
    align-items: center;
}

.i-flex-row-vertical-start {
    align-items: flex-start;
}

.i-flex-row-vertical-end {
    align-items: flex-end;
}

.i-flex-row-vertical-stretch {
    align-items: stretch;
}

.i-flex-row-horizontal-start {
    justify-content: flex-start;
}

.i-flex-row-horizontal-center {
    justify-content: center;
}

.i-flex-row-horizontal-end {
    justify-content: flex-end;
}

.i-flex-row-horizontal-between {
    justify-content: space-between;
}

.i-flex-row-horizontal-around {
    justify-content: space-around;
}

.i-flex-row-horizontal-evenly {
    justify-content: space-evenly;
}

.i-flex-row-gap-line {
    gap: $gap-line;
}
.i-flex-row-gap-xs {
    gap: $gap-xs;
}
.i-flex-row-gap-sm {
    gap: $gap-sm;
}
.i-flex-row-gap-md {
    gap: $gap-md;
}
.i-flex-row-gap-lg {
    gap: $gap-lg;
}

.i-flex-row-gap-xl {
    gap: $gap-xl;
}
</style>
