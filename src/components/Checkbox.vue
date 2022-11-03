<script lang="ts" setup name="i-checkbox">
import { ref, watchEffect } from 'vue';
import { isBoolean, isDefind, isString } from '@/utils';
import type { PrimitiveType } from '@/types';

const emits = defineEmits<{
    (e: 'update:modelValue', v: any): void
}>();

const props = withDefaults(
    defineProps<{
        disabled?: boolean,
        modelValue?: PrimitiveType | PrimitiveType[]
        value?: PrimitiveType,
        checked?: boolean,
    }>(),
    {
        disabled: false,
        checked: undefined
    }
);

const _check = ref(props.checked || false);

watchEffect(() => {
    const mv: any = props.modelValue;
    let checkStatus = false;

    if (isBoolean(props.checked)) {
        checkStatus = props.checked as boolean;

    }
    else if (isDefind(mv)) {
        if (isBoolean(mv)) {
            checkStatus = mv;
        }
        else if (mv === props.value || mv?.findIndex?.((v: any) => v === props.value) >= 0) {
            checkStatus = true;
        }
    }

    if (_check.value !== checkStatus) _check.value = checkStatus;
});


function handleModelValueChange(e: any) {
    const modelValue: any = props.modelValue;

    if (isString(modelValue)) {

        const value = modelValue === e.target.value ? '' : e.target.value;
        emits('update:modelValue', value);
    }
    else if (isBoolean(modelValue)) {
        emits('update:modelValue', e.target.checked);
    }
    else if (modelValue.findIndex) {
        const newValue = modelValue.slice();
        const idx = newValue?.findIndex((v: any) => v === e.target.value);
        if (idx < 0) {
            newValue.push(e.target.value);

        }
        else {
            newValue.splice(idx, 1);
        }

        emits('update:modelValue', newValue);
    }
}
</script>
<template>
    <div class="i-checkbox" :class="[disabled ? 'i-checkbox-disabled' : '']">
        <label class="i-checkbox-label">
            <input
                v-bind="$attrs"
                @change="handleModelValueChange"
                class="i-checkbox-inner"
                type="checkbox"
                :value="value"
                :checked="_check"
                :disabled="disabled"
            />
            <span class="i-checkbox-text">
                <slot></slot>
            </span>
        </label>
    </div>
</template>
<style lang="postcss">
.i-checkbox {
    @apply inline-block;
}

.i-checkbox-disabled .i-checkbox-text {
    @apply text-gray-400 cursor-not-allowed;
}

.dark .i-checkbox-disabled .i-checkbox-text {
    @apply text-gray-500;
}

.dark .i-checkbox-text {
    @apply text-gray-200;
}

.i-checkbox-text {
    @apply text-gray-800 text-sm mx-2;
}

.i-checkbox-label {
    @apply flex items-center;
}

.i-checkbox-inner {
    @apply
        focus:ring-0
        w-4 h-4 box-border select-none
        text-sm text-gray-800 text-indigo-500
        border border-gray-300 outline-none outline-transparent
        bg-white rounded appearance-none
        disabled:text-gray-400 disabled:cursor-not-allowed;

    &:checked {
        @apply
            bg-indigo-500 border-none;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
    }
}

.dark .i-checkbox-inner {
    @apply disabled:text-gray-500 bg-opacity-20 disabled:bg-opacity-50;
}
</style>
