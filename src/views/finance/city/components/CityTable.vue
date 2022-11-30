<script lang="ts" setup>
import { Search, Plus, EditPen, Delete } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { fetchCityList, deleteCity } from '@/api/city';
import type { ICityTable } from '@/types/city';

import CityDetail from './CityDetail.vue';
import CityModal from './CityModal.vue';

const dataSource = ref<ICityTable[]>([]);

const searchInput = ref('');

const allToogle = reactive({
    loading: true,
    drawerFlag: false,
    dialogFlag: false
});

const dataDetail = reactive({
    data: {}
});

const dataEdit = reactive({
    data: {},
    title: ''
});

// 分页配置项
const page = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
});

// 排序
const sort = reactive({
    sortField: 'sort',
    sortType: 'asc'
});

onMounted(() => {
    getCityList();
});

// 获取城市列表
const getCityList = () => {
    const params = {
        name: searchInput.value,
        pageIndex: page.currentPage,
        pageSize: page.pageSize,
        sortField: sort.sortField,
        sortType: sort.sortType
    };

    allToogle.loading = true;
    return fetchCityList(params)
        .then((res) => {
            dataSource.value = res.data;
            page.total = res.pageTotal;
        })
        .catch(() => {})
        .finally(() => {
            allToogle.loading = false;
        });
};

// 刷新城市列表
const refreshTable = () => {
    page.currentPage = 1;
    getCityList();
};

const handleSearch = (isClear: boolean) => {
    if (isClear) {
        page.currentPage = 1;
        getCityList();
    } else {
        if (searchInput.value.length >= 2) {
            page.currentPage = 1;
            getCityList();
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
        getCityList();
    }
};

const handleCreateCity = () => {
    allToogle.dialogFlag = true;
    dataEdit.data = {};
    dataEdit.title = '新建城市';
};

const handleEdit = (row: ICityTable) => {
    allToogle.dialogFlag = true;
    dataEdit.data = { ...row };
    dataEdit.title = '编辑城市';
};

const handleDelete = (row: ICityTable) => {
    const params = {
        id: row.id
    };

    ElMessageBox.confirm(
        `确定删除“${row.name}”吗？`,
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        return deleteCity(params)
            .then(() => {
                ElMessage({
                    type: 'success',
                    message: '删除城市成功',
                });
                refreshTable();
            })
            .catch(() => {});
    }).catch(() => {}).finally(() => {
        allToogle.loading = false;
    });
};

const handleToDetail = (data: ICityTable) => {
    dataDetail.data = { ...data };
    allToogle.drawerFlag = true;
};

const handleDrawerClose = (val: boolean) => {
    allToogle.drawerFlag = val;
};

const handleDialogClose = (val: boolean) => {
    allToogle.dialogFlag = val;
};

const handleSizeChange = (val: number) => {
    page.currentPage = 1;
    page.pageSize = val;
    getCityList();
};

const handleCurrentChange = (val: number) => {
    page.currentPage = val;
    getCityList();
};

</script>

<template>
    <div class="city-table">
        <div class="table-header">
            <el-input
                class="searchInput"
                placeholder="请输入关键字进行查询"
                v-model.trim="searchInput"
                size="large"
                clearable
                @clear="handleSearch(true)"
                @keyup.enter="handleSearch(false)"
            >
                <template #append>
                    <el-button :icon="Search" @click="handleSearch(false)" />
                </template>
            </el-input>
            <el-button type="primary" :icon="Plus" @click="handleCreateCity">新建</el-button>
        </div>
        <div class="table-content">
            <el-table
                v-loading="allToogle.loading"
                :data="dataSource"
                :default-sort="{ prop: 'sort', order: 'ascending' }"
                @sort-change="handleSortChange"
                style="width: 100%"
                :header-cell-style="{
                    color: '#595959',
                    'background-color': '#f3f4f8'
                }"
            >
                <el-table-column label="城市名称">
                    <template #default="scope">
                        <div @click="handleToDetail(scope.row)" class="underline-text">{{ scope.row.name }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="code" label="行政区划代码" />
                <el-table-column prop="sort" label="排序" sortable/>
                <el-table-column prop="createBy" label="创建者" />
                <el-table-column prop="createTime" label="创建时间" sortable />
                <el-table-column prop="updateTime" label="更新时间" sortable />
                <el-table-column>
                    <template #header>
                        <span class="header-options">操作</span>
                    </template>
                    <template #default="scope">
                        <el-button
                            :icon="EditPen"
                            text
                            @click="handleEdit(scope.row)"
                        ></el-button>
                        <el-button
                            :icon="Delete"
                            text
                            @click="handleDelete(scope.row)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                v-model:currentPage="page.currentPage"
                v-model:page-size="page.pageSize"
                :page-sizes="[10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total"
                :background = true
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                class="table-pagination"
            />

            <city-detail :drawerVisible="allToogle.drawerFlag" :dataDetail="dataDetail.data" @close="handleDrawerClose"></city-detail>
            <city-modal :dialogVisible="allToogle.dialogFlag" :dataEdit="dataEdit" @close="handleDialogClose" @refresh="refreshTable"></city-modal>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.city-table {

    .table-header {
        min-height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .searchInput {
            width: 350px;
        }
    }

    .table-content {
        :deep(.el-table__cell) {
            padding: 12px;
        }

        .underline-text {
            text-decoration: underline;
            cursor: pointer;
            &:hover {
                color: #1B5CFF;
            }
        }

        .header-options {
            padding-left: 34px;
        }

        .table-pagination {
            margin-top: 20px;
            justify-content: flex-end;
        }
    }
}
</style>
