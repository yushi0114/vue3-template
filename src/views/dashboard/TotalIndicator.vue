<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const chartDom = ref<HTMLElement>();
const chartInstance = ref<any>();
let chartWidth = 0;
const textStyle = {
    rich: {
        a: {
            color: '#5e5e5e',
            fontFamily: 'sans-regular, "Microsoft YaHei", "黑体", sans-serif',
            fontSize: 14,
            lineHeight: 22
        },
        b: {
            color: '#1e1e1e',
            fontSize: 20,
            lineHeight: 28,
            padding: [14, 0, 0, 0]
        },
        c: {
            color: '#5e5e5e',
            fontSize: 12,
            lineHeight: 18,
            padding: [18, 0, 0, 0]
        }
    }
};
const options = {
    title: [
        {
            text: [
                '{a|敏捷需求}',
                '{b|370,221,928}',
                '{c|占比61.5%}'
            ].join('\n'),
            left: 0,
            top: -5,
            textStyle
        },
        {
            text: [
                '{a|精准需求}',
                '{b|180,596,062}',
                '{c|占比30%}'
            ].join('\n'),
            left: 0,
            top: -5,
            textStyle
        },
        {
            text: [
                '{a|产品需求}',
                '{b|51,168,884}',
                '{c|占比8.5%}'
            ].join('\n'),
            left: 0,
            top: -5,
            textStyle
        }
    ],
    series: [
        {
            type: 'pie',
            radius: [24, 32],
            center: [0, 32],
            data: [
                {
                    value: 1048,
                    itemStyle: {
                        color: '#6fa1ff'
                    }
                },
                {
                    value: 389,
                    itemStyle: {
                        color: '#f2f4f9'
                    }
                }
            ],
            silent: true,
            label: {
                show: false
            }
        },
        {
            type: 'pie',
            radius: [24, 32],
            center: [0, 32],
            data: [
                {
                    value: 287,
                    itemStyle: {
                        color: '#98e38a'
                    }
                },
                {
                    value: 1150,
                    itemStyle: {
                        color: '#f2f4f9'
                    }
                }
            ],
            silent: true,
            label: {
                show: false
            }
        },
        {
            type: 'pie',
            radius: [24, 32],
            center: [0, 32],
            data: [
                {
                    value: 102,
                    itemStyle: {
                        color: '#5d7092'
                    }
                },
                {
                    value: 1335,
                    itemStyle: {
                        color: '#f2f4f9'
                    }
                }
            ],
            silent: true,
            label: {
                show: false
            }
        }
    ]
};

const loadOptions = () => {
    chartWidth = chartDom.value!.getBoundingClientRect().width;
    const leftOffsets = [0, chartWidth / 3, chartWidth / 3 * 2];
    options.title.map((item, index) => {
        item.left = leftOffsets[index] + 148;
    });
    options.series.map((item, index) => {
        item.center = [leftOffsets[index] + 100, 32];
    });
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

onMounted(() => {
    initChart();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler);
    chartInstance.value.dispose();
});
</script>

<template>
    <el-card :body-style="{ display: 'flex', padding: '24px 32px 28px' }" shadow="never">
        <div class="count-user">
            <div class="item-label">企业总人数</div>
            <div class="item-value">601,986,875</div>
        </div>
        <div class="chart-wrapper" ref="chartDom"></div>
    </el-card>
</template>

<style lang="scss" scoped>
.count-user {
    flex: none;
    width: 25%;
    height: 78px;
    border-right: 1px solid #dcdfe6;

    .item-label {
        @include font(14px);
        margin-bottom: 7px;
        color: #5e5e5e;
    }

    .item-value {
        line-height: 38px;
        color: #1e1e1e;
        font-size: 30px;
    }
}

.chart-wrapper {
    flex: none;
    width: 75%;
}
</style>
