<script lang="ts" setup>
import { PagePanel } from '@/components';
import { COLUMNS, SEARCH_FORM } from './constants';
import { useTable } from './hooks/useTable';
import AddRoleDialog from './dialog/AddRoleDialog.vue';
const addRole = ref<InstanceType<typeof AddRoleDialog> | null>(null);
const sjcTableRef = ref<HTMLElement | null>(null); // 表格ref
const {
    tableConfig,
    state,
    pageConfig,
    handleAddRole,
    handlerEdit,
    handleDelete,
    indexMethod,
    pageSizeChange,
    batchDelete,
    batchExport,
    clearSelection,
    multiSelection,
    rowClick,
    handleSearch,
} = useTable(sjcTableRef, addRole);
</script>

<template>
    <PagePanel class="demo-table">
        <sjc-form :def="SEARCH_FORM" :loading="state.loading" @search="handleSearch"></sjc-form>
        <el-space>
            <el-button @click="handleAddRole">新增</el-button>
            <!-- <el-button type="danger" @click="handleAddRole">删除</el-button> -->
        </el-space>
        <div class="i-carbon-sun dark:i-carbon-moon"></div>
        <div class="i-iwwa-add-1m"></div>
        <div class="i-carbon-add-alt"></div>
        <div class="i-ep-add-location"></div>
        <sjc-table
            ref="sjcTableRef"
            :table-data="state.data"
            :loading="state.loading"
            :columns="COLUMNS"
            :table-config="tableConfig"
            :pagination-config="pageConfig"
            show-selection
            @index-method="indexMethod"
            @page-change="pageSizeChange"
            @multi-selection="multiSelection"
            @row-click="rowClick">
            <template #expand="{ props }">
                <el-row style="padding: 20px">
                    <el-col>姓名：{{ props.row.name }}</el-col>
                    <el-col>金额：{{ props.row.amount }}</el-col>
                </el-row>
            </template>
            <template #multiSelectMenu="{ selection }">
                <el-button link size="small" @click="batchDelete(selection)">批量删除</el-button>
                <el-button link size="small" @click="batchExport(selection)">批量导出</el-button>
                <el-button link size="small" @click="clearSelection()">清除多选（测试表格方法绑定） </el-button>
            </template>
            <template #name="{ scope }">
                <el-tag type="success">{{ scope.row.name }}</el-tag>
            </template>
            <template #handler="{ scope }">
                <el-button link type="primary" size="small" @click="handlerEdit(scope)">编辑</el-button>
                <el-button link type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
            </template>
            <template #append="{ props }">
                <div>{{ props.row.name }}在笑</div>
            </template>
        </sjc-table>
        <add-role-dialog ref="addRole"></add-role-dialog>
    </PagePanel>
</template>
