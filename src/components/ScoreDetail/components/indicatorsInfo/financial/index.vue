<script lang="ts" setup>
import * as echarts from 'echarts';

type financialEntity = {
    year: string
    jzcsyl: string,
    zbbzzzl: string,
    xszzl: string,
    sdbl: string,
    zcfzl: string,
    ldzczzl: string,
    zzczzl: string,
    zzcbcl: string
}

const props = withDefaults(
    defineProps<{ financial: financialEntity[] }>(),
    {
        financial: () => ([])
    }
);

watch(
    () => props.financial,
    () => {
        initFinancialRadar();
    },
    { deep: true }
);

const financialChart = ref<HTMLElement>();
let chartInstance: echarts.ECharts;

const options = {
    title: {
        text: '主要财务指标雷达图',
        x: 'center',
        textStyle: {
            fontSize: 14
        }
    },
    tooltip: {},
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
    radar: {
        radius: 90,
        textStyle: {
            color: '#5f5757'
        },
        indicator: [
            { name: '净资产收益率', max: 10 },
            { name: '资本保值增值率', max: 10 },
            { name: '销售增长率', max: 10 },
            { name: '速动比率', max: 10 },
            { name: '资产负债率', max: 10 },
            { name: '流动资产周转率', max: 10 },
            { name: '总资产周转率', max: 10 },
            { name: '总资产报酬率', max: 10 }
        ],
    },
    series: [{
        type: 'radar',
        data: [] as any
    }]
};

const loadOptions = () => {
    const yearData = props.financial.map(item => item.year + '年');
    const seriesData = props.financial.map(item => {
        return {
            name: item.year + '年',
            value: [Number(item.jzcsyl), Number(item.zbbzzzl), Number(item.xszzl), Number(item.sdbl), Number(item.zcfzl), Number(item.ldzczzl), Number(item.zzczzl), Number(item.zzcbcl)],
            symbol: 'none',
            areaStyle: {
                opacity: 0.6
            }
        };
    });
    options.legend.data = yearData;
    options.series[0].data = seriesData;
    chartInstance.setOption(options, true);
};

const initFinancialRadar = () => {
    if (props.financial.length > 0) {
        chartInstance = echarts.init(financialChart.value!);
        loadOptions();
        window.addEventListener('resize', resizeHandler);
    }
};

const resizeHandler = () => {
    loadOptions();
    chartInstance.resize();
};

onMounted(() => {
    initFinancialRadar();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler);
});

</script>

<template>
    <div>
        <div v-if="financial.length > 0">
            <div ref="financialChart" class="financial-echart"></div>
        </div>
        <div v-else class="score-no-data">
            <div class="mb60">暂无该企业主要财务指标数据</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.financial-echart {
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
