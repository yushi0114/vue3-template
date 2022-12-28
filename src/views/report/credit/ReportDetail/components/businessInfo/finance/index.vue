<script lang="ts" setup>
const props = defineProps({
    finance: {
        type: Object,
        default: () => {}
    }
});

const serItem = reactive([
    { serNum: 1, value: '流动比率' },
    { serNum: 2, value: '速动比率' },
    { serNum: 3, value: '资产负债率' },
    { serNum: 4, value: '存货周转率' },
    { serNum: 5, value: '应收账款周转率' },
    { serNum: 6, value: '流动资产周转率' },
    { serNum: 7, value: '固定资产周转率' },
    { serNum: 8, value: '总资产周转率' },
    { serNum: 9, value: '毛利率' },
    { serNum: 10, value: '净利率' },
    { serNum: 11, value: '净资产收益率' },
    { serNum: 12, value: '总资产收益率' }
]);

const widthData = computed(() => {
    return 71 / props.finance.year.length;
});
</script>

<template>
    <div class="mb60">
        <span>主要财务指标信息</span>
        <div class="mt10 table" v-if="finance.year && finance.year.length > 0">
            <div class="header">
                <div class="header-item" style="width: 6%;">编号</div>
                <div class="header-item" style="width: 23%;">项目</div>
                <div v-for="(item, index) in finance.year" :key="index" class="header-item" :style="{width: widthData + '%'}">
                    {{ item }}
                </div>
                <div class="clear-both"></div>
            </div>
            <div v-for="(info, index) in serItem" :key="index">
                <div class="content-item text-center" style="width: 6%;">{{ info.serNum }}</div>
                <div class="content-item pl5" style="width: 23%;">{{ info.value }}</div>
                <div v-for="(option, i) in finance.list[index]" :key="i" :style="{width: widthData + '%'}"
                    class="content-item text-right pr5">
                    <div>{{ option }}</div>
                </div>
                <div class="clear-both"></div>
            </div>
        </div>
        <div v-else class="report-no-data">
            暂无该企业财务信息
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table {
    width: 100%;
    border-top: 1px solid #d8d5d5;
    border-right: 1px solid #d8d5d5;
}

.header-item {
    float: left;
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    background-color: #f5f7fa;
    padding: 10px 5px;
    font-size: 14px;
    font-weight: bold;
    line-height: 24px;
    box-sizing: border-box;
    text-align: center;
}

.content-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    font-size: 14px;
    box-sizing: border-box;
    height: 35px;
    float: left;
    line-height: 35px;
}

.tip {
    font-size: 13px;
    margin-top: 5px;
    display: inline-block;
    color: #bb3434;
}

.mt10 {
    margin-top: 10px;
}

.mb60 {
    margin-bottom: 60px;
}

.pl5 {
    padding-left: 5px;
}

.pr5 {
    padding-right: 5px;
}

.pl25 {
    padding-left: 25px;
}

.pl42 {
    padding-left: 42px;
}

.font-weight {
    font-weight: bold;
}

.text-right {
    text-align: right;
}

.text-center {
    text-align: center;
}

.clear-both {
    clear: both;
}

.report-no-data {
    font-size: 14px;
    margin: 10px 0 20px 20px;
    font-weight: bold;
}
</style>
