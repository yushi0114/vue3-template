<script lang="ts" setup>

type LeadersEntity = {
    duty: string,
    name: string
}

withDefaults(
    defineProps<{ leaders: LeadersEntity[] }>(),
    {
        leaders: () => ([])
    }
);

</script>

<template>
    <div class="mb60">
        <span>董事、监事、高管信息</span>
        <div class="mt10 table" v-if="leaders.length > 0">
            <div class="header">
                <div class="header-item" style="width: 50%;">职务</div>
                <div class="header-item" style="width: 50%;">姓名</div>
                <div class="clear-both"></div>
            </div>
            <div v-for="(info, index) in leaders" :key="index">
                <div class="content-item" style="width: 50%;">{{ info.duty }}</div>
                <div class="content-item" style="width: 50%;">{{ info.name }}</div>
                <div class="clear-both"></div>
            </div>
        </div>
        <div v-else class="report-no-data">
            暂无该企业董事、监事、高管信息
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
