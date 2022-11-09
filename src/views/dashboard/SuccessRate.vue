<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartDom = ref<HTMLElement>();
const chartInstance = ref<any>();
const options = {
    xAxis: {
        type: 'category',
        data: ['2022-01', '2022-02', '2022-03', '2022-04', '2022-05', '2022-06', '2022-07', '2022-08', '2022-09', '2022-10', '2022-11', '2022-12']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 22214, 30230, 23489, 29034, 21344, 60230, 23489, 29034]
        },
        {
            type: 'bar',
            data: [18203, 23489, 29034, 131744, 97523, 2351, 29034, 10970, 61744, 32030, 23489, 29034]
        }
    ]
};

onMounted(() => {
    chartInstance.value = echarts.init(chartDom.value!);
    chartInstance.value.setOption(options, true);
});
</script>

<template>
    <el-card :body-style="{ padding: '20px 24px 40px' }" shadow="never">
        <div class="card-header">月数据趋势</div>
        <div class="success-rate-label">当月需求受理成功率</div>
        <div class="success-rate-value">45.82%</div>
        <div class="chart-wrapper" ref="chartDom"></div>
    </el-card>
</template>

<style lang="scss" scoped>
.card-header {
    @include font(16px);
    margin-bottom: 30px;
    color: #1e1e1e;
    font-weight: bold;
}

.success-rate-label {
    @include font(12px);
    margin-bottom: 1px;
    color: #5e5e5e;
}

.success-rate-value {
    line-height: 38px;
    color: #1e1e1e;
    font-size: 30px;
}

.chart-wrapper {
    width: 100%;
    height: 300px;
}
</style>
