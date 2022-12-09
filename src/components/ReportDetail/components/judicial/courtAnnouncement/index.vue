<template>
    <div class="mb60">
        <span>法院公告信息</span>
        <div v-if="courtAnnouncement.length > 0">
            <table class="mt10 table" v-for="(info, index) in courtAnnouncement" :key="index">
                <tr>
                    <td class="header-item">刊登日期</td>
                    <td class="right-content-item" colspan="3">{{ info.publishDate }}</td>
                </tr>
                <tr>
                    <td class="header-item">公告类型</td>
                    <td class="content-item">{{ info.announcementType }}</td>
                    <td class="header-item">案件号</td>
                    <td class="right-content-item">{{ info.caseNo }}</td>
                </tr>
                <tr>
                    <td class="header-item">原告</td>
                    <td class="right-content-item" colspan="3">{{ info.plaintiff }}</td>
                </tr>
                <tr>
                    <td class="header-item">当事人</td>
                    <td class="right-content-item" colspan="3">{{ info.litigant }}</td>
                </tr>
                <tr>
                    <td class="header-item">法院</td>
                    <td class="right-content-item" colspan="3">{{ info.courtName }}</td>
                </tr>
                <tr>
                    <td class="header-item">案件内容</td>
                    <td class="right-content-item" colspan="3">{{ info.content }}</td>
                </tr>
            </table>
        </div>
        <div v-else class="report-no-data">
            暂无该企业的法院公告信息
        </div>
    </div>
</template>

<script lang="ts" setup>
type CourtAnnouncement = {
    [key in string]: string
}

withDefaults(
    defineProps<{ courtAnnouncement: CourtAnnouncement[] }>(),
    {
        courtAnnouncement: () => ([])
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
