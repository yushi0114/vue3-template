<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getRecordList, deleteBatchRecord } from '@/api/corpReportRecord';
import type { CorpRepoteRecordTable } from '@/types/corpReportRecord';
import { useListControlModel } from '@/composables';
import { ItemOperate } from '@/components/list';

const reportRecordList = ref<CorpRepoteRecordTable[]>([]);
const { model } = useListControlModel({
    initialModel: { searchInput: '' }
});

const allToogle = reactive({
    loading: true,
    batchDeleteToogle: true
});

// 排序
const sort = reactive({
    sortField: 'createTime',
    sortType: 'desc'
});

// 分页配置项
const page = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
});

onMounted(() => {
    getReportRecordList();
});

// 获取列表
const getReportRecordList = () => {
    const params = {
        searchInput: model.searchInput,
        pageIndex: page.currentPage,
        pageSize: page.pageSize,
        sortField: sort.sortField,
        sortType: sort.sortType
    };

    allToogle.loading = true;
    return getRecordList(params)
        .then((res) => {
            reportRecordList.value = res.data;
            page.total = res.total;
        })
        .catch(() => {})
        .finally(() => {
            allToogle.loading = false;
        });
};

const handleSortChange = ({ prop, order } : { prop: string, order: string }) => {
    sort.sortField = prop;
    if (order) {
        sort.sortType = order.slice(0, -6);
        getReportRecordList();
    }
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
    const params = {
        idArr: recordAllId
    };
    ElMessageBox.confirm(
        '确定删除已勾选的所有征信报告查询记录吗？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        return deleteBatchRecord(params)
            .then(() => {
                ElMessage({
                    type: 'success',
                    message: '删除征信报告查询记录成功',
                });
                refreshTable();
            })
            .catch(() => {});
    }).catch(() => {
        allToogle.batchDeleteToogle = false;
    });
};

// 单个删除
const handleDelete = (row: CorpRepoteRecordTable) => {
    const params = {
        idArr: [row.id]
    };

    ElMessageBox.confirm(
        '确定删除该条征信报告查询记录吗？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        return deleteBatchRecord(params)
            .then(() => {
                ElMessage({
                    type: 'success',
                    message: '删除征信报告查询记录成功',
                });
                refreshTable();
            })
            .catch(() => {});
    }).catch(() => {});
};

// 刷新列表
const refreshTable = () => {
    model.searchInput = '';
    getReportRecordList();
};

const handleSizeChange = (val: number) => {
    page.currentPage = 1;
    page.pageSize = val;
    getReportRecordList();
};

const handleCurrentChange = (val: number) => {
    page.currentPage = val;
    getReportRecordList();
};

watch(model, () => {
    reportRecordList.value = [];
    page.currentPage = 1;
    getReportRecordList();
});
</script>

<template>
    <div class="record-container">
        <ListQueryControl
            v-model="model"
            :filter-row-visible="false"
            :searchConfig="{
                label: '请输入关键字进行查询',
                field: 'searchInput',
            }">

            <template #search-rest>
                <el-button type="danger" :icon="Delete" :disabled="allToogle.batchDeleteToogle" @click="batchDelete">批量删除</el-button>
            </template>
        </ListQueryControl>
        <div class="content">
            <LoadingBoard :loading="allToogle.loading" :empty="!reportRecordList.length">
            <CommonTable
                :data="reportRecordList"
                :default-sort="{ prop: 'createTime', order: 'descending' }"
                @sort-change="handleSortChange"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55">
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
                v-model:current-page="page.currentPage"
                v-model:page-size="page.pageSize"
                :total="page.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
            </LoadingBoard>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.record-container {
    .header {
        min-height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 6px;
        margin-bottom: 20px;

        .searchInput {
            width: 350px;
        }
    }

    .content {
        :deep(.el-table__cell) {
            padding: 12px;
        }
        .header-options {
            padding-left: 7px;
        }

        .text-ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
