<script lang="ts" setup>
import { Clock } from '@element-plus/icons-vue';
import { PROCESS_BAR_STATUS } from '@/enums';

const props = withDefaults(
    defineProps<{
        label?: string,
        progress?: number,
        status?: PROCESS_BAR_STATUS;
        hasIcon?: boolean,
    }>(),
    {
        progress: 0,
        status: PROCESS_BAR_STATUS.WARNING,
        hasIcon: true
    }
);

function format() {
    return '';
}

const percentage = computed(() => {
    const p = Number(props.progress);
    return isNaN(p) ? 0 : p;
});
</script>
<template>
    <div class="list-progress">
        <Text size="xs" color="regular" v-if="label">{{ label }}:</Text>
        <FlexRow class="list-progress-inner">
            <el-progress class="flex-1" :show-text="!!status" :percentage="percentage" :status="(status as any)" :format="format" />
            <el-icon style="margin-left:5px;" color="var(--el-color-primary)" v-if="hasIcon && status === PROCESS_BAR_STATUS.NORMAL">
                <Clock />
            </el-icon>
        </FlexRow>
        <Text size="xs" :color="status as any || 'primary'" class="list-progress-desc">
            <slot></slot>
        </Text>
    </div>
</template>

<style lang="scss">
.list-progress {
    width: 100%;
    max-width: 35%;
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
