<script lang="ts" setup>
type basicIndicatorsEntity = {
    year: string,
    jzcsyl: string,
    zzcbcl: string,
    zzczzl: string,
    ldzczzl: string,
    zcfzl: string,
    sdbl: string,
    xszzl: string,
    zbbzzzl: string
}

withDefaults(
    defineProps<{ basicIndicators: basicIndicatorsEntity[] }>(),
    {
        basicIndicators: () => ([])
    }
);

</script>

<template>
    <div class="mb60">
        <table class="mt10 table over-line" v-if="basicIndicators.length > 0">
            <tr>
                <td class="header-item" rowspan="2">基本指标</td>
                <td class="header-item" colspan="2">经营效益</td>
                <td class="header-item" colspan="2">资产营运</td>
                <td class="header-item" colspan="2">偿债能力</td>
                <td class="header-item" colspan="2">发展能力</td>
            </tr>
            <tr>
                <td class="header-item">净资产<br>收益率</td>
                <td class="header-item">总资产<br>报酬率</td>
                <td class="header-item">总资产<br>周转率</td>
                <td class="header-item">流动资产<br>周转率</td>
                <td class="header-item">资产<br>负债率</td>
                <td class="header-item">速动比率</td>
                <td class="header-item">销售<br>增长率</td>
                <td class="header-item">资本保值<br>增值率</td>
            </tr>
            <tr v-for="(info, index) in basicIndicators" :key="index">
                <td class="content-item">{{ info.year + '年' }}</td>
                <td class="content-item">{{ info.jzcsyl || '#N/A' }}</td>
                <td class="content-item">{{ info.zzcbcl || '#N/A' }}</td>
                <td class="content-item">{{ info.zzczzl || '#N/A' }}</td>
                <td class="content-item">{{ info.ldzczzl || '#N/A' }}</td>
                <td class="content-item">{{ info.zcfzl || '#N/A' }}</td>
                <td class="content-item">{{ info.sdbl || '#N/A' }}</td>
                <td class="content-item">{{ info.xszzl || '#N/A' }}</td>
                <td class="content-item">{{ info.zbbzzzl || '#N/A' }}</td>
            </tr>
        </table>
        <div v-else class="score-no-data">
            暂无该企业基本指标数据
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
    padding: 5px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
}

.content-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    padding: 8px 0;
    text-align: center;
}

.mt10 {
    margin-top: 10px;
}

.mt20 {
    margin-top: 20px;
}

.mb60 {
    margin-bottom: 60px;
}

.clear-both {
    clear: both;
}

.over-line {
    word-wrap: break-word;
    word-break: break-all;
}

.score-no-data {
    font-size: 14px;
    margin: 10px 0 20px 20px;
    font-weight: bold;
}
</style>
