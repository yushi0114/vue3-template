<script lang="ts" setup>

withDefaults(
    defineProps<{
        label?: string,
        progress?: number,
        status?: string
    }>(),
    {
        progress: 0,
        status: 'warning'
    }
);

function format() {
    return '';
}
</script>
<template>
    <div class="list-progress">
        <Text size="xs" color="regular" v-if="label">{{ label }}:</Text>
        <el-progress class="list-progress-inner" :percentage="progress" :status="status" :format="format" />
        <Text size="xs" :color="status as any || 'primary'" class="list-progress-desc">
            <slot />
        </Text>
    </div>
</template>

<style lang="scss">
.list-progress {
    width: 100%;
    max-width: 300px;
    flex: 1;
    display: flex;
    align-items: center;
}

.list-progress-inner {
    flex: 1;
    margin: 0 $gap-xs;

    & .el-progress__text {
        min-width: 10px;
    }
}

.list-progress-desc {
    width: 0;
    white-space: nowrap;
}
</style>
