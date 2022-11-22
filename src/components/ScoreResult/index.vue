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

const scoreLine = ref();

function initScoreTrendsLine() {
    if (scoreLine.value) {
        const chartScoreLine = echarts.init(scoreLine.value);
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

onMounted(initScoreTrendsLine);

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
        <div v-else class="report-no-data">
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
    border-top: 1px solid #d8d5d5;
    border-right: 1px solid #d8d5d5;
    font-size: 14px;
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
}

.header-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    background-color: #f5f7fa;
    padding: 3px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
}

.content-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
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
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    background-color: #f5f7fa;
    padding: 10px 0;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
}

.right-content-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    text-align: center;
    padding: 7px 0;
}

</style>
