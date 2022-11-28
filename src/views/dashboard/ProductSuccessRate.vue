<script lang="ts" setup>
import Charts from './Charts.vue';
import type { SuccessRateEntity } from '@/types/dashboard';

const props = withDefaults(
    defineProps<{
        data: {
            successRate: SuccessRateEntity[],
            ezjfwSuccessRate: SuccessRateEntity[]
        }
    }>(),
    {
        data: () => ({
            successRate: [] as SuccessRateEntity[],
            ezjfwSuccessRate: [] as SuccessRateEntity[]
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
            type: 'line',
            data: [] as number[]
        },
        {
            name: '市综服',
            type: 'line',
            data: [] as number[]
        }
    ]
});

const loadOptions = () => {
    options.value.xAxis.data = props.data.successRate.map(item => item.month);
    options.value.series[0].data = props.data.successRate.map(item => item.per);
    options.value.series[1].data = props.data.ezjfwSuccessRate.map(item => item.per);
};
</script>

<template>
    <Board :style="{ padding: '20px 24px 24px' }">
        <div class="card-header">
            <Text color="paragraph" bold size="md">产品需求受理月成功率数据趋势</Text>
        </div>
        <Charts :options="options" :height="172" />
    </Board>
    <div class="success-rate-wrapper">
        <div class="success-rate-label">当月成功率 (辽信通 / 市综服)</div>
        <div class="success-rate-value">
            {{ data.successRate[data.successRate.length - 1]?.per }}%
            /
            {{ data.ezjfwSuccessRate[data.ezjfwSuccessRate.length - 1]?.per }}%
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card-header {
    margin-bottom: 12px;
}

.success-rate-wrapper {
    margin-top: 24px;
    padding: 11.5px 24px;
    box-sizing: border-box;
    width: 100%;
    height: 80px;
    background: linear-gradient(rgb(58, 149, 255) 0%, rgb(27, 92, 255) 100%);
    border-radius: 4px;

    .success-rate-label {
        @include font(12px);
        margin-bottom: 1px;
        color: #fff;
    }

    .success-rate-value {
        line-height: 38px;
        color: #fff;
        font-size: 24px;
    }
}
</style>
