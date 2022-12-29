<script lang="ts" setup>

type AccFundEntity = {
    month: string,
    cap: string,
    peoNum: string
}

withDefaults(
    defineProps<{ accFund: AccFundEntity[] }>(),
    {
        accFund: () => ([])
    }
);

</script>

<template>
    <div class="mb60">
        <span>公积金缴存信息</span>
        <div class="mt10 table" v-if="accFund.length > 0">
            <div class="header">
                <div class="header-item" style="width: 33.3%;">缴存月份</div>
                <div class="header-item" style="width: 33.3%;">缴存金额</div>
                <div class="header-item" style="width: 33.3%;">缴费人数</div>
                <div class="clear-both"></div>
            </div>
            <div v-for="(info, index) in accFund" :key="index">
                <div class="content-item" style="width: 33.3%;">{{ info.month }}</div>
                <div class="content-item" style="width: 33.3%;">{{ info.cap }}</div>
                <div class="content-item" style="width: 33.3%;">{{ info.peoNum }}</div>
                <div class="clear-both"></div>
            </div>
        </div>
        <div v-else class="report-no-data">
            暂无该企业公积金缴存信息
        </div>
    </div>
</template>

<style lang="scss" scoped>
.title-content {
    font-size: 22px;
    text-align: center;
    margin: 90px 0 0;
    padding: 8px 0;
}

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
    text-align: center;
    height: 35px;
    float: left;
    line-height: 35px;
}
</style>
