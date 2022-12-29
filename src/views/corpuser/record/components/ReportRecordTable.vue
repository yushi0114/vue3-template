<template>
    <div class="record-container">
        <ListQueryControl
            v-model="filterObject"
            :filter-row-visible="false"
            :searchConfig="{
                label: '请输入账号、企业名称、信用代码进行查询',
                field: 'searchInput',
            }">

            <template #search-rest>
                <el-button type="danger" :icon="Delete" :disabled="allToogle.batchDeleteToogle" @click="batchDelete">批量删除</el-button>
            </template>
        </ListQueryControl>
        <div class="content">
            <LoadingBoard :loading="loading" :empty="!listData.list.length">
                <CommonTable
                    :data="listData.list"
                    :default-sort="{ prop: 'createTime', order: 'descending' }"
                    @sort-change="handleSortChange"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="inquiry" label="查询账号"></el-table-column>
                    <el-table-column prop="corpName" label="企业名称">
                        <template #default="scope">
                            <span class="text-ellipsis" :title="scope.row.corpName">{{ scope.row.corpName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="corpCode" label="统一社会信用代码"/>
                    <el-table-column prop="createTime" label="查询时间" sortable />
                    <TableOperatorColumn
                        @[ItemOperate.delete]="(scope: any) => handleDelete(scope.row)"
                        :operators="[
                            { name: '删除', value: ItemOperate.delete, icon: 'ep-delete' },
                        ]">
                    </TableOperatorColumn>
                </CommonTable>

                <CommonPagination
                    v-model:current-page="filterObject.currentPage"
                    v-model:page-size="filterObject.pageSize"
                    :total="listData.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </LoadingBoard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { CorpRepoteRecordTable } from '@/types/corpReportRecord';
import {
    loading,
    allToogle,
    listData,
    activeName,
    filterObject,
    getPageList,
    deleteBatchRecord
} from '@/views/corpuser/record/components/reportRecord';
import { ItemOperate } from '@/components/list';

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

const handleSortChange = async(params: { prop: 'createTime', order: string }) => {
    filterObject.value.currentPage = 1;
    filterObject.value.pageSize = 10;
    filterObject.value.sortField = params.prop;
    filterObject.value.sortType = formatSortType(params.order);
    await getPageList({
        tab: activeName.value
    });
};

let recordAllId: Array<string> = [];
const handleSelectionChange = (val: CorpRepoteRecordTable[]) => {
    allToogle.batchDeleteToogle = false;
    recordAllId = val.map(item => item.id);
    if (recordAllId.length === 0) {
        allToogle.batchDeleteToogle = true;
    }
};

// 批量删除
const batchDelete = () => {
    ElMessageBox.confirm(
        '确定删除已勾选的所有征信报告查询记录吗？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        const params = {
            tab: activeName.value,
            idArr: recordAllId
        };
        return deleteBatchRecord(params)
            .then(async() => {
                ElMessage({
                    type: 'success',
                    message: '删除征信报告查询记录成功',
                });
                await getPageList({
                    tab: activeName.value
                });
            })
            .catch(() => {});
    }).catch(() => {
        allToogle.batchDeleteToogle = false;
    });
};

// 单个删除
const handleDelete = (row: CorpRepoteRecordTable) => {
    ElMessageBox.confirm(
        '确定删除该条征信报告查询记录吗？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        const params = {
            tab: activeName.value,
            idArr: [row.id]
        };
        return deleteBatchRecord(params)
            .then(async() => {
                ElMessage({
                    type: 'success',
                    message: '删除征信报告查询记录成功',
                });
                await getPageList({
                    tab: activeName.value
                });
            })
            .catch(() => {});
    }).catch(() => {});
};

const handleSizeChange = async(val: number) => {
    filterObject.value.currentPage = 1;
    filterObject.value.pageSize = val;
    await getPageList({
        tab: activeName.value
    });
};

const handleCurrentChange = async(val: number) => {
    filterObject.value.currentPage = val;
    await getPageList({
        tab: activeName.value
    });
};

const handleSearchList = async() => {
    filterObject.value.currentPage = 1;
    await getPageList({
        tab: activeName.value
    });
};

watch(() => filterObject.value.searchInput, handleSearchList);
</script>

<style lang="scss" scoped>
.record-container {

    .content {
        :deep(.el-table__cell) {
            padding: 12px;
        }

        .text-ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
