<script lang="ts" setup>
const props = defineProps({
    gas: {
        type: Object,
        default: () => {}
    }
});

const payInfo = computed(() => {
    let headerItem = [], valueItem = [];
    if (props.gas.hasAccount === '0') {
        headerItem = Object.keys(props.gas.data).sort();
        for (let vaule of headerItem) {
            valueItem.push(props.gas.data[vaule]);
        }
    } else {
        headerItem = props.gas.data.year;
        valueItem = props.gas.data.list;
    }
    return { headerItem, valueItem };
});

const widthData = computed(() => {
    return 100 / payInfo.value.headerItem.length;
});
</script>

<template>
    <div class="mb60">
        <span>燃气缴费信息</span>
        <div v-if="gas.hasAccount">
            <div v-if="gas.hasAccount === '0'">
                <table class="mt10 table">
                    <tr>
                        <th v-for="(item, index) in payInfo.headerItem" :key="index" class="header-item" :style="{width: widthData + '%'}">{{ item }}</th>
                    </tr>
                    <tr>
                        <td class="content-item" v-for="(option, index) in payInfo.valueItem" :key="index" :style="{width: widthData + '%'}">{{ option }}</td>
                    </tr>
                </table>
            </div>

            <div v-else>
                <table class="mt10 table">
                    <tr>
                        <th v-for="(item, index) in payInfo.headerItem" :key="index" class="header-item" :style="{width: widthData + '%'}">{{ item }}</th>
                    </tr>
                    <tr v-for="(info, index) in payInfo.valueItem" :key="index">
                        <td class="content-item" v-for="(option, i) in payInfo.valueItem[index]" :key="i" :style="{width: widthData + '%'}">{{ option }}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div v-else class="report-no-data">
            暂无该企业的燃气缴费信息
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table {
    border-top: 1px solid #d8d5d5;
    border-right: 1px solid #d8d5d5;
    font-size: 14px;
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
}

.header-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    background-color: #f5f7fa;
    padding: 5px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
}

.content-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    padding: 8px 0;
    text-align: center;
}
</style>
