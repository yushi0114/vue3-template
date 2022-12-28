<template>
    <el-table-column :label="props.column.label" :prop="props.column.prop" v-bind="bindColumn">
        <template v-for="item in props.column.children" :key="item.prop">
            <multistage-column
                v-if="item.children && item.children.length"
                :column="item"></multistage-column>
            <el-table-column v-else v-bind="item" show-overflow-tooltip>
                <template v-if="item.slotName" #default="scope">
                    <slot :name="item.slotName" :data="scope"></slot>
                </template>
            </el-table-column>
        </template>
    </el-table-column>
</template>
<script lang="ts">
export default defineComponent({
    name: 'MultistageColumn',
});
</script>
<script lang="ts" setup>
import type { IColumn } from '../types';
import { omit } from '@/utils';

// 定义组件接收的prop属性
const props = defineProps<{
    column: Readonly<IColumn>;
}>();

const bindColumn = reactive(omit(props.column, ['children']));
</script>
