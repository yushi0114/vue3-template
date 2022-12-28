<template>
    <div class="mb60">
        <span>裁判文书信息</span>
        <div v-if="adjudicativeDocument.length > 0">
            <table class="mt10 table" v-for="(info, index) in adjudicativeDocument" :key="index">
                <tr>
                    <td class="header-item">文书标题</td>
                    <td class="right-content-item" colspan="3">{{ info.title }}</td>
                </tr>
                <tr>
                    <td class="header-item">案号</td>
                    <td class="content-item">{{ info.caseNo }}</td>
                    <td class="header-item">案件类型</td>
                    <td class="right-content-item">{{ info.caseType }}</td>
                </tr>
                <tr>
                    <td class="header-item">文书类型</td>
                    <td class="content-item">{{ info.docType }}</td>
                    <td class="header-item">裁判日期</td>
                    <td class="right-content-item">{{ info.judgeTime }}</td>
                </tr>
                <tr>
                    <td class="header-item">原告</td>
                    <td class="right-content-item" colspan="3">{{ info.plaintiffs }}</td>
                </tr>
                <tr>
                    <td class="header-item">被告</td>
                    <td class="right-content-item" colspan="3">{{ info.defendants }}</td>
                </tr>
                <tr>
                    <td class="header-item">第三人</td>
                    <td class="right-content-item" colspan="3">{{ info.thirdParties }}</td>
                </tr>
                <tr>
                    <td class="header-item">法院</td>
                    <td class="content-item">{{ info.court }}</td>
                    <td class="header-item">裁判结果</td>
                    <td class="right-content-item">{{ info.result }}</td>
                </tr>
            </table>
        </div>
        <div v-else class="report-no-data">
            暂无该企业的裁判文书信息
        </div>
    </div>
</template>

<script lang="ts" setup>
type AdjudicativeDocument = {
    [key in string]: string
}

withDefaults(
    defineProps<{ adjudicativeDocument: AdjudicativeDocument[] }>(),
    {
        adjudicativeDocument: () => ([])
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
