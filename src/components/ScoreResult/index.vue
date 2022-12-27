<script lang="ts" setup>
import * as echarts from 'echarts';
import scoreLineDataOpt from './scoreLineDataOpt';

const props = withDefaults(
    defineProps<{
        scoreResult: any[]
    }>(),
    {
        scoreResult: () => []
    }
);

const scoreLineRef = ref();

function initScoreTrendsLine() {
    console.log('????', props.scoreResult, scoreLineRef.value);
    if (scoreLineRef.value) {
        const chartScoreLine = echarts.init(scoreLineRef.value);
        let xData: any = [];
        let seriesData: any = [];
        props.scoreResult.forEach((item: any) => {
            xData.push(item.year + '年');
            seriesData.push({
                value: item.pfen || item.score,
                pji: item.pji,
                pjia: item.pjia
            });
        });
        scoreLineDataOpt.xAxis.data = xData;
        scoreLineDataOpt.series[0].data = seriesData;
        chartScoreLine.setOption(scoreLineDataOpt);

        window.addEventListener('resize', function() {
            chartScoreLine.resize();
        });
    }
}

watch(() => props.scoreResult, (val) => {
    if (val.length === 0) return;
    nextTick(() => {
        initScoreTrendsLine();
    });
});

</script>
<template>
    <div>
        <div v-if="scoreResult.length > 0" class="score-result">
            <div class="left">
                <table class="table">
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
                <div ref="scoreLineRef" class="line-content"></div>
            </div>
            <div class="right">
                <table class="table">
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
        <div v-else class="report-no-data">
            <div class="mb60">暂无该企业评分信息数据</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

.score-result {
    padding-top: $gap-md;
}
.left {
    width: 60%;
    float: left;
}

.table {
    border-top: $border;
    border-right: $border;
    font-size: 14px;
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
}

.header-item {
    border-bottom: $border;
    border-left: $border;
    background-color: $bg-color;
    padding: 3px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    color: $text-color-regular;
}

.content-item {
    border-bottom: $border;
    border-left: $border;
    padding: 3px;
    line-height: 24px;
    text-align: center;
    color: $text-color-regular;
}

.line-content {
    height: 300px;
    margin-top: $gap-xs;
}

.right {
    width: 35%;
    float: right;
}

.right-header-item {
    border-bottom: $border;
    border-left: $border;
    background-color: $bg-color;
    padding: 10px 0;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    color: $text-color-regular;
}

.right-content-item {
    border-bottom: $border;
    border-left: $border;
    text-align: center;
    padding: 11px 0;
    color: $text-color-regular;
}

</style>
