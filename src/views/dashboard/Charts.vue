<script lang="ts" setup>
import * as echarts from 'echarts';
import { useSidebar } from '@/composables';

const { expand } = useSidebar();

watch(
    expand,
    () => {
        setTimeout(() => {
            resizeHandler();
        }, 200);
    }
);

const props = withDefaults(
    defineProps<{
        options: {},
        height: number,
        notMerge?: boolean
    }>(),
    {
        options: () => ({}),
        height: 300,
        notMerge: true
    }
);

watch(
    () => props.options,
    () => {
        chartInstance.setOption(props.options, props.notMerge);
    },
    { deep: true }
);

let chartInstance: echarts.ECharts;
const chartDomRef = ref<HTMLElement>();

const resizeHandler = () => {
    chartInstance.resize();
};

const initChart = () => {
    chartInstance = echarts.init(chartDomRef.value!);
    chartInstance.setOption(props.options, props.notMerge);
    window.addEventListener('resize', resizeHandler);
};

const emit = defineEmits(['chart-mousemove', 'chart-mouseout']);

const initChartEvent = () => {
    cancelChartEvent();
    chartInstance.on('mousemove', (params) => {
        emit('chart-mousemove', params);
    });
    chartInstance.on('mouseout', (params) => {
        emit('chart-mouseout', params);
    });
};

const cancelChartEvent = () => {
    chartInstance.off('mousemove');
    chartInstance.off('mouseout');
};

onMounted(() => {
    initChart();
    initChartEvent();
});

onBeforeUnmount(() => {
    cancelChartEvent();
    window.removeEventListener('resize', resizeHandler);
    chartInstance.dispose();
});
</script>

<template>
    <div ref="chartDomRef" :style="{width: '100%', height: height + 'px'}"></div>
</template>
