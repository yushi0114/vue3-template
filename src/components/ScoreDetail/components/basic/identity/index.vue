<script lang="ts" setup>
defineProps({
    identity: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
<div>
    <span>身份信息</span>
    <table class="mt10 table">
        <tr>
            <td class="header-item">名称</td>
            <td class="content-item" colspan="3">{{ identity.name }}</td>
        </tr>
        <tr>
            <td class="header-item">注册地址</td>
            <td class="content-item" colspan="3">{{ identity.regAddr }}</td>
        </tr>
        <tr>
            <td class="header-item">机构代码</td>
            <td class="content-item">{{ identity.corpKey }}</td>
            <td class="header-item">注册资本</td>
            <td class="right-content-item">{{ identity.regCap }}</td>
        </tr>
        <tr>
            <td class="header-item">成立日期</td>
            <td class="content-item">{{ identity.esDate }}</td>
            <td class="header-item">营业期限</td>
            <td class="right-content-item">{{ identity.opDuring }}</td>
        </tr>
        <tr>
            <td class="header-item">经营范围</td>
            <td class="right-content-item" colspan="3">{{ identity.opScope }}</td>
        </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.table {
    border: 1px solid #d8d5d5;
    margin-top: 10px;
    font-size: 14px;
    margin-bottom: 60px;
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
}

.header-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    background-color: #f5f7fa;
    padding: 5px;
    font-weight: bold;
    line-height: 24px;
    width: 120px;
}

.content-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    padding: 5px 10px;
    line-height: 1.5;
}

.right-content-item {
    border-bottom: 1px solid #d8d5d5;
    border-left: 1px solid #d8d5d5;
    padding: 5px 10px;
    width: 180px;
    line-height: 1.5;
}

.mt10 {
    margin-top: 10px;
}
</style>
