<script lang="ts" setup>

</script>

<template>
    <el-pagination
        v-bind="$attrs"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        background
        class="i-pagination"
    />
</template>

<style lang="scss">
.i-pagination {
    margin-top: $gap-lg;
    justify-content: flex-end;
}
</style>
