<script lang="ts" setup>
import Charts from './Charts.vue';
import type { ECElementEvent } from 'echarts/types/src/util/types';
import type { ApplyCountEntity } from '@/types/dashboard';
import { useTheme } from '@/composables';

const { isDark } = useTheme();

watch(
    isDark,
    () => {
        setTimeout(() => {
            loadOptions();
        }, 0);
    }
);

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

const options = ref({
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
        triggerEvent: true,
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
                    color: '',
                    fontFamily: 'sans-regular, "Microsoft YaHei", "黑体", sans-serif',
                    fontSize: 12,
                    lineHeight: 18,
                    backgroundColor: '',
                    borderRadius: 10,
                    padding: [3, 5],
                    width: 8,
                    height: 12
                },
                b: {
                    color: '',
                    fontFamily: 'sans-regular, "Microsoft YaHei", "黑体", sans-serif',
                    fontSize: 14,
                    lineHeight: 18,
                    padding: [0, 12]
                },
                c: {
                    color: '',
                    fontFamily: 'sans-regular, "Microsoft YaHei", "黑体", sans-serif',
                    fontSize: 12,
                    lineHeight: 18,
                    backgroundColor: '',
                    borderRadius: 10,
                    padding: [3, 5],
                    width: 8,
                    height: 12
                },
                d: {
                    color: '',
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
});

const loadOptions = () => {
    const data = activeName.value === 'lxt' ? props.data.countProduct : props.data.countEzjfwProduct;
    options.value.yAxis.data = data.map(item => item.name);
    options.value.yAxis.axisLabel.rich.a.color = getComputedStyle(document.documentElement).getPropertyValue('--i-text-color-disabled');
    options.value.yAxis.axisLabel.rich.a.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--i-text-color-primary');
    options.value.yAxis.axisLabel.rich.b.color = getComputedStyle(document.documentElement).getPropertyValue('--i-text-color-primary');
    options.value.yAxis.axisLabel.rich.c.color = getComputedStyle(document.documentElement).getPropertyValue('--i-text-color-disabled');
    options.value.yAxis.axisLabel.rich.c.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--i-text-color-placeholder');
    options.value.yAxis.axisLabel.rich.d.color = getComputedStyle(document.documentElement).getPropertyValue('--i-text-color-secondary');
    options.value.series[0].data = data.map(item => item.count);
    options.value.series[1].data = data.map(item => ({ realValue: item.count, value: data[0].count }));
};

const mousemoveHandler = (params: ECElementEvent) => {
    const labelTooltip = document.getElementById('label-tooltip')!;
    if (params.componentType === 'yAxis') {
        labelTooltip.style.display = 'block';
        labelTooltip.style.left = params.event!.offsetX + 50 + 'px';
        labelTooltip.style.top = params.event!.offsetY + 110 + 'px';
        labelTooltip.innerText = params.value as string;
    }
};

const mouseoutHandler = () => {
    const labelTooltip = document.getElementById('label-tooltip')!;
    labelTooltip.style.display = 'none';
};

const isEmpty = computed(() => {
    return activeName.value === 'lxt' && props.data.countProduct.length === 0 || activeName.value === 'szf' && props.data.countEzjfwProduct.length === 0;
});
</script>

<template>
    <Board :style="{ position: 'relative', overflow: 'hidden', padding: '20px 28px 24px' }">
        <div class="card-header">
            <Text color="paragraph" bold size="md">产品申请数量排行榜</Text>
        </div>
        <el-tabs v-model="activeName" @tab-change="handleTabChange">
            <el-tab-pane label="辽信通" name="lxt"></el-tab-pane>
            <el-tab-pane label="市综服" name="szf"></el-tab-pane>
        </el-tabs>
        <template v-if="!isEmpty">
            <Charts :options="options" :height="216" @chart-mousemove="mousemoveHandler" @chart-mouseout="mouseoutHandler" />
        </template>
        <template v-else>
            <Empty :offsetHeight="440" :offsetWidth="0" defaultStyle="width: 100%" :imageSize="200"></Empty>
        </template>
        <div id="label-tooltip"></div>
    </Board>
</template>

<style lang="scss" scoped>
.card-header {
    margin-bottom: 16px;
}

#label-tooltip {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    padding: 3px 5px;
    color: #ffffff;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .6);
    font-size: 12px;
}
</style>
