<script lang="ts" setup>
import * as echarts from 'echarts';

type dimensionEntity = {
    year: string
    cznl: string,
    fznl: string,
    jyxy: string,
    zcyy: string
}

const props = withDefaults(
    defineProps<{ dimension: dimensionEntity[] }>(),
    {
        dimension: () => ([])
    }
);

watch(
    () => props.dimension,
    () => {
        initDimensionLine();
    },
    { deep: true }
);

const dimensionLine = ref<HTMLElement>();
let chartInstance: echarts.ECharts;

const options = {
    title: {
        text: '各维度变动情况',
        x: 'center',
        textStyle: {
            fontSize: 14
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: [] as string[],
        icon: 'circle',
        x: 'center',
        y: 'bottom',
        itemWidth: 10,
        itemHeight: 10,
        formatter: ['{position|{name}}'].join('\n'),
        textStyle: {
            height: 9,
            rich: {
                position: {
                    verticalAlign: 'bottom'
                }
            }
        }
    },
    grid: {
        containLabel: true,
        x: 5,
        x2: 20
    },
    xAxis: {
        type: 'category',
        data: [] as string[]
    },
    yAxis: {
        type: 'value'
    },
    series: [] as any
};

const loadOptions = () => {
    let legendData = [
        { name: '经营效益', value: 'jyxy' },
        { name: '资产运营', value: 'zcyy' },
        { name: '偿债能力', value: 'cznl' },
        { name: '发展能力', value: 'fznl' }
    ];
    let xData = props.dimension.map(item => item.year + '年');
    let seriesData = legendData.map((item) => {
        return {
            name: item.name,
            type: 'line',
            data: props.dimension.map((info: any) => info[item.value])
        };
    });
    options.legend.data = legendData.map(item => item.name);
    options.series = seriesData;
    options.xAxis.data = xData;
    chartInstance.setOption(options, true);
};

const initDimensionLine = () => {
    if (props.dimension.length > 0) {
        chartInstance = echarts.init(dimensionLine.value!);
        loadOptions();
        window.addEventListener('resize', resizeHandler);
    }
};

const resizeHandler = () => {
    loadOptions();
    chartInstance.resize();
};

onMounted(() => {
    initDimensionLine();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler);
});

</script>

<template>
    <div>
        <div v-if="dimension.length > 0">
            <div ref="dimensionLine" class="dimension-echart"></div>
        </div>
        <div v-else class="score-no-data">
            <div class="mb60">暂无该企业各维度变动情况数据</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dimension-echart {
    height: 350px;
}

.score-no-data {
    font-size: 14px;
    margin: 10px 0 20px 20px;
    font-weight: bold;
}

.mb60 {
    margin-bottom: 60px;
}
</style>
