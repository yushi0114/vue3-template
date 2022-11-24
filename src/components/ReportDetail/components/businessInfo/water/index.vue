<script lang="ts" setup>
const props = defineProps({
    water: {
        type: Object,
        default: () => {}
    }
});

const payInfo = computed(() => {
    let headerItem = [], valueItem = [];
    if (props.water.hasAccount === '0') {
        headerItem = Object.keys(props.water.data).sort();
        for (let vaule of headerItem) {
            valueItem.push(props.water.data[vaule]);
        }
    } else {
        headerItem = props.water.data.year;
        valueItem = props.water.data.list;
    }
    return { headerItem, valueItem };
});

const widthData = computed(() => {
    return 100 / payInfo.value.headerItem.length;
});
</script>

<template>
    <div class="mb60">
        <span>水缴费信息</span>
        <div v-if="water.hasAccount">
            <div v-if="water.hasAccount === '0'">
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
            暂无该企业的水缴费信息
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

.tip {
    font-size: 13px;
    margin-top: 5px;
    display: inline-block;
    color: #bb3434;
}

.mt10 {
    margin-top: 10px;
}

.mb60 {
    margin-bottom: 60px;
}

.pl5 {
    padding-left: 5px;
}

.pr5 {
    padding-right: 5px;
}

.pl25 {
    padding-left: 25px;
}

.pl42 {
    padding-left: 42px;
}

.font-weight {
    font-weight: bold;
}

.text-right {
    text-align: right;
}

.text-center {
    text-align: center;
}

.clear-both {
    clear: both;
}

.report-no-data {
    font-size: 14px;
    margin: 10px 0 20px 20px;
    font-weight: bold;
}
</style>
