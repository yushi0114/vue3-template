<script lang="ts" setup>
import { useDark } from '@vueuse/core';
import type { Placement } from 'element-plus';

export type TextColor = 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'exception' | 'error' |
        'paragraph' | 'regular' | 'secondary' | 'placeholder' | 'disbled' |
        'current';

export interface ITextProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'current',
    align?: 'left' | 'center' | 'right' | 'justify',
    color?: TextColor,
    italic?: boolean,
    truncate?: boolean,
    block?: boolean,
    bold?: boolean,
    uppercase?: boolean,
    underline?: boolean,
    content?: string;
    placement?: Placement;
}
const isDark = useDark();

const text = ref<HTMLElement | null>();

const props = withDefaults(
    defineProps<ITextProps>(),
    {
        size: 'md',
        align: 'left',
        color: 'current',
        italic: false,
        truncate: false,
        block: false,
        bold: false,
        uppercase: false,
        underline: false,
        content: '',
        placement: 'top'
    }
);

const effect = computed(() => {
    return isDark ? 'dark' : 'light';
});

const isDisabledTooltip = ref(true);

const onMouseEnter = () => {
    const clientWidth = text?.value?.clientWidth ?? 0;

    const scrollWidth = text?.value?.scrollWidth ?? 0;
    if (clientWidth && scrollWidth) {
        isDisabledTooltip.value = (clientWidth >= scrollWidth);
    }
};

</script>
<template>
    <el-tooltip
        popper-class="sjc-tooltip"
        :effect="effect"
        :disabled="isDisabledTooltip"
        :placement="placement"
    >
            <template #content>
                <slot name="content">
                    <template v-if="content">
                        {{ content }}
                    </template>
                    <slot v-else />
                </slot>
            </template>
            <span class="i-text" v-bind="$attrs" :class="[
                props.italic ? 'i-text-italic' : '',
                props.truncate ? 'i-text-truncate' : '',
                props.block ? 'i-text-block' : '',
                props.uppercase ? 'i-text-uppercase' : '',
                props.underline ? 'i-text-underline' : '',
                props.bold ? 'i-text-bold' : '',
                'i-text-' + props.align,
                props.size === 'current' ? '' : 'i-text-' + props.size,
                props.color === 'current' ? '' : 'i-text-color-' + props.color,
            ]"
            ref="text"
            @mouseover="onMouseEnter"
            >
                <slot />
            </span>
        </el-tooltip>
</template>
<style lang="postcss">
.sjc-tooltip {
    @apply max-w-50%;
}
.i-text {
    @apply inline text-current;
}

.i-text-underline {
    @apply underline;
}

.i-text.i-text-block {
    @apply block;
}

.i-text.i-text-bold {
    @apply font-bold;
}

.i-text-italic {
    @apply italic;
}

.i-text-center {
    @apply text-center;
}

.i-text-right {
    @apply text-right;
}

.i-text-justify {
    @apply text-justify;
}


.i-text-truncate {
    @apply truncate;
}

.i-text-uppercase {
    @apply uppercase;
}

.i-text-xs {
    font-size: 0.75rem;
    line-height: 1.125rem;
}

.i-text-sm {
    font-size: 0.875rem;
    line-height: 1.375rem;
}

.i-text-md {
    font-size: 1rem;
    line-height: 1.5rem;
}


.i-text-lg {
    font-size: 1.25rem;
    line-height: 1.75rem;
}

.i-text-xl {
    font-size: 1.5rem;
    line-height: 2rem;
}

.i-text-color-primary {
    color: var(--el-color-primary);
}
.i-text-color-exception,
.i-text-color-error,
.i-text-color-danger {
    color: var(--el-color-danger);
}
.i-text-color-success {
    color: var(--el-color-success);
}
.i-text-color-warning {
    color: var(--el-color-warning);
}

.i-text-color-info {
    color: var(--el-color-info);
}

.i-text-color-paragraph {
    color: var(--el-text-color-primary);
}

.i-text-color-regular {
    color: var(--el-text-color-regular);
}

.i-text-color-secondary {
    color: var(--el-text-color-secondary);
}

.i-text-color-placeholder {
    color: var(--el-text-color-placeholder);
}

.i-text-color-disbled {
    color: var(--el-text-color-disbled);
}
</style>
