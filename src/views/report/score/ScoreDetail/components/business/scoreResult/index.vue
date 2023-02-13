<script lang="ts" setup>
import * as echarts from 'echarts';

type scoreResultEntity = {
    year: string,
    pfen: string,
    score: string,
    pjia: string,
    pji: string
}

const props = withDefaults(
    defineProps<{ scoreResult: scoreResultEntity[] }>(),
    {
        scoreResult: () => ([])
    }
);

watch(
    () => props.scoreResult,
    () => {
        initScoreTrendsLine();
    },
    { deep: true }
);

const scoreLine = ref<HTMLElement>();
let chartInstance: echarts.ECharts;

const options = {
    title: {
        text: '评分走势图',
        x: 'center',
        textStyle: {
            fontSize: 14
        }
    },
    grid: {
        containLabel: true,
        x: 5,
        x2: 0
    },
    xAxis: {
        type: 'category',
        data: [] as string[]
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [] as string[],
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 10,
            label: {
                show: true,
                position: [-10, -15],
                formatter: function(params: any) {
                    let resultParams;
                    if (params.data.pji && params.data.pjia) {
                        resultParams =
                            params.data.value + '\n' + '\n' + '\n' + params.data.pjia + `(${params.data.pji})`;
                    } else {
                        resultParams = params.data.value;
                    }
                    return resultParams;
                }
            }
        }
    ]
};

const loadOptions = () => {
    let xData:any = [],
        seriesData:any = [];
    props.scoreResult.forEach((item) => {
        xData.push(item.year + '年');
        seriesData.push({
            value: item.pfen || item.score,
            pji: item.pji,
            pjia: item.pjia
        });
    });
    options.xAxis.data = xData;
    options.series[0].data = seriesData;
    chartInstance.setOption(options, true);
};

const initScoreTrendsLine = () => {
    if (props.scoreResult.length > 0) {
        chartInstance = echarts.init(scoreLine.value!);
        loadOptions();
        window.addEventListener('resize', resizeHandler);
    }
};

const resizeHandler = () => {
    loadOptions();
    chartInstance.resize();
};

onMounted(() => {
    initScoreTrendsLine();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler);
});

</script>

<template>
    <div>
        <div v-if="scoreResult.length > 0">
            <div class="left">
                <table class="mt10 table">
                    <tr>
                        <td class="header-item">年份</td>
                        <td class="header-item">评分</td>
                        <td class="header-item">评价</td>
                        <td class="header-item">评级</td>
                    </tr>
                    <tr v-for="(item, index) in scoreResult" :key="index">
                        <td class="content-item">{{ item.year + '年' }}</td>
                        <td class="content-item">{{ item.pfen || item.score }}</td>
                        <td class="content-item">{{ item.pjia }}</td>
                        <td class="content-item">{{ item.pji }}</td>
                    </tr>
                </table>
                <div ref="scoreLine" class="line-content mt20"></div>
            </div>

            <div class="right">
                <table class="mt10 table">
                    <tr>
                        <td class="right-header-item">评价</td>
                        <td class="right-header-item">评级</td>
                        <td class="right-header-item">得分</td>
                    </tr>
                    <tr>
                        <td class="right-content-item" rowspan="3">优</td>
                        <td class="right-content-item">A++</td>
                        <td class="right-content-item">[95,120]</td>
                    </tr>
                    <tr>
                        <td class="right-content-item">A+</td>
                        <td class="right-content-item">[90,95)</td>
                    </tr>
                    <tr>
                        <td class="right-content-item">A</td>
                        <td class="right-content-item">[85,90)</td>
                    </tr>
                    <tr>
                        <td class="right-content-item" rowspan="3">良</td>
                        <td class="right-content-item">B+</td>
                        <td class="right-content-item">[80,85)</td>
                    </tr>
                    <tr>
                        <td class="right-content-item">B</td>
                        <td class="right-content-item">[75,80)</td>
                    </tr>
                    <tr>
                        <td class="right-content-item">B-</td>
                        <td class="right-content-item">[70,75)</td>
                    </tr>
                    <tr>
                        <td class="right-content-item" rowspan="2">中</td>
                        <td class="right-content-item">C</td>
                        <td class="right-content-item">[60,70)</td>
                    </tr>
                    <tr>
                        <td class="right-content-item">C-</td>
                        <td class="right-content-item">[50,60)</td>
                    </tr>
                    <tr>
                        <td class="right-content-item">低</td>
                        <td class="right-content-item">D</td>
                        <td class="right-content-item">[40,50)</td>
                    </tr>
                    <tr>
                        <td class="right-content-item">差</td>
                        <td class="right-content-item">E</td>
                        <td class="right-content-item">[0,40)</td>
                    </tr>
                </table>
            </div>

            <div class="clear-both"></div>
        </div>
        <div v-else class="score-no-data">
            <div class="mb60">暂无该企业评分信息数据</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.left {
    width: 60%;
    float: left;
}

.table {
    color: $text-color-primary;
    border-top: $border;
    border-right: $border;
    font-size: 14px;
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    $border: 1px solid #d8d5d5;
}

.header-item {
    border-bottom: $border;
    border-left: $border;
    background-color: $bg-color;
    padding: 3px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    background-color: #f5f7fa;
}

.content-item {
    border-bottom: $border;
    border-left: $border;
    padding: 3px;
    line-height: 24px;
    text-align: center;
}

.line-content {
    height: 300px;
}

.right {
    width: 35%;
    float: right;
}

.right-header-item {
    border-bottom: $border;
    border-left: $border;
    background-color: $bg-color;
    padding: 3px 0;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    background-color: #f5f7fa;

}

.right-content-item {
    border-bottom: $border;
    border-left: $border;
    padding: 7px 3px;
    line-height: 24px;
    text-align: center;
}

.mt10 {
    margin-top: 10px;
}

.mt20 {
    margin-top: 20px;
}

.clear-both {
    clear: both;
}

.score-no-data {
    font-size: 14px;
    margin: 10px 0 20px 20px;
    font-weight: bold;
}
</style>
