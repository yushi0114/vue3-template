<script lang="ts" setup>
type SocSecLateFeeEntity = {
    payBegin: string,
    cap: string,
    payEnd: string
}

withDefaults(
    defineProps<{ socSecLateFee: SocSecLateFeeEntity[] }>(),
    {
        socSecLateFee: () => ([])
    }
);


</script>

<template>
    <div class="mb60">
        <span>社保滞纳金信息</span>
        <div class="mt10 table" v-if="socSecLateFee.length > 0">
            <div class="header">
                <div class="header-item" style="width: 30%;">缴费所属期起</div>
                <div class="header-item" style="width: 50%;">缴费所属期止</div>
                <div class="header-item" style="width: 20%;">缴费金额</div>
                <div class="clear-both"></div>
            </div>
            <div v-for="(info, index) in socSecLateFee" :key="index">
                <div class="content-item" style="width: 30%;">{{ info.payBegin }}</div>
                <div class="content-item" style="width: 50%;">{{ info.payEnd }}</div>
                <div class="content-item" style="width: 20%;">{{ info.cap }}</div>
                <div class="clear-both"></div>
            </div>
        </div>
        <div v-else class="report-no-data">
            暂无该企业社保滞纳金信息
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table {
    width: 100%;
    border-top: 1px solid #d8d5d5;
    border-right: 1px solid #d8d5d5;
}

.late-fee-table {
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

.mt10 {
    margin-top: 10px;
}

.mb60 {
    margin-bottom: 60px;
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
