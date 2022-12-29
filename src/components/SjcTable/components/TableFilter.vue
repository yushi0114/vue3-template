<template>
    <el-popover
        v-model:visible="isShowFilter"
        placement="bottom"
        trigger="click">
        <el-checkbox-group v-model="checkList">
            <el-checkbox
                :label="item.value"
                v-for="(item, index) in filterCondition"
                :key="index">
                <Text size="sm" block truncate>{{ item.text }}</Text>
            </el-checkbox>
        </el-checkbox-group>
        <div class="el-table-filter__bottom">
            <button
                :class="{ 'is-disabled': !checkList.length }"
                :disabled="!checkList.length"
                @click="filterTableData">
                筛选
            </button>
            <button @click="handleFilterReset">重置</button>
        </div>
        <template #reference>
            <FlexRow>
                <Text
                    class="cursor-pointer"
                    size="sm"
                    style="margin-right: 0.25rem"
                    :class="{ highlight: filterResKey.length }">
                    {{ column.label }}
                </Text>
                <el-icon>
                    <ArrowDown class="cursor-pointer" v-show="!isShowFilter" />
                    <ArrowUp class="cursor-pointer" v-show="isShowFilter" />
                </el-icon>
            </FlexRow>
        </template>
    </el-popover>
</template>

<script lang="ts" setup>
import type { IColumn } from '../types';
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';

const props = withDefaults(
    defineProps<{
        filterCondition: { text: string; value: string }[];
        column: IColumn;
    }>(),
    {
        filterCondition: () => [],
        column: () => ({}),
    }
);

const emits = defineEmits<{
    // eslint-disable-next-line no-undef
    (e: 'filter-change', value: Recordable<string[]>): void;
}>();

const isShowFilter = ref(false); // 控制隐藏过滤弹窗
const checkList = ref<string[]>([]);
const filterResKey = ref<string[]>([]); // 存储筛选值的key值，用于调接口时传参
const filterTableData = () => {
    filterResKey.value = checkList.value;
    isShowFilter.value = false;
    emits('filter-change', { [props.column.columnKey!]: filterResKey.value }); // 将选项值转为字符串传给父组件
};

const handleFilterReset = () => {
    isShowFilter.value = false;
    filterResKey.value = [];
    checkList.value = [];
    emits('filter-change', { [props.column.columnKey!]: [] }); // 将选项值转为字符串传给父组件
};

watch(isShowFilter, () => {
    checkList.value = filterResKey.value;
});
</script>

<style lang="scss" scoped>
:deep(.el-checkbox) {
    max-width: 300px;
    height: 28px;
    display: flex;
    overflow: hidden;
    margin-right: 0;
}
:deep(.el-checkbox__label) {
    overflow: hidden;
    flex: 1;
}
.highlight {
    color: $color-primary;
}
.el-table-filter__bottom {
    padding-bottom: 0;
}
</style>
