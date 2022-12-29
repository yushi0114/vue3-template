<script lang="ts" setup>

type StockholderEntity = {
    name: string,
    type: string,
    capital: string,
    ratio: string
}

withDefaults(
    defineProps<{ stockholder: StockholderEntity[] }>(),
    {
        stockholder: () => ([])
    }
);

</script>

<template>
    <div class="mb60">
        <span>股东信息</span>
        <div v-if="stockholder.length > 0">
            <table class="mt10 table">
                <tr>
                    <th class="header-item">股东名称</th>
                    <th class="header-item">股东类型</th>
                    <th class="header-item">出资额(万)</th>
                    <th class="header-item">出资比例(%)</th>
                </tr>
                <tr v-for="(info, index) in stockholder" :key="index">
                    <td class="content-item">{{ info.name }}</td>
                    <td class="content-item">{{ info.type }}</td>
                    <td class="content-item">{{ info.capital }}</td>
                    <td class="content-item">{{ info.ratio }}</td>
                </tr>
            </table>

            <span class="tip" v-if="stockholder.length > 0">注：股份公司股东信息仅登记设立时的发起人股份。</span>
        </div>
        <div v-else class="report-no-data">
            暂无该企业股东信息
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table {
    border-top: 1px solid #d8d5d5;
    border-right: 1px solid #d8d5d5;
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
    font-size: 14px;
}

.header-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    background-color: #f5f7fa;
    padding: 10px 5px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
}

.content-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    padding: 5px;
    text-align: center;
    line-height: 24px;
}
</style>
