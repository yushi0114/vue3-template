<script lang="ts" setup>
import type ElTableColumn from 'element-plus/es/components/table/src/tableColumn';
import type { ListOperatorOption, ItemOperate } from '@/components/list';
import { isFunction } from 'lodash';

withDefaults(
    defineProps<{
        operators?: ListOperatorOption[] | ((scope: any) => ListOperatorOption[]),
        maxOutCount?: number,
        label?: string
    }>(),
    {
        label: '操作'
    }
);

const emits = defineEmits<{
    (e: 'operate', opt: ListOperatorOption, scope: any): void
    (e: ItemOperate, scope: any): void
}>();

function handleOperate(opt: ListOperatorOption, scope: any) {
    emits('operate', opt, scope);
    emits(opt.value, scope);
}
</script>

<template>
  <el-table-column class="table-operator-column" v-bind="$attrs" header-align="center">
    <template #header>
        <FlexRow horizontal="center" class="toc-header">{{ label }}</FlexRow>
    </template>
    <template #default="scope">
        <ListOperator
            :operators="isFunction(operators) ? operators(scope) : operators"
            :maxOutCount="maxOutCount"
            @operate="opt => handleOperate(opt, scope)"
        />
    </template>
  </el-table-column>
</template>

<style lang="scss">
.table-operator-column {
  & .toc-header {
    padding-left: $gap-md;
  }
}
</style>
