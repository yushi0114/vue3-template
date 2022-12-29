<script lang="ts" setup>

type AbnormalEntity = {
    department: string,
    confirmDate: string,
    relieveDate: string
}

withDefaults(
    defineProps<{ abnormal: AbnormalEntity[] }>(),
    {
        abnormal: () => ([])
    }
);
</script>

<template>
    <div class="mb60">
        <span>税务部门非正常户信息</span>
        <div class="mt10 table" v-if="abnormal.length > 0">
            <div class="header">
                <div class="header-item" style="width: 33.3%;">认定部门</div>
                <div class="header-item" style="width: 33.3%;">认定日期</div>
                <div class="header-item" style="width: 33.3%;">解除日期</div>
                <div class="clear-both"></div>
            </div>
            <div v-for="(info, index) in abnormal" :key="index">
                <div class="content-item" style="width: 33.3%;">{{ info.department }}</div>
                <div class="content-item" style="width: 33.3%;">{{ info.confirmDate }}</div>
                <div class="content-item" style="width: 33.3%;">{{ info.relieveDate }}</div>
                <div class="clear-both"></div>
            </div>
        </div>
        <div v-else class="report-no-data">
            该企业未被税务部门认定为非正常户
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table {
    width: 100%;
    border-top: 1px solid #d8d5d5;
    border-right: 1px solid #d8d5d5;
}

.header-item {
    float: left;
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    background-color: #f5f7fa;
    padding: 10px 5px;
    font-size: 14px;
    font-weight: bold;
    line-height: 24px;
    box-sizing: border-box;
    text-align: center;
}

.content-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    font-size: 14px;
    box-sizing: border-box;
    text-align: center;
    height: 35px;
    float: left;
    line-height: 35px;
}
</style>
