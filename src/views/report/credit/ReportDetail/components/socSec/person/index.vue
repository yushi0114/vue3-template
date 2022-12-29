<script lang="ts" setup>

type SecPersonEntity = {
    month: string,
    person: string,
    peoNum: string
}

withDefaults(
    defineProps<{ secPerson: SecPersonEntity[] }>(),
    {
        secPerson: () => ([])
    }
);

</script>

<template>
    <div class="mb60">
        <span>企业基本养老保险个人帐户</span>
        <div class="mt10 table" v-if="secPerson.length > 0">
            <div class="header">
                <div class="header-item" style="width: 30%;">缴存月份</div>
                <div class="header-item" style="width: 50%;">企业基本养老保险个人帐户(8％)</div>
                <div class="header-item" style="width: 20%;">缴费人数</div>
                <div class="clear-both"></div>
            </div>
            <div v-for="(info, index) in secPerson" :key="index">
                <div class="content-item" style="width: 30%;">{{ info.month }}</div>
                <div class="content-item" style="width: 50%;">{{ info.person }}</div>
                <div class="content-item" style="width: 20%;">{{ info.peoNum }}</div>
                <div class="clear-both"></div>
            </div>
        </div>
        <div v-else class="report-no-data">
            暂无该企业基本养老保险个人帐户信息
        </div>
    </div>
</template>

<style lang="scss" scoped>
.title {
    display: inline-block;
}

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
