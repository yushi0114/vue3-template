<script lang="ts" setup>
import type ElTableColumn from 'element-plus/es/components/table/src/tableColumn';
import type { ListOperatorOption, ItemOperate } from '@/components/list';

withDefaults(
    defineProps<{
        operators?: ListOperatorOption[],
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
  <el-table-column class="table-operator-column">
    <template #header>
        <span class="toc-header">{{ label }}</span>
    </template>
    <template #default="scope">
        <ListOperator
            :operators="operators"
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
