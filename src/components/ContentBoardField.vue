<script lang="ts" setup>
withDefaults(
    defineProps<{
        label: string,
    }>(),
    {
        label: '',
    }
);
</script>

<template>
    <div class="i-content-board-field">
        <!-- -->
        <div class="icbf-label">
            <Text color="secondary" size="sm">{{ label }}:</Text>
        </div>
        <div class="icbf-content">
            <Text color="paragraph" size="sm"><slot></slot></Text>
        </div>
    </div>
</template>

<style lang="scss">
.i-content-board-field {
    display: flex;
    align-items: center;
}

.icbf-label {
    margin-right: $gap-xs;
}
</style>
