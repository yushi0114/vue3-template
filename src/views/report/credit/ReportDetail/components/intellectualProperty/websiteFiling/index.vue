<template>
    <div class="mb60">
        <span>网站备案信息</span>
        <div v-if="websiteFiling.length > 0">
            <table class="mt10 table" v-for="(info, index) in websiteFiling" :key="index">
                <tr>
                    <td class="header-item">备案网站</td>
                    <td class="right-content-item" colspan="3">{{ info.webSite }}</td>
                </tr>
                <tr>
                    <td class="header-item">网站名称</td>
                    <td class="content-item">{{ info.webName }}</td>
                    <td class="header-item">域名</td>
                    <td class="right-content-item">{{ info.domain }}</td>
                </tr>
                <tr>
                    <td class="header-item">企业名称</td>
                    <td class="right-content-item" colspan="3">{{ info.corpName }}</td>
                </tr>
                <tr>
                    <td class="header-item">网站备案/许可证号</td>
                    <td class="content-item">{{ info.webBaxh }}</td>
                    <td class="header-item">审核时间</td>
                    <td class="right-content-item">{{ info.reviewTime }}</td>
                </tr>
            </table>
        </div>
        <div v-else class="report-no-data">
            暂无该企业的备案网站信息
        </div>
    </div>
</template>

<script lang="ts" setup>
type WebsiteFiling = {
    [key in string]: string
}

withDefaults(
    defineProps<{ websiteFiling: WebsiteFiling[] }>(),
    {
        websiteFiling: () => ([])
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

    word-break: break-all;
}
</style>
