<template>
    <div class="mb60">
        <span>商标信息</span>
        <div v-if="trademarkInformation.length > 0">
            <table class="mt10 table" v-for="(info, index) in trademarkInformation" :key="index">
                <tr>
                    <td class="header-item">商标名称</td>
                    <td class="right-content-item" colspan="3">{{ info.tmName }}</td>
                </tr>
                <tr>
                    <td class="header-item">注册号</td>
                    <td class="content-item">{{ info.regNo }}</td>
                    <td class="header-item">注册公告日期</td>
                    <td class="right-content-item">{{ info.regDate }}</td>
                </tr>
                <tr>
                    <td class="header-item">国际分类</td>
                    <td class="content-item">{{ info.intCls }}</td>
                    <td class="header-item">商标二级分类码</td>
                    <td class="right-content-item">{{ info.secondClassCode }}</td>
                </tr>
                <tr>
                    <td class="header-item">商标类型</td>
                    <td class="content-item">{{ info.category }}</td>
                    <td class="header-item">商标状态</td>
                    <td class="right-content-item">{{ info.statusBrand }}</td>
                </tr>
                <tr>
                    <td class="header-item">申请人</td>
                    <td class="right-content-item" colspan="3">{{ info.applicantCn }}</td>
                </tr>
                <tr>
                    <td class="header-item">申请日期</td>
                    <td class="content-item">{{ info.appDate }}</td>
                    <td class="header-item">专用权期限结束日期</td>
                    <td class="right-content-item">{{ info.privateDateEnd }}</td>
                </tr>
            </table>
        </div>
        <div v-else class="report-no-data">
            暂无该企业的商标信息
        </div>
    </div>
</template>

<script lang="ts" setup>
type TrademarkInformation = {
    [key in string]: string
}

withDefaults(
    defineProps<{ trademarkInformation: TrademarkInformation[] }>(),
    {
        trademarkInformation: () => ([])
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
