<script lang="ts" setup>

</script>

<template>
    <el-drawer modal-class="detail-drawer" size="60%" v-bind="$attrs">
        <template v-for="(item, key, index) in $slots" :key="index" v-slot:[key]>
            <slot :name="key"></slot>
        </template>
    </el-drawer>
</template>

<style lang="scss">
.detail-drawer {
    & .el-drawer__header {
        margin-bottom: 0;
    }

    & .i-content-board {
        margin-bottom: $gap-md;
    }
}
</style>
