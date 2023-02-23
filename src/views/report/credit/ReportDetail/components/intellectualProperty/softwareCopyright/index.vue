<template>
    <div class="mb60">
        <span>软件著作权信息</span>
        <div v-if="softwareCopyright.length > 0">
            <table class="mt10 table" v-for="(info, index) in softwareCopyright" :key="index">
                <tr>
                    <td class="header-item">软件名称</td>
                    <td class="right-content-item" colspan="3">{{ info.fullName }}</td>
                </tr>
                <tr>
                    <td class="header-item">软件简称</td>
                    <td class="content-item">{{ info.simpleName }}</td>
                    <td class="header-item">登记号</td>
                    <td class="right-content-item">{{ info.regNum }}</td>
                </tr>
                <tr>
                    <td class="header-item">分类号</td>
                    <td class="content-item">{{ info.catNum }}</td>
                    <td class="header-item">版本号</td>
                    <td class="right-content-item">{{ info.version }}</td>
                </tr>
                <tr>
                    <td class="header-item">著作权人</td>
                    <td class="right-content-item" colspan="3">{{ info.authorNationality }}</td>
                </tr>
                <tr>
                    <td class="header-item">首次发表时间</td>
                    <td class="content-item">{{ info.publishTime }}</td>
                    <td class="header-item">登记时间</td>
                    <td class="right-content-item">{{ info.regTime }}</td>
                </tr>
            </table>
        </div>
        <div v-else class="report-no-data">
            暂无该企业的软件著作权信息
        </div>
    </div>
</template>

<script lang="ts" setup>
type SoftwareCopyright = {
    [key in string]: string
}

withDefaults(
    defineProps<{ softwareCopyright: SoftwareCopyright[] }>(),
    {
        softwareCopyright: () => ([])
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
