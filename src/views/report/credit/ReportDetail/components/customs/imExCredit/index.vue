<template>
    <div class="mb60">
        <span>进出口信用信息</span>
        <div v-if="JSON.stringify(imExCredit) !== '{}'">
            <table class="mt10 table">
                <tr>
                    <td class="header-item">海关注册编码</td>
                    <td class="content-item">{{ imExCredit.crCode }}</td>
                    <td class="header-item">注册海关</td>
                    <td class="right-content-item">{{ imExCredit.customsRegisteredAddress }}</td>
                </tr>
                <tr>
                    <td class="header-item">经营类别</td>
                    <td class="content-item">{{ imExCredit.managementCategory }}</td>
                    <td class="header-item">经济区划</td>
                    <td class="right-content-item">{{ imExCredit.economicDivision }}</td>
                </tr>
                <tr>
                    <td class="header-item">海关注销标志</td>
                    <td class="content-item">{{ imExCredit.customsStatus }}</td>
                    <td class="header-item">特殊贸易区域</td>
                    <td class="right-content-item">{{ imExCredit.specialTradeArea }}</td>
                </tr>
                <tr>
                    <td class="header-item">注册日期</td>
                    <td class="content-item">{{ imExCredit.recordDate }}</td>
                    <td class="header-item">报关有效期</td>
                    <td class="right-content-item">{{ imExCredit.validityDate }}</td>
                </tr>
                <tr>
                    <td class="header-item">信用等级</td>
                    <td class="content-item">{{ imExCredit.creditLevel }}</td>
                    <td class="header-item">年报情况</td>
                    <td class="right-content-item">{{ imExCredit.annualReport }}</td>
                </tr>
                <tr>
                    <td class="header-item">跨境贸易电子商务类型</td>
                    <td class="right-content-item" colspan="3">{{ imExCredit.types }}</td>
                </tr>
            </table>
        </div>
        <div v-else class="report-no-data">
            暂无该企业的进出口信用信息
        </div>
    </div>
</template>

<script lang="ts" setup>
type ImExCredit = {
    [key in string]?: string
}

withDefaults(
    defineProps<{ imExCredit: ImExCredit }>(),
    {
        imExCredit: () => ({})
    }
);
</script>

<style lang="scss" scoped>
.table {
    border: 1px solid #d8d5d5;
    margin-top: 10px;
    font-size: 14px;
    border-collapse: collapse;
    width: 100%;
}

.header-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    background-color: #f5f7fa;
    padding: 5px;
    font-weight: bold;
    line-height: 24px;
    width: 100px;
}

.content-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    padding: 5px 10px;
}

.right-content-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    padding: 5px 10px;
    width: 230px;
}
</style>
