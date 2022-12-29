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
        <div class="i-step-line" ariaidden="true"></div>
        <div class="i-step-content">
            <slot />
        </div>
    </div>

</template>
<style lang="postcss">
.i-step {
    position: relative;
    flex: 1;
}

.i-step-default {
    color: var(--el-border-color);
}

.i-step-danger {
    color: var(--el-color-danger);
}
.i-step-success {
    color: var(--el-color-success);
}

.i-step-align-end.i-step {
    flex: none;
}

.i-step-align-end.i-step-horizontal {
    width: 1.25rem;
}

.i-step-align-end.i-step-vertical {
    height: 1.5rem;
}

.i-step:first-of-type .i-step-line {
    display: none;
}

.i-step-line {
    position: absolute; background-color: currentColor;
}


.i-step-horizontal .i-step-line {

    left: 0; top: 0.625rem; width: 100%; height: 0.125rem; margin-top: -1px;
}

.i-step-vertical .i-step-line {
    left: 0.75rem; bottom: calc(100% - 1rem); height: 100%; width: 0.125rem; margin-left: -1px;
    align-self: flex-start;
}

.i-step-circle {
    position: absolute; border-radius: 9999px; z-index: 10; overflow: hidden; cursor: default;
}

.i-step-vertical .i-step-circle {
    left: 0.125rem; top: 0.375rem;
}

.i-step-horizontal .i-step-circle {
    left: 0; top: 0;
}


.i-step-circle-uncheck {
    width: 1rem;
    height: 1rem;
    color: currentColor;
    border: 2px solid currentColor;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--deep-bg-color);
}


.i-step-circle-check {
    width: 1rem;
    height: 1rem;
    fill: currentColor;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.i-step-check-icon {
    width: 1rem;
    height: 1rem;
    color: currentColor;
    border: 2px solid currentColor;
    border-radius: 50%;
    background-color: var(--deep-bg-color);
}


.i-step-horizontal .i-step-content {
    padding-top: 2.25rem;
    padding-left: 0.5rem;
}

.i-step-vertical .i-step-content {
    padding-left: 2.25rem;
}
</style>
