<script lang="ts" name="i-step" setup>
withDefaults(
    defineProps<{
        direction?: 'horizontal' | 'vertical',
        success?: boolean,
        type?: 'default' | 'danger' | 'success'
        error?: boolean
        step?: number | string,
        size?: 'sm' | 'md' | 'lg',
        alignEnd?: boolean,
    }>(),
    {
        direction: 'horizontal',
        type: 'default',
        size: 'md',
        alignEnd: false,
    }
);


</script>
<template>
    <div class="i-step" :class="[
        'i-step-' + direction,
        'i-step-' + size,
        `i-step-${type}`,
        alignEnd ? 'i-step-align-end' : '',
    ]" v-bind="$attrs">
        <div class="i-step-line" ariaidden="true"></div>
        <div class="i-step-circle">
            <div v-if="type === 'success'">
                <div v-if="step" class="i-step-circle-check">{{ step }}</div>
                <i-ep-check class="i-step-check-icon" v-else />
            </div>
            <div v-else-if="type === 'danger'">
                <div v-if="step" class="i-step-circle-check">{{ step }}</div>
                <i-ep-close class="i-step-check-icon" v-else />
            </div>
            <div v-else class="i-step-circle-uncheck">
                <span>{{ step }}</span>
            </div>
        </div>
        <div class="i-step-content">
            <slot />
        </div>
    </div>

</template>
<style lang="postcss">
.i-step {
    @apply relative flex-1;
}

.i-step-default {
    @apply text-gray-400;
}

.i-step-danger {
    color: var(--el-color-danger);
}
.i-step-success {
    color: var(--el-color-success);
}

.i-step-align-end.i-step {
    @apply flex-none;
}

.i-step-align-end.i-step-horizontal {
    @apply w-5;
}

.i-step-align-end.i-step-vertical {
    @apply h-6;
}

.i-step:last-of-type .i-step-line {
    @apply hidden;
}


.i-step-success {
    & .i-step-line {
        @apply text-current;
    }
}

.i-step-line {
    @apply absolute bg-gray-200;
}


.i-step-horizontal .i-step-line {
    @apply left-0 top-2.5 w-full h-0.5 -mt-px;
}

.i-step-vertical .i-step-line {
    @apply left-3 top-1 h-full w-0.5 -ml-px self-start;
}

.i-step-circle {
    @apply absolute rounded-full overflow-hidden cursor-default;
}

.i-step-vertical .i-step-circle {
    @apply left-0 top-1;
}

.i-step-horizontal .i-step-circle {
    @apply left-0 top-0;
}


.i-step-circle-uncheck {
    @apply w-5 h-5 bg-white text-current border-2 border-current rounded-full overflow-hidden flex justify-center items-center text-xs font-semibold;
}

.dark .i-step-circle-uncheck {
    @apply bg-gray-600 border-gray-400 text-gray-200;
}

.i-step-circle-check {
    @apply w-5 h-5 fill-current text-white bg-indigo-500 flex justify-center items-center text-xs font-semibold;
}

.i-step-check-icon {
    @apply w-5 h-5 text-current rounded-full border-2 border-current;

    background-color: var(--deep-bg-color);
}


.i-step-horizontal .i-step-content {
    @apply pt-9 pl-2;
}

.i-step-vertical .i-step-content {
    @apply pl-9;
}
</style>
