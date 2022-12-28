<template>
    <div class="mb60">
        <span>作品著作权信息</span>
        <div v-if="copyright.length > 0">
            <table class="mt10 table" v-for="(info, index) in copyright" :key="index">
                <tr>
                    <td class="header-item">作品名称</td>
                    <td class="right-content-item" colspan="3">{{ info.name }}</td>
                </tr>
                <tr>
                    <td class="header-item">作品类别</td>
                    <td class="content-item">{{ info.type }}</td>
                    <td class="header-item">登记号</td>
                    <td class="right-content-item">{{ info.regNum }}</td>
                </tr>
                <tr>
                    <td class="header-item">著作权人</td>
                    <td class="right-content-item" colspan="3">{{ info.author }}</td>
                </tr>
                <tr>
                    <td class="header-item">创作完成日期</td>
                    <td class="content-item">{{ info.firstPublishTime }}</td>
                    <td class="header-item">登记时间</td>
                    <td class="right-content-item">{{ info.regTime }}</td>
                </tr>
            </table>
        </div>
        <div v-else class="report-no-data">
            暂无该企业的作品著作权信息
        </div>
    </div>
</template>

<script lang="ts" setup>
type Copyright = {
    name: string,
    type: string,
    regNum: string,
    author: string,
    firstPublishTime: string;
    regTime: string;
}

withDefaults(
    defineProps<{ copyright: Copyright[] }>(),
    {
        copyright: () => ([])
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
