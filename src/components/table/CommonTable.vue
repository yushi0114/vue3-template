<script lang="ts" setup>
// 暂未找到透传 ref 的方法，所以暂时
// 外部需要用 fooRef.value.$refs.table 代替 tableRef.value
const table = ref();

</script>

<template>
    <el-table
        ref="table"
        class="common-table"
        v-bind="$attrs"
        header-row-class-name="common-table-header"
        >
        <template
            v-for="(_, key, index) in $slots"
            :key="index"
            v-slot:[key]="props">
            <slot :name="key" v-bind="props"></slot>
        </template>
    </el-table>
</template>

<style lang="scss">
.common-table {
}
.common-table-header {
    & th {
        background-color: $color-info-light-9 !important;
        color: $text-color-secondary !important;
        height: 3rem;

        &:first-of-type {
            border-radius: 4px 0 0 0;
        }
        &:last-of-type {
            border-radius: 0 4px 0 0;
        }
    }
}
</style>
