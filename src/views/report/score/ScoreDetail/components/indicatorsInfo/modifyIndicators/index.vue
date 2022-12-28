<script lang="ts" setup>
type modifyIndicatorsEntity = {
    year: string,
    xslrl: string,
    cbfylrl: string,
    zbsyl: string,
    chzzl: string,
    yszkzzl: string,
    yhlxbs: string,
    dxfzbl: string,
    xslrzzl: string,
    zzczzl: string
}

withDefaults(
    defineProps<{ modifyIndicators: modifyIndicatorsEntity[] }>(),
    {
        modifyIndicators: () => ([])
    }
);

</script>

<template>
    <div class="mb60">
        <table class="mt10 table mb60 over-line" v-if="modifyIndicators.length > 0">
            <tr>
                <td class="header-item" rowspan="2">修正指标</td>
                <td class="header-item" colspan="3">经营效益</td>
                <td class="header-item" colspan="2">资产营运</td>
                <td class="header-item" colspan="2">偿债能力</td>
                <td class="header-item" colspan="2">发展能力</td>
            </tr>
            <tr>
                <td class="header-item">销售<br>利润率</td>
                <td class="header-item">成本费用<br>利润率</td>
                <td class="header-item">资本<br>收益率</td>
                <td class="header-item">存货<br>周转率</td>
                <td class="header-item">应收账款<br>周转率</td>
                <td class="header-item">已获利息<br>倍数</td>
                <td class="header-item">带息负债<br>比率</td>
                <td class="header-item">销售利润<br>增长率</td>
                <td class="header-item">总资产<br>增长率</td>
            </tr>
            <tr v-for="(info, index) in modifyIndicators" :key="index">
                <td class="content-item">{{ info.year + '年' }}</td>
                <td class="content-item">{{ info.xslrl || '#N/A' }}</td>
                <td class="content-item">{{ info.cbfylrl || '#N/A' }}</td>
                <td class="content-item">{{ info.zbsyl || '#N/A' }}</td>
                <td class="content-item">{{ info.chzzl || '#N/A' }}</td>
                <td class="content-item">{{ info.yszkzzl || '#N/A' }}</td>
                <td class="content-item">{{ info.yhlxbs || '#N/A' }}</td>
                <td class="content-item">{{ info.dxfzbl || '#N/A' }}</td>
                <td class="content-item">{{ info.xslrzzl || '#N/A' }}</td>
                <td class="content-item">{{ info.zzczzl || '#N/A' }}</td>
            </tr>
        </table>
        <div v-else class="score-no-data">
            暂无该企业修正指标数据
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
