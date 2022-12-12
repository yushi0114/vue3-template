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
<style lang="scss">
.i-flex-column {
    display: flex;
    flex-direction: column;
}

.i-flex-column-horizontal-center {
    align-items: center;
}

.i-flex-column-horizontal-start {
    align-items: flex-start;
}

.i-flex-column-horizontal-end {
    align-items: flex-end;
}

.i-flex-column-vertical-start {
    justify-content: flex-start;
}

.i-flex-column-vertical-center {
    justify-content: center;
}

.i-flex-column-vertical-end {
    justify-content: flex-end;
}

.i-flex-column-vertical-between {
    justify-content: space-between;
}

.i-flex-column-vertical-around {
    justify-content: space-around;
}

.i-flex-column-vertical-evenly {
    justify-content: space-evenly;
}
</style>
