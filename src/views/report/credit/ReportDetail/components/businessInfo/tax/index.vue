<script lang="ts" setup>
const props = defineProps({
    tax: {
        type: Object,
        default: () => {}
    }
});

const widthData = computed(() => {
    return 78 / props.tax.year.length;
});
</script>

<template>
    <div class="mb60">
        <span>纳税信息</span>
        <table class="mt10 table" v-if="tax.year && tax.year.length > 0">
            <tr>
                <td class="header-item" style="width: 22%;">税种</td>
                <td class="header-item" v-for="(item, index) in tax.year" :key="index" :style="{width: widthData + '%'}" >{{ item }}</td>
            </tr>
            <tr v-for="(info, index) in tax.list" :key="index">
                <td class="content-item text-center" style="width: 22%;">{{ info.taxType }}</td>
                <td class="content-item pr5" v-for="(option, i) in info.value" :key="i" :style="{width: widthData + '%'}" >{{ option }}</td>
            </tr>
        </table>
        <div v-else class="report-no-data">
            暂无该企业纳税信息
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
    text-align: right;
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
