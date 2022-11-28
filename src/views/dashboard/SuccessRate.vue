<script lang="ts" setup>
import Charts from './Charts.vue';
import type { SuccessRateEntity } from '@/types/dashboard';

const props = withDefaults(
    defineProps<{
        data: {
            reqSuccessRate: SuccessRateEntity[],
            reqEzjfwSuccessRate: SuccessRateEntity[]
        }
    }>(),
    {
        data: () => ({
            reqSuccessRate: [] as SuccessRateEntity[],
            reqEzjfwSuccessRate: [] as SuccessRateEntity[]
        })
    }
);

watch(
    () => props.data,
    () => {
        loadOptions();
    },
    { deep: true }
);

const options = ref({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        valueFormatter: (value: any) => value + '%'
    },
    grid: {
        top: 20,
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: true
    },
    color: ['#6fa1ff', '#91cc75'],
    xAxis: {
        type: 'category',
        axisLabel: {
            interval: 0,
            rotate: 30
        },
        axisTick: {
            alignWithLabel: true
        },
        data: [] as string[]
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}%'
        }
    },
    series: [
        {
            name: '辽信通',
            type: 'bar',
            data: [] as number[]
        },
        {
            name: '市综服',
            type: 'bar',
            data: [] as number[]
        }
    ]
});

const loadOptions = () => {
    options.value.xAxis.data = props.data.reqSuccessRate.map(item => item.month);
    options.value.series[0].data = props.data.reqSuccessRate.map(item => item.per);
    options.value.series[1].data = props.data.reqEzjfwSuccessRate.map(item => item.per);
};

</script>

<template>
    <Board :style="{ padding: '20px 24px 28px' }">
        <div class="card-header">
            <Text color="paragraph" bold size="md">需求受理月成功率数据趋势</Text>
        </div>
        <div class="success-rate-label">
            <Text color="secondary" size="xs">当月成功率 (辽信通 / 市综服)</Text>
        </div>
        <div class="success-rate-value">
            <Text color="paragraph" size="xl">
                {{ data.reqSuccessRate[data.reqSuccessRate.length - 1]?.per }}%
                /
                {{ data.reqEzjfwSuccessRate[data.reqEzjfwSuccessRate.length - 1]?.per }}%
            </Text>
        </div>
        <Charts :options="options" :height="209" />
    </Board>
</template>

<style lang="scss" scoped>
.card-header {
    margin-bottom: 16px;
}

.success-rate-label {
    margin-bottom: 1px;
}

.success-rate-value {
    line-height: 38px;
}
</style>
