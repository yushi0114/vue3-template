<template>
    <LoadingBoard
        class="sjc-table"
        :class="[loading && 'sjc-table--loading']"
        :loading="loading"
        :empty="false">
        <!--批量操作栏，勾选行时显示-->
        <el-row
            v-if="$tableConfig.showSelection && $tableConfig.showSelectionOpt && state.selection.length"
            justify="space-between"
            align="middle">
            <div class="multi-menu">
                <Text size="sm">已选中{{ state.selection.length }}项</Text>
                <el-divider direction="vertical" />
                <slot
                    name="multiSelectMenu"
                    :selection="state.selection" />
            </div>
            <a
                class="close"
                @click="clearSelection"></a>
        </el-row>
        <!-- 数据表格 -->
        <CommonTable
            ref="commonTableRef"
            :data="tableData"
            v-bind="$attrs"
            :row-key="$tableConfig.rowKey"
            @selection-change="selectionChange">
            <!-- 是否是展开行 -->
            <el-table-column
                v-if="$tableConfig.showExpand"
                type="expand">
                <template #default="props">
                    <slot
                        name="expand"
                        :props="props" />
                </template>
            </el-table-column>
            <!-- 多选 -->
            <el-table-column
                v-if="$tableConfig.showSelection"
                type="selection"
                width="60"
                :reserve-selection="$tableConfig.isCheckMemory"
                align="center"></el-table-column>
            <!-- 显示自定义索引 -->
            <el-table-column
                v-if="$tableConfig.showIndexColumn"
                type="index"
                :index="typeIndex"
                width="60">
                <!-- 自定义序列号 -->
                <template #header>
                    <span>{{ $tableConfig.indexLabel }}</span>
                </template>
            </el-table-column>
            <!-- 递归渲染多级表头 -->
            <template
                v-for="column in columns"
                :key="column.prop">
                <multistage-column
                    v-if="column.children && column.children.length"
                    :column="column"></multistage-column>
                <el-table-column
                    v-else
                    v-bind="column"
                    :filters="undefined"
                    :filter-method="undefined"
                    show-overflow-tooltip>
                    <template #header>
                        <table-filter
                            v-if="column.filters"
                            :column="column"
                            :filterCondition="column.filters"
                            @filter-change="handleFilterChange"></table-filter>
                        <Text
                            size="sm"
                            v-else>
                            {{ column.label }}
                        </Text>
                    </template>
                    <template
                        v-if="column.slotName"
                        #default="scope">
                        <slot
                            :name="column.slotName"
                            :scope="scope"></slot>
                    </template>
                </el-table-column>
            </template>
            <!-- 操作栏 -->
            <el-table-column
                v-if="$tableConfig.showHandler"
                v-bind="$tableConfig.handlerConfig">
                <template #default="scope">
                    <slot
                        name="handler"
                        :scope="scope"></slot>
                </template>
            </el-table-column>
            <!-- 自定义默认内容 -->
            <el-table-column
                v-if="$tableConfig.showAppend"
                type="append"
                :label="$tableConfig.appendLabel">
                <template #default="props">
                    <slot
                        name="append"
                        :props="props" />
                </template>
            </el-table-column>
            <template #empty>
                <LoadingBoard
                    :loading="false"
                    :empty="true" />
            </template>
        </CommonTable>
        <!-- 分页配置 -->
        <div v-if="showPagination && tableData.length">
            <pagination
                :page-config="$paginationConfig"
                @page-change="pageChange"></pagination>
        </div>
    </LoadingBoard>
</template>

<script lang="ts">
export default {
    name: 'SjcTable',
    inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import MultistageColumn from './components/MultistageColumn.vue'; // 递归多级表头组件
import Pagination from './components/Pagination.vue'; // 分页组件
import { CommonTable } from '@/components/table/index';
import type { ITableConfig, IColumn, ITableData, IPaginationConfig } from './types';
import { INIT_PAGINATION_CONFIG, INIT_TABLE_CONFIG } from './constants';
import { cloneDeep } from 'lodash';

type IProps = {
    tableData: ITableData;
    tableConfig?: Partial<ITableConfig>;
    columns: IColumn[];
    loading?: boolean;
    showPagination?: boolean;
    paginationConfig?: Partial<IPaginationConfig>;
};
// 定义组件接收的prop属性
const prop = withDefaults(defineProps<IProps>(), {
    tableData: () => [],
    tableConfig: () => ({}),
    columns: () => [],
    loading: false,
    showPagination: true,
    paginationConfig: () => reactive({}),
});
const emit = defineEmits(['page-change', 'multi-selection', 'filter-change']); // 声明emit

const state: { selection: ITableData } = reactive({
    selection: [],
});
const commonTableRef = ref<HTMLElement | null>(null); // 表格ref
const TABLE_CONFIG = cloneDeep(INIT_TABLE_CONFIG);
// 合并表格配置项
const $tableConfig = computed(() => {
    let result: Partial<ITableConfig> = {};
    const $tableConfig: IColumn = { label: '操作', minWidth: 100, width: 120, fixed: 'right', align: 'center' };
    // eslint-disable-next-line no-unused-expressions
    prop.tableConfig.handlerConfig && Object.assign($tableConfig, prop.tableConfig.handlerConfig);
    result = Object.assign(TABLE_CONFIG, prop.tableConfig);
    result.handlerConfig = $tableConfig;
    return result;
});

const PAGINATION_CONFIG = reactive(cloneDeep(INIT_PAGINATION_CONFIG));
// 合并分页配置
const $paginationConfig = computed(() => {
    return Object.assign(PAGINATION_CONFIG, prop.paginationConfig) ?? {};
});
// 切换分页
function pageChange(page: IPaginationConfig) {
    emit('page-change', page);
}
// 清空多选项
function clearSelection() {
    state.selection = [];
    // @ts-ignore
    commonTableRef.value.$refs.table.clearSelection();
}
// 多选赋值
function selectionChange(selection: ITableData[]) {
    state.selection = selection;
    // 暴露选中事件
    emit('multi-selection', selection);
}

// eslint-disable-next-line no-undef
const handleFilterChange = (filters: Recordable<string[]>) => {
    emit('filter-change', filters);
};
// 自定义排序
function typeIndex(index: number) {
    const tabIndex =
        index + (($paginationConfig.value?.currentPage ?? 1) - 1) * ($paginationConfig.value?.pageSize ?? 10) + 1;
    return tabIndex;
}
// 用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
function toggleRowSelection(row: any, selected: boolean) {
    // @ts-ignore
    commonTableRef.value.$refs.table.toggleRowSelection(row, selected);
}
// 用于多选表格，切换全选和全不选
function toggleAllSelection() {
    // @ts-ignore
    commonTableRef.value.$refs.table.toggleAllSelection();
}
// 用于可扩展的表格或树表格，如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。
function toggleRowExpansion(row: ITableData, expanded: boolean) {
    // @ts-ignore
    commonTableRef.value.$refs.table.toggleRowExpansion(row, expanded);
}
// 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态。
function setCurrentRow(row: ITableData) {
    // @ts-ignore
    commonTableRef.value.$refs.table.setCurrentRow(row);
}
// 用于清空排序条件，数据会恢复成未排序的状态
function clearSort() {
    // @ts-ignore
    commonTableRef.value.$refs.table.clearSort();
}
// 用于清空排序条件，数据会恢复成未排序的状态
function clearFilter(columnKeys: Array<any>) {
    // @ts-ignore
    commonTableRef.value.$refs.table.clearFilter(columnKeys);
}
// 对 Table 进行重新布局。 当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
function doLayout() {
    // @ts-ignore
    commonTableRef.value.$refs.table.doLayout();
}
// 手动对 Table 进行排序。 参数 prop 属性指定排序列，order 指定排序顺序
function sort(prop: string, order: string) {
    // @ts-ignore
    commonTableRef.value.$refs.table.sort(prop, order);
}
// 将table组件的全部方法暴露出去
defineExpose({
    clearSelection,
    toggleRowSelection,
    toggleAllSelection,
    toggleRowExpansion,
    setCurrentRow,
    clearSort,
    clearFilter,
    doLayout,
    sort,
});
</script>
<style lang="scss" scoped>
.sjc-table {
    flex: initial;

    &--loading {
        flex: 1;
    }
}
.close {
    position: relative;
    width: 16px;
    height: 16px;
}
.close:before,
.close:after {
    position: absolute;
    left: 8px;
    content: ' ';
    height: 16px;
    width: 2px;
    background-color: #333;
    cursor: pointer;
}
.close:before {
    transform: rotate(45deg);
}
.close:after {
    transform: rotate(-45deg);
}
</style>
