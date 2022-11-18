<script lang="ts" setup>
type ChattelEntity = {
    guarantyName: string,
    priclasecam: string,
    commodity: string,
    dateBegin: string,
    dateEnd: string
}

withDefaults(
    defineProps<{ chattel: ChattelEntity[] }>(),
    {
        chattel: () => ([])
    }
);
</script>

<template>
    <div class="mb60">
        <span>动产抵押信息</span>
        <div v-if="chattel.length > 0">
            <div class="mt10 table" v-for="(info, index) in chattel" :key="index">
                <div class="bottom-line">
                    <div class="line-title">抵押权人</div>
                    <div class="line-value">{{ info.guarantyName }}</div>
                    <div class="clear-both"></div>
                </div>
                <div class="bottom-line">
                    <div class="line-title">被担保的主债权数额</div>
                    <div class="pl5 line-content">{{ info.priclasecam }}</div>
                    <div class="clear-both"></div>
                </div>
                <div class="bottom-line">
                    <div class="display-table-title">抵押物</div>
                    <div class="display-table-content p5">{{ info.commodity }}</div>
                    <div class="clear-both"></div>
                </div>
                <div class="bottom-line">
                    <div class="line-title">履约起始日期</div>
                    <div class="pl5 line-content">{{ info.dateBegin }}</div>
                    <div class="line-title border-left">履约截至日期</div>
                    <div class="line-value">{{ info.dateEnd }}</div>
                    <div class="clear-both"></div>
                </div>
            </div>
        </div>
        <div v-else class="report-no-data">
            暂无该企业的动产抵押信息
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
