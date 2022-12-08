<script lang="ts" setup>
defineProps<{
    sort?: '' | 'asc' | 'desc'
}>();
</script>

<template>
  <div class="sort-arrow">
    <!-- -->
    <span class="sort-arrow">
        <i class="sort-caret ascending" :class="{ active: sort === 'asc' }"></i>
        <i class="sort-caret descending" :class="{ active: sort === 'desc' }"></i>
    </span>
  </div>
</template>

<style lang="scss">
.sort-arrow {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    height: 14px;
    width: 24px;
    vertical-align: middle;
    cursor: pointer;
    overflow: initial;
    position: relative;

    & .sort-caret {
        width: 0;
        height: 0;
        border: solid 5px transparent;
        position: absolute;
        left: 7px;

        &.ascending {
            top: -5px;
            border-bottom-color: var(--el-text-color-placeholder);

            &.active {
                border-bottom-color: var(--el-color-primary);
            }
        }
        &.descending {
            bottom: -3px;
            border-top-color: var(--el-text-color-placeholder);

            &.active {
                border-top-color: var(--el-color-primary);
            }
        }
    }
}
</style>
