<template>
    <el-pagination
        v-bind="props.pageConfig"
        v-model:current-page="page.currentPage"
        v-model:page-size="page.pageSize"
        class="justify-end"></el-pagination>
</template>
<script lang="ts" setup>
import type { IPaginationConfig } from '../types';
// 定义组件接收的prop属性
const props = withDefaults(defineProps<{ pageConfig: Partial<IPaginationConfig> }>(), {
    pageConfig: () => reactive({}),
});
const emit = defineEmits<{
    (e: 'page-change', values: IPaginationConfig): void;
}>();
const page: any = reactive({
    ...props.pageConfig,
});
watch(page, () => {
    emit('page-change', page);
});
</script>
