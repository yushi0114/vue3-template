<script lang="ts" setup>

type CloseEntity = {
    address: string,
    closeCreNo: string,
    corpClose: string,
    closeIdentity: string,
    closeStatus: string,
    dateBegin: string,
    dateEnd: string,
    landArea: string,
    housArea: string
}

withDefaults(
    defineProps<{ close: CloseEntity[] }>(),
    {
        close: () => ([])
    }
);
</script>

<template>
    <div class="mb60">
        <span>查封信息</span>
        <div v-if="close.length > 0">
            <div class="mt10 table" v-for="(info, index) in close" :key="index">
                <div class="bottom-line">
                    <span class="line-title">座落</span>
                    <span class="pl5">{{ info.address }}</span>
                </div>
                <div class="bottom-line">
                    <span class="line-title">查封文件号</span>
                    <span class="pl5">{{ info.closeCreNo }}</span>
                </div>
                <div class="bottom-line">
                    <span class="line-title">查封单位</span>
                    <span class="pl5">{{ info.corpClose }}</span>
                </div>
                <div class="bottom-line">
                    <span class="line-title">查封物质性质</span>
                    <span class="pl5 line-content">{{ info.closeIdentity }}</span>
                    <span class="line-title border-left">查封状态</span>
                    <span class="pl5">{{ info.closeStatus }}</span>
                </div>
                <div class="bottom-line">
                    <span class="line-title">查封开始日期</span>
                    <span class="pl5 line-content">{{ info.dateBegin }}</span>
                    <span class="line-title border-left">查封结束日期</span>
                    <span class="pl5">{{ info.dateEnd }}</span>
                </div>
                <div class="bottom-line">
                    <span class="line-title">土地面积</span>
                    <span class="pl5 line-content">{{ info.landArea }}</span>
                    <span class="line-title border-left">房产面积</span>
                    <span class="pl5">{{ info.housArea }}</span>
                </div>
            </div>
        </div>
        <div v-else class="report-no-data">
            暂无该企业的查封信息
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
