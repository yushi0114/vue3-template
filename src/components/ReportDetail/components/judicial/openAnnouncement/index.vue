<template>
    <div class="mb60">
        <span>开庭公告信息</span>
        <div v-if="openAnnouncement.length > 0">
            <table class="mt10 table" v-for="(info, index) in openAnnouncement" :key="index">
                <tr>
                    <td class="header-item">案由</td>
                    <td class="right-content-item" colspan="3">{{ info.caseReason }}</td>
                </tr>
                <tr>
                    <td class="header-item">案号</td>
                    <td class="content-item">{{ info.caseNo }}</td>
                    <td class="header-item">开庭日期(时间)</td>
                    <td class="right-content-item">{{ info.startDate }}</td>
                </tr>
                <tr>
                    <td class="header-item">法院</td>
                    <td class="content-item">{{ info.court }}</td>
                    <td class="header-item">法庭</td>
                    <td class="right-content-item">{{ info.courtroom }}</td>
                </tr>
                <tr>
                    <td class="header-item">原告/上诉人</td>
                    <td class="right-content-item" colspan="3">{{ info.plaintiff }}</td>
                </tr>
                <tr>
                    <td class="header-item">被告/被上诉人</td>
                    <td class="right-content-item" colspan="3">{{ info.defendant }}</td>
                </tr>
            </table>
        </div>
        <div v-else class="report-no-data">
            暂无该企业的开庭公告信息
        </div>
    </div>
</template>

<script lang="ts" setup>
type OpenAnnouncement = {
    [key in string]: string
}

withDefaults(
    defineProps<{ openAnnouncement: OpenAnnouncement[] }>(),
    {
        openAnnouncement: () => ([])
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
