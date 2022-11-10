<script lang="ts" setup>
import * as echarts from 'echarts';
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

const chartDomRef = ref<HTMLElement>();
let chartInstance: echarts.ECharts;

const options = {
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
};

const loadOptions = () => {
    options.xAxis.data = props.data.successRate.map(item => item.month);
    options.series[0].data = props.data.successRate.map(item => item.per);
    options.series[1].data = props.data.ezjfwSuccessRate.map(item => item.per);
    chartInstance.setOption(options, true);
};

const resizeHandler = () => {
    loadOptions();
    chartInstance.resize();
};

const initChart = () => {
    chartInstance = echarts.init(chartDomRef.value!);
    loadOptions();
    window.addEventListener('resize', resizeHandler);
};

onMounted(() => {
    initChart();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler);
    chartInstance.dispose();
});
</script>

<template>
    <el-card :body-style="{ padding: '20px 24px 28px' }" shadow="never">
        <div class="card-header">产品需求受理月成功率数据趋势</div>
        <div class="success-rate-label">当月成功率 (辽信通 / 市综服)</div>
        <div class="success-rate-value">
            {{ data.successRate[data.successRate.length - 1]?.per }}%
            /
            {{ data.ezjfwSuccessRate[data.ezjfwSuccessRate.length - 1]?.per }}%
        </div>
        <div class="chart-wrapper" ref="chartDomRef"></div>
    </el-card>
</template>

<style lang="scss" scoped>
.card-header {
    @include font(16px);
    margin-bottom: 16px;
    color: #1e1e1e;
    font-weight: bold;
}

.success-rate-label {
    @include font(12px);
    margin-bottom: 1px;
    color: #5e5e5e;
}

.success-rate-value {
    line-height: 38px;
    color: #1e1e1e;
    font-size: 24px;
}

.chart-wrapper {
    width: 100%;
    height: 209px;
}
</style>
