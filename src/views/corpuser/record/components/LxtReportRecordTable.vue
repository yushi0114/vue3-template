<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { getRecordList } from '@/api/corpReportRecord';
import type { CorpRepoteRecordTable } from '@/types/corpReportRecord';

const reportRecordList = ref<CorpRepoteRecordTable[]>([]);

const searchInput = ref('');

const allToogle = reactive({
    loading: true
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
        menuName: 'record',
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

const searchRecordList = (isClear: boolean) => {
    if (isClear) {
        page.currentPage = 1;
        getReportRecordList();
    } else {
        if (searchInput.value.length >= 2) {
            page.currentPage = 1;
            getReportRecordList();
        } else {
            ElMessage({
                type: 'error',
                message: '输入内容不能少于2个字符',
            });
        }
    }
};

const handleSortChange = ({ prop, order } : { prop: string, order: string }) => {
    sort.sortField = prop;
    if (order) {
        sort.sortType = order.slice(0, -6);
        getReportRecordList();
    }
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
                clearable
                @clear="searchRecordList(true)"
                @keyup.enter="searchRecordList(false)"
            >
                <template #append>
                    <el-button :icon="Search" @click="searchRecordList(false)" />
                </template>
            </el-input>
        </div>
        <div class="content">
            <el-table
                v-loading="allToogle.loading"
                :data="reportRecordList"
                :default-sort="{ prop: 'createTime', order: 'descending' }"
                @sort-change="handleSortChange"
                style="width: 100%"
                :header-cell-style="{
                    color: '#595959',
                    'background-color': '#f3f4f8'
                }"
            >
                <el-table-column prop="inquiry" label="查询账号"></el-table-column>
                <el-table-column prop="corpName" label="企业名称">
                    <template #default="scope">
                        <span class="text-ellipsis" :title="scope.row.corpName">{{ scope.row.corpName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="corpCode" label="统一社会信用代码"/>
                <el-table-column prop="createTime" label="查询时间" sortable />
            </el-table>

            <el-pagination
                v-model:current-page="page.currentPage"
                v-model:page-size="page.pageSize"
                :page-sizes="[10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                class="table-pagination"
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
            height: 40px;
        }
    }

    .content {
        :deep(.el-table__cell) {
            padding: 12px;
        }
        .text-ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .table-pagination {
            margin-top: 20px;
            justify-content: end;
        }
    }
}
</style>
