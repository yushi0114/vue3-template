<script lang="ts" setup>
const props = defineProps({
    profit: {
        type: Object,
        default: () => {}
    }
});

const serItem = reactive([
    { serNum: 1, value: '一、营业收入' },
    { serNum: 2, value: '减:营业成本' },
    { serNum: 3, value: '营业税金及附加' },
    { serNum: 4, value: '销售费用' },
    { serNum: 5, value: '管理费用' },
    { serNum: 6, value: '财务费用' },
    { serNum: 7, value: '研发费用' },
    { serNum: 8, value: '资产减值损失' },
    { serNum: 9, value: '加:公允价值变动收益' },
    { serNum: 10, value: '投资收益' },
    { serNum: 11, value: '资产处置收益' },
    { serNum: 12, value: '二、营业利润' },
    { serNum: 13, value: '加:营业外收入' },
    { serNum: 14, value: '减:营业外支出' },
    { serNum: 15, value: '三、利润总额' },
    { serNum: 16, value: '减:所得税费用' },
    { serNum: 17, value: '四、净利润' }
]);

const widthData = computed(() => {
    return 71 / props.profit.year.length;
});
</script>

<template>
    <div class="mb60">
        <span>利润表主要信息</span>
        <div class="mt10 table" v-if="profit.year && profit.year.length > 0">
            <div class="header">
                <div class="header-item" style="width: 6%;">编号</div>
                <div class="header-item" style="width: 23%;">项目</div>
                <div v-for="(item, index) in profit.year" :key="index" class="header-item" :style="{width: widthData + '%'}">
                    {{ item }}
                </div>
                <div class="clear-both"></div>
            </div>
            <div v-for="(info, index) in serItem" :key="index">
                <div class="content-item text-center" style="width: 6%;" :class="{ 'font-weight': [1, 12, 15, 17].indexOf(info.serNum) !== -1 }">{{ info.serNum }}</div>
                <div class="content-item pl5" style="width: 23%;"
                    :class="{
                                'font-weight': [1, 12, 15, 17].indexOf(info.serNum) !== -1,
                                'pl25': [2, 9, 13, 14, 16].indexOf(info.serNum) !== -1,
                                'pl42': [3, 4, 5, 6, 7, 8, 10, 11].indexOf(info.serNum) !== -1
                    }">{{ info.value }}</div>
                <div v-for="(option, i) in profit.list[index]" :key="i" :style="{width: widthData + '%'}" class="content-item text-right pr5">
                    <div :class="{ 'font-weight': [1, 12, 15, 17].indexOf(info.serNum) !== -1 }">{{ option }}</div>
                </div>
                <div class="clear-both"></div>
            </div>
        </div>
        <div v-else class="report-no-data">
            暂无该企业利润信息
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
