<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { TabPaneName } from 'element-plus';
import * as echarts from 'echarts';

const activeName = ref('lxt');

const chartDom = ref<HTMLElement>();
const chartInstance = ref<any>();
const options = {
    grid: {
        top: 20,
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
        data: ['政务e贷', '红星贷', '盛京兴科贷', '智慧快贷', '贴息贷']
    },
    series: [
        {
            type: 'bar',
            barWidth: 10,
            zlevel: 2,
            itemStyle: {
                color: '#6fa1ff'
            },
            data: [30, 28, 22, 16, 11]
        },
        {
            type: 'bar',
            barWidth: 10,
            barGap: '-100%',
            data: [
                { realValue: 30, value: 30 },
                { realValue: 28, value: 30 },
                { realValue: 22, value: 30 },
                { realValue: 16, value: 30 },
                { realValue: 11, value: 30 }
            ],
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
    chartInstance.value.setOption(options, true);
};

const resizeHandler = () => {
    loadOptions();
    chartInstance.value.resize();
};

const initChart = () => {
    chartInstance.value = echarts.init(chartDom.value!);
    loadOptions();
    window.addEventListener('resize', resizeHandler);
};

const handleTabChange = (name: TabPaneName) => {
    console.log(name);
    // options. =
    loadOptions();
};

onMounted(() => {
    initChart();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler);
    chartInstance.value.dispose();
});
</script>

<template>
    <el-card :body-style="{ padding: '20px 28px 40px' }" shadow="never">
        <div class="card-header">产品申请数量排行榜</div>
        <el-tabs v-model="activeName" @tab-change="handleTabChange">
            <el-tab-pane label="辽信通" name="lxt"></el-tab-pane>
            <el-tab-pane label="市综服" name="szf"></el-tab-pane>
        </el-tabs>
        <div class="chart-wrapper" ref="chartDom"></div>
    </el-card>
</template>

<style lang="scss" scoped>
.card-header {
    @include font(16px);
    margin-bottom: 20px;
    color: #1e1e1e;
    font-weight: bold;
}

.chart-wrapper {
    width: 100%;
    height: 300px;
}
</style>
