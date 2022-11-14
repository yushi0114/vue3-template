<script lang="ts" setup>
import * as echarts from 'echarts';
import type { ApplyCountEntity } from '@/types/dashboard';

const props = withDefaults(
    defineProps<{
        data: {
            countProduct: ApplyCountEntity[],
            countEzjfwProduct: ApplyCountEntity[]
        }
    }>(),
    {
        data: () => ({
            countProduct: [] as ApplyCountEntity[],
            countEzjfwProduct: [] as ApplyCountEntity[]
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

const activeName = ref('lxt');

const handleTabChange = () => {
    loadOptions();
};

const chartDomRef = ref<HTMLElement>();
let chartInstance: echarts.ECharts;

const options = {
    grid: {
        top: 0,
        left: 134,
        right: 40,
        bottom: 0
    },
    xAxis: {
        type: 'value',
        show: false
    },
    yAxis: {
        type: 'category',
        inverse: true,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            margin: 130,
            width: 110,
            align: 'left',
            overflow: 'truncate',
            formatter: function(value: any, index: number) {
                if (index === 0 || index === 1 || index === 2) {
                    return `{a|${index + 1}} {b|${value}}`;
                } else {
                    return `{c|${index + 1}} {d|${value}}`;
                }
            },
            rich: {
                a: {
                    color: '#fff',
                    fontFamily: 'sans-regular, "Microsoft YaHei", "黑体", sans-serif',
                    fontSize: 12,
                    lineHeight: 18,
                    backgroundColor: '#1e1e1e',
                    borderRadius: 10,
                    padding: [3, 5],
                    width: 8,
                    height: 12
                },
                b: {
                    color: '#1e1e1e',
                    fontFamily: 'sans-regular, "Microsoft YaHei", "黑体", sans-serif',
                    fontSize: 14,
                    lineHeight: 18,
                    padding: [0, 12]
                },
                c: {
                    color: '#fff',
                    fontFamily: 'sans-regular, "Microsoft YaHei", "黑体", sans-serif',
                    fontSize: 12,
                    lineHeight: 18,
                    backgroundColor: '#d9d9d9',
                    borderRadius: 10,
                    padding: [3, 5],
                    width: 8,
                    height: 12
                },
                d: {
                    color: '#5e5e5e',
                    fontFamily: 'sans-regular, "Microsoft YaHei", "黑体", sans-serif',
                    fontSize: 14,
                    lineHeight: 18,
                    padding: [0, 12]
                }
            }
        },
        data: [] as string[]
    },
    series: [
        {
            type: 'bar',
            barWidth: 10,
            zlevel: 2,
            itemStyle: {
                color: '#6fa1ff'
            },
            data: [] as number[]
        },
        {
            type: 'bar',
            barWidth: 10,
            barGap: '-100%',
            data: [] as any[],
            label: {
                show: true,
                distance: 20,
                color: '#5e5e5e',
                position: 'right',
                formatter: (params: any) => {
                    return params.data.realValue;
                }
            },
            itemStyle: {
                color: '#f2f4f9'
            },
            emphasis: {
                itemStyle: {
                    color: '#f2f4f9'
                }
            }
        }
    ]
};

const loadOptions = () => {
    const data = activeName.value === 'lxt' ? props.data.countProduct : props.data.countEzjfwProduct;
    options.yAxis.data = data.map(item => item.name);
    options.series[0].data = data.map(item => item.count);
    options.series[1].data = data.map(item => ({ realValue: item.count, value: data[0].count }));
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
    <el-card :body-style="{ padding: '20px 28px 40px' }" shadow="never">
        <div class="card-header">产品申请数量排行榜</div>
        <el-tabs v-model="activeName" @tab-change="handleTabChange">
            <el-tab-pane label="辽信通" name="lxt"></el-tab-pane>
            <el-tab-pane label="市综服" name="szf"></el-tab-pane>
        </el-tabs>
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

.chart-wrapper {
    width: 100%;
    height: 200px;
}
</style>