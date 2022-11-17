<script lang="ts" setup>
import * as echarts from 'echarts';
import type { TotalIndicatorEntity } from '@/types/dashboard';
import { useSidebar } from '@/composables';

const { expand } = useSidebar();

watch(
    expand,
    () => {
        setTimeout(() => {
            resizeHandler();
        }, 150);
    }
);


const props = withDefaults(
    defineProps<{
        data: TotalIndicatorEntity
    }>(),
    {
        data: () => ({
            countUser: 0,
            countSimpleReq: 0,
            perSimpleReq: '0',
            countExactReq: 0,
            perExactReq: '0',
            countProductReq: 0,
            perProductReq: '0'
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
                '{b|0}',
                '{c|占比0%}'
            ].join('\n'),
            left: '12.726%',
            top: -5,
            textStyle
        },
        {
            text: [
                '{a|精准需求}',
                '{b|0}',
                '{c|占比0%}'
            ].join('\n'),
            left: '46.045%',
            top: -5,
            textStyle
        },
        {
            text: [
                '{a|产品需求}',
                '{b|0}',
                '{c|占比0%}'
            ].join('\n'),
            left: '79.364%',
            top: -5,
            textStyle
        }
    ],
    series: [
        {
            type: 'pie',
            radius: [24, 32],
            center: ['8.598%', 32],
            data: [
                {
                    value: 0,
                    itemStyle: {
                        color: '#6fa1ff'
                    }
                },
                {
                    value: 0,
                    itemStyle: {
                        color: '#f2f4f9'
                    }
                }
            ],
            stillShowZeroSum: false,
            silent: true,
            label: {
                show: false
            }
        },
        {
            type: 'pie',
            radius: [24, 32],
            center: ['41.917%', 32],
            data: [
                {
                    value: 0,
                    itemStyle: {
                        color: '#91cc75'
                    }
                },
                {
                    value: 0,
                    itemStyle: {
                        color: '#f2f4f9'
                    }
                }
            ],
            stillShowZeroSum: false,
            silent: true,
            label: {
                show: false
            }
        },
        {
            type: 'pie',
            radius: [24, 32],
            center: ['75.236%', 32],
            data: [
                {
                    value: 0,
                    itemStyle: {
                        color: '#5d7092'
                    }
                },
                {
                    value: 0,
                    itemStyle: {
                        color: '#f2f4f9'
                    }
                }
            ],
            stillShowZeroSum: false,
            silent: true,
            label: {
                show: false
            }
        }
    ]
};

const loadOptions = () => {
    options.title[0].text = ['{a|敏捷需求}', `{b|${props.data.countSimpleReq}}`, `{c|占比${props.data.perSimpleReq}%}`].join('\n');
    options.title[1].text = ['{a|精准需求}', `{b|${props.data.countExactReq}}`, `{c|占比${props.data.perExactReq}%}`].join('\n');
    options.title[2].text = ['{a|产品需求}', `{b|${props.data.countProductReq}}`, `{c|占比${props.data.perProductReq}%}`].join('\n');
    options.series[0].data[0].value = props.data.countSimpleReq;
    options.series[0].data[1].value = props.data.countExactReq + props.data.countProductReq;
    options.series[1].data[0].value = props.data.countExactReq;
    options.series[1].data[1].value = props.data.countSimpleReq + props.data.countProductReq;
    options.series[2].data[0].value = props.data.countProductReq;
    options.series[2].data[1].value = props.data.countSimpleReq + props.data.countExactReq;
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
    <el-card :body-style="{ display: 'flex', padding: '24px 32px 28px' }" shadow="never">
        <div class="count-user">
            <div class="item-label">企业总人数</div>
            <div class="item-value">{{ data.countUser }}</div>
        </div>
        <div class="chart-wrapper" ref="chartDomRef"></div>
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
