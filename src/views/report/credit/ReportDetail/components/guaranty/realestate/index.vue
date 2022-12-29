<script lang="ts" setup>

type RealestateEntity = {
    address: string,
    otherNo: string,
    guarantyName: string,
    currency: string,
    amount: string,
    guarantyType: string,
    guarantyStatus: string,
    dateBegin: string,
    dateEnd: string,
    landArea: string,
    housArea: string
}

withDefaults(
    defineProps<{ realestate: RealestateEntity[] }>(),
    {
        realestate: () => ([])
    }
);
</script>

<template>
    <div class="mb60">
        <span>不动产抵押信息</span>
        <div v-if="realestate.length > 0">
            <div class="mt10 table" v-for="(info, index) in realestate" :key="index">
                <div class="bottom-line">
                    <span class="line-title">座落</span>
                    <span class="pl5">{{ info.address }}</span>
                </div>
                <div class="bottom-line">
                    <span class="line-title">他项权证号</span>
                    <span class="pl5">{{ info.otherNo }}</span>
                </div>
                <div class="bottom-line">
                    <span class="line-title">抵押权人</span>
                    <span class="pl5">{{ info.guarantyName }}</span>
                </div>
                <div class="bottom-line">
                    <span class="line-title">币种</span>
                    <span class="pl5 line-content">{{ info.currency }}</span>
                    <span class="line-title border-left">债权金额（万元）</span>
                    <span class="pl5">{{ info.amount }}</span>
                </div>
                <div class="bottom-line">
                    <span class="line-title">抵押类别</span>
                    <span class="pl5 line-content">{{ info.guarantyType }}</span>
                    <span class="line-title border-left">抵押状态</span>
                    <span class="pl5">{{ info.guarantyStatus }}</span>
                </div>
                <div class="bottom-line">
                    <span class="line-title">债权起始日期</span>
                    <span class="pl5 line-content">{{ info.dateBegin }}</span>
                    <span class="line-title border-left">债权截至日期</span>
                    <span class="pl5">{{ info.dateEnd }}</span>
                </div>
                <div class="bottom-line">
                    <span class="line-title">土地面积（㎡）</span>
                    <span class="pl5 line-content">{{ info.landArea }}</span>
                    <span class="line-title border-left">房产面积（㎡）</span>
                    <span class="pl5">{{ info.housArea }}</span>
                </div>
            </div>
        </div>
        <div v-else class="report-no-data">
            暂无该企业的不动产抵押信息
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table {
    width: 100%;
    border-top: 1px solid #d8d5d5;
    border-right: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    font-size: 14px;
}

.bottom-line {
    border-bottom: 1px solid #d8d5d5;
}

.line-title {
    padding: 5px;
    font-weight: bold;
    background-color: #f5f7fa;
    display: inline-block;
    width: 120px;
    border-right: 1px solid #d8d5d5;
    line-height: 24px;
}

.line-content {
    width: 35%;
    display: inline-block;
}

.border-left {
    border-left: 1px solid #d8d5d5;
}
</style>
