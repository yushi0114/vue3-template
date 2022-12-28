<template>
    <div class="mb60">
        <span>专利信息</span>
        <div v-if="patentInformation.length > 0">
            <table class="mt10 table" v-for="(info, index) in patentInformation" :key="index">
                <tr>
                    <td class="header-item">专利名称</td>
                    <td class="right-content-item" colspan="3">{{ info.title }}</td>
                </tr>
                <tr>
                    <td class="header-item">主分类号</td>
                    <td class="content-item">{{ info.mainIpc }}</td>
                    <td class="header-item">分类号</td>
                    <td class="right-content-item">{{ info.ipc }}</td>
                </tr>
                <tr>
                    <td class="header-item">专利类型</td>
                    <td class="content-item">{{ info.patType }}</td>
                    <td class="header-item">最新法律状态</td>
                    <td class="right-content-item">{{ info.lprs }}</td>
                </tr>
                <tr>
                    <td class="header-item">申请专利权人</td>
                    <td class="right-content-item" colspan="3">{{ info.applicantName }}</td>
                </tr>
                <tr>
                    <td class="header-item">发明设计人</td>
                    <td class="right-content-item" colspan="3">{{ info.inventorName }}</td>
                </tr>
                <tr>
                    <td class="header-item">摘要</td>
                    <td class="right-content-item" colspan="3">{{ info.abs }}</td>
                </tr>
                <tr>
                    <td class="header-item">申请日</td>
                    <td class="content-item">{{ info.appDate }}</td>
                    <td class="header-item">申请号</td>
                    <td class="right-content-item">{{ info.appNumber }}</td>
                </tr>
                <tr>
                    <td class="header-item">公开公告日</td>
                    <td class="content-item">{{ info.pubDate }}</td>
                    <td class="header-item">公开公告号</td>
                    <td class="right-content-item">{{ info.pubNumber }}</td>
                </tr>
            </table>
        </div>
        <div v-else class="report-no-data">
            暂无该企业的专利信息
        </div>
    </div>
</template>

<script lang="ts" setup>
type PatentInformation = {
    [key in string]: string
}

withDefaults(
    defineProps<{ patentInformation: PatentInformation[] }>(),
    {
        patentInformation: () => ([])
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
