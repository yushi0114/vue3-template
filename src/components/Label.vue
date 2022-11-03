<script lang="ts" setup>
import Text from './Text.vue';

const props = withDefaults(
    defineProps<{
        required?: boolean,
        for?: string
    }>(), {
        required: false,
    }
);

</script>
<template>
    <div v-bind="$attrs" class="i-label">
        <span class="i-label-header">
            <span class="i-label-name">
                <label :for="props.for">
                    <Text size="sm">
                        <slot />
                    </Text>
                </label>
                <span class="i-label-required" v-if="required">*</span>
            </span>
            <!-- <ITooltip v-if="tooltip" class="ml-2" bg="dark" size="md">
                <div class="text-sm text-gray-200">
                    {{ tooltip }}
                </div>
            </ITooltip> -->
        </span>
    </div>
</template>
<style lang="postcss">
.i-label {}

.i-label-header {
    @apply block text-sm font-medium mb-1 flex;
}

.i-label-name {
    @apply flex-1;
}

.i-label-required {
    @apply text-red-500 ml-1;
}
</style>
