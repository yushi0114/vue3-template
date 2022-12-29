<script lang="ts" setup>
const props = defineProps({
    assLia: {
        type: Object,
        default: () => {}
    }
});

const serItem = reactive([
    { serNum: 1, value: '货币资金' },
    { serNum: 2, value: '短期投资' },
    { serNum: 3, value: '应收账款' },
    { serNum: 4, value: '预付账款' },
    { serNum: 5, value: '其他应收款' },
    { serNum: 6, value: '存货' },
    { serNum: 7, value: '流动资产合计' },
    { serNum: 8, value: '长期股权投资' },
    { serNum: 9, value: '固定资产净额' },
    { serNum: 10, value: '在建工程' },
    { serNum: 11, value: '无形资产' },
    { serNum: 12, value: '非流动资产合计' },
    { serNum: 13, value: '资产总计' },
    { serNum: 14, value: '短期借款' },
    { serNum: 15, value: '应付账款' },
    { serNum: 16, value: '预收账款' },
    { serNum: 17, value: '应付职工薪酬' },
    { serNum: 18, value: '应交税费' },
    { serNum: 19, value: '其他应付款' },
    { serNum: 20, value: '流动负债合计' },
    { serNum: 21, value: '长期借款' },
    { serNum: 22, value: '长期应付款' },
    { serNum: 23, value: '递延收益' },
    { serNum: 24, value: '负债合计' },
    { serNum: 25, value: '实收资本（或股本）' },
    { serNum: 26, value: '资本公积' },
    { serNum: 27, value: '盈余公积' },
    { serNum: 28, value: '未分配利润' },
    { serNum: 29, value: '所有者权益合计' },
    { serNum: 30, value: '负债和所有者权益总计' }
]);

const widthData = computed(() => {
    return 72 / props.assLia.year.length;
});
</script>

<template>
    <div class="mb60">
        <span>资产负债表主要信息</span>
        <div v-if="assLia.year && assLia.year.length > 0">
            <div class="mt10 table">
                <div class="header">
                    <div class="header-item" style="width: 6%;">编号</div>
                    <div class="header-item" style="width: 22%;">项目</div>
                    <div v-for="(item, index) in assLia.year" :key="index" class="header-item" :style="{width: widthData + '%'}">
                        {{ item }}
                    </div>
                    <div class="clear-both"></div>
                </div>
                <div v-for="(info, index) in serItem" :key="index">
                    <div class="content-item text-center" style="width: 6%;"
                            :class="{ 'font-weight': [13, 24, 29, 30].indexOf(info.serNum) !== -1 }">{{ info.serNum }}</div>
                    <div class="content-item pl5" style="width: 22%;"
                            :class="{ 'font-weight': [13, 24, 29, 30].indexOf(info.serNum) !== -1 }">{{ info.value }}</div>
                    <div v-for="(option, i) in assLia.list[index]" :key="i" :style="{width: widthData + '%'}"
                        class="content-item text-right pr5">
                        <div :class="{ 'font-weight': [13, 24, 29, 30].indexOf(info.serNum) !== -1 }">{{ option }}</div>
                    </div>
                    <div class="clear-both"></div>
                </div>
            </div>
            <span class="tip">注：本表数据为期末时点数。</span>
        </div>
        <div v-else class="report-no-data">
            暂无该企业资产负债信息
        </div>
    </div>
</template>

<style lang="scss" scoped>
.title {
    background-color: #fff;
    padding: 0 40px;
    position: relative;
    top: -15px;
}

.title-line {
    width: 70%;
    border-bottom: 1px solid #d8d5d5;
    margin: 0 auto;
}

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
</style>
