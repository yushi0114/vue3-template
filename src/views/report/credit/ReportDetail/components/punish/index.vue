<script lang="ts" setup>

type PunishEntity = {
    department: string,
    fileNo: string,
    punishTime: string,
    sinType: string,
    punishType: string,
    punishNumber: string
}

withDefaults(
    defineProps<{ punish: PunishEntity[] }>(),
    {
        punish: () => ([])
    }
);
</script>

<template>
    <div class="mb60">
        <span>处罚信息</span>
        <div v-if="punish.length > 0">
            <table class="mt10 table">
                <tr>
                    <th class="header-item">处罚部门</th>
                    <th class="header-item">处罚决定书号</th>
                    <th class="header-item">处罚日期</th>
                    <th class="header-item">违法行为</th>
                    <th class="header-item">处罚种类</th>
                    <th class="header-item">罚款金额</th>
                </tr>
                <tr v-for="(info, index) in punish" :key="index">
                    <td class="content-item">{{ info.department }}</td>
                    <td class="content-item text-left">{{ info.fileNo }}</td>
                    <td class="content-item">{{ info.punishTime }}</td>
                    <td class="content-item text-left">{{ info.sinType }}</td>
                    <td class="content-item">{{ info.punishType }}</td>
                    <td class="content-item">{{ info.punishNumber }}</td>
                </tr>
            </table>

            <span class="tip">注：处罚信息主要包括税务、社保、市场监督部门的信息。</span>
        </div>
        <div v-else class="report-no-data">
            暂无该企业处罚信息
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table {
    border-top: 1px solid #d8d5d5;
    border-right: 1px solid #d8d5d5;
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
    font-size: 14px;
}

.header-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    background-color: #f5f7fa;
    padding: 10px 5px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
}

.content-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    padding: 5px 10px;
    text-align: center;
}
</style>
