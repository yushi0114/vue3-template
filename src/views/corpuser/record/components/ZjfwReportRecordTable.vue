<script lang="ts" setup>
import { Search, Delete } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getZfRecordList, deleteBatchZfRecord } from '@/api/corpReportRecord';
import type { CorpRepoteRecordTable } from '@/types/corpReportRecord';

const reportRecordList = ref<CorpRepoteRecordTable[]>([]);

const searchInput = ref('');

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
        searchInput: searchInput.value,
        pageIndex: page.currentPage,
        pageSize: page.pageSize,
        sortField: sort.sortField,
        sortType: sort.sortType
    };

    allToogle.loading = true;
    return getZfRecordList(params)
        .then((res) => {
            reportRecordList.value = res.data;
            page.total = res.total;
        })
        .catch(() => {})
        .finally(() => {
            allToogle.loading = false;
        });
};

const searchRecordList = () => {
    page.currentPage = 1;
    getReportRecordList();
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
        idArr: recordAllId,
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
        return deleteBatchZfRecord(params)
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
        idArr: [row.id],
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
        return deleteBatchZfRecord(params)
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
    searchInput.value = '';
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

</script>

<template>
    <div class="record-container">
        <div class="header">
            <el-input
                class="searchInput"
                placeholder="请输入关键字进行查询"
                v-model.trim="searchInput"
                size="large"
                clearable
                @clear="searchRecordList"
                @keyup.enter="searchRecordList"
            >
                <template #append>
                    <el-button :icon="Search" @click="searchRecordList" />
                </template>
            </el-input>
            <el-button type="danger" :icon="Delete" :disabled="allToogle.batchDeleteToogle" @click="batchDelete">批量删除</el-button>
        </div>
        <div class="content">
            <el-table
                v-loading="allToogle.loading"
                :data="reportRecordList"
                :default-sort="{ prop: 'createTime', order: 'descending' }"
                @sort-change="handleSortChange"
                @selection-change="handleSelectionChange"
                style="width: 100%"
                :header-cell-style="{
                    color: '#595959',
                    'background-color': '#f3f4f8'
                }"
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
                <el-table-column>
                    <template #header>
                        <span class="header-options">操作</span>
                    </template>
                    <template #default="scope">
                        <el-button
                            :icon="Delete"
                            text
                            @click="handleDelete(scope.row)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <CommonPagination
                v-model:current-page="page.currentPage"
                v-model:page-size="page.pageSize"
                :total="page.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
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
