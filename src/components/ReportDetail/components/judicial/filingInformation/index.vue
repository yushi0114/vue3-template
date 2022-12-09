<template>
    <div class="mb60">
        <span>立案信息</span>
        <div v-if="filingInformation.length > 0">
            <table class="mt10 table" v-for="(info, index) in filingInformation" :key="index">
                <tr>
                    <td class="header-item">案由</td>
                    <td class="right-content-item" colspan="3">{{ info.caseReason }}</td>
                </tr>
                <tr>
                    <td class="header-item">案号</td>
                    <td class="content-item">{{ info.caseNo }}</td>
                    <td class="header-item">立案日期</td>
                    <td class="right-content-item">{{ info.filingDate }}</td>
                </tr>
                <tr>
                    <td class="header-item">法院</td>
                    <td class="content-item">{{ info.court }}</td>
                    <td class="header-item">承办部门</td>
                    <td class="right-content-item">{{ info.department }}</td>
                </tr>
                <tr>
                    <td class="header-item">原告/上诉人/申请人</td>
                    <td class="right-content-item" colspan="3">{{ info.plaintiff }}</td>
                </tr>
                <tr>
                    <td class="header-item">被告/被上诉人/被申请人</td>
                    <td class="right-content-item" colspan="3">{{ info.defendant }}</td>
                </tr>
                <tr>
                    <td class="header-item">开庭日期</td>
                    <td class="content-item">{{ info.startTime }}</td>
                    <td class="header-item">结案日期</td>
                    <td class="right-content-item">{{ info.closeDate }}</td>
                </tr>
                <tr>
                    <td class="header-item">案件状态</td>
                    <td class="content-item">{{ info.caseStatus }}</td>
                    <td class="header-item">案件类型</td>
                    <td class="right-content-item">{{ info.caseType }}</td>
                </tr>
            </table>
        </div>
        <div v-else class="report-no-data">
            暂无该企业的立案信息
        </div>
    </div>
</template>

<script lang="ts" setup>
type FilingInformation = {
    [key in string]: string
}

withDefaults(
    defineProps<{ filingInformation: FilingInformation[] }>(),
    {
        filingInformation: () => ([])
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
