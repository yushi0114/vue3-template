<script lang="ts" setup>
defineProps<{
    total?: number
}>();
</script>

<template>
    <el-pagination
        v-if="total"
        v-bind="$attrs"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="total"
        class="i-pagination"
    />
</template>

<style lang="scss">
.i-pagination {
    margin-top: $gap-lg;
    justify-content: flex-end;
}
</style>
