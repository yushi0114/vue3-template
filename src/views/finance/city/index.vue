<script lang="ts" setup>
import { Search, Plus } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage, ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { fetchCityList, type CityEntity } from '@/api/finance';
import type { ICityTable } from '@/types/city';

import cityDetail from './components/CityDetail.vue';
import cityModal from './components/CityModal.vue';

let dataSource = reactive<CityEntity[]>([]);

let searchInput = ref('');

let loading = ref(true);

let drawerFlag = ref(false);

let dialogFlag = ref(false);

let dataDetail = reactive({
    data: {}
});

let dataEdit = reactive({
    data: {},
    title: ''
});

// 分页配置项
let page = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
});

// 分页器使用中文包
const locale = zhCn;

// 排序
let sort = reactive({
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
        menuName: 'city',
        sortField: sort.sortField,
        sortType: sort.sortType
    };
    loading.value = true;
    return fetchCityList(params)
        .then((res) => {
            Object.assign(dataSource, res.data);
            page.total = res.pageTotal;
        })
        .catch(() => {})
        .finally(() => {
            loading.value = false;
        });
};

const handleSearch = () => {
    page.currentPage = 1;
    getCityList();
};

const handleSortChange = ({ prop, order }) => {
    sort.sortField = prop;
    if (order) {
        sort.sortType = order.slice(0, -6);
        getCityList();
    }
};

const handleCreateCity = () => {
    dialogFlag.value = true;
    dataEdit.data = {};
    dataEdit.title = '新建城市';
};

const handleEdit = (row: ICityTable) => {
    dialogFlag.value = true;
    dataEdit.data = { ...row };
    dataEdit.title = '编辑城市';
};

const handleDelete = (row: ICityTable) => {
    ElMessageBox.confirm(
        `确定删除“${row.name}”吗？`,
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        ElMessage({
            type: 'success',
            message: '删除成功',
        });
    }).catch(() => {});
};

const handleToDetail = (data: ICityTable) => {
    dataDetail.data = { ...data };
    drawerFlag.value = true;
};

const handleDrawerClose = (val: boolean) => {
    drawerFlag.value = val;
};

const handleDialogClose = (val: boolean) => {
    dialogFlag.value = val;
};

const handleSizeChange = (val: number) => {
    page.pageSize = val;
    getCityList();
};

const handleCurrentChange = (val: number) => {
    page.currentPage = val;
    getCityList();
};

</script>

<template>
    <PagePanel class="city-wrapper">
        <Layout>
            <el-row class="page-header">
                <el-col :span="24">
                    <div class="page-title">城市管理</div>
                </el-col>
            </el-row>
            <Board class="board">
                <div class="table-header">
                    <el-input
                        class="searchInput"
                        placeholder="请输入关键字进行查询"
                        v-model.trim="searchInput"
                        clearable
                        @clear="handleSearch"
                        @keyup.enter="handleSearch"
                    >
                        <template #append>
                            <el-button :icon="Search" @click="handleSearch" />
                        </template>
                    </el-input>
                    <el-button type="primary" :icon="Plus" @click="handleCreateCity">新建</el-button>
                </div>
                <div class="table-content">
                    <el-table
                        v-loading="loading"
                        :data="dataSource"
                        @sort-change="handleSortChange"
                        style="width: 100%"
                    >
                        <el-table-column label="城市名称">
                            <template #default="scope">
                                <div @click="handleToDetail(scope.row)" class="underline-text">{{ scope.row.name }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="code" label="行政区划代码" />
                        <el-table-column prop="sort" label="排序" sortable/>
                        <el-table-column prop="createBy" label="创建者" />
                        <el-table-column prop="createTime" label="创建时间" sortable/>
                        <el-table-column prop="updateBy" label="更新时间" sortable/>
                        <el-table-column label="操作">
                            <template #default="scope">
                                <el-button
                                    link
                                    type="primary"
                                    size="small"
                                    @click="handleEdit(scope.row)"
                                  >编辑</el-button
                                >
                                <el-button
                                    link
                                    type="danger"
                                    size="small"
                                  @click="handleDelete(scope.row)"
                                  >删除</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>

                    <ElConfigProvider :locale="locale">
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
                    </ElConfigProvider>

                    <city-detail :drawerVisible="drawerFlag" :dataDetail="dataDetail.data" @close="handleDrawerClose"></city-detail>
                    <city-modal :dialogVisible="dialogFlag" :dataEdit="dataEdit" @close="handleDialogClose"></city-modal>
                </div>
            </Board>
        </Layout>
    </PagePanel>
</template>

<style lang="scss" scoped>
.city-wrapper {

    .page-header {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 20px;
    };

    .board {
        padding: 20px;

        .table-header {
            min-height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            .searchInput {
                width: 350px;
                height: 40px;
            }
        }

        .table-content {
            .underline-text {
                text-decoration: underline;
                cursor: pointer;
                &:hover {
                    color: #1B5CFF;
                }
            }

            .table-pagination {
                margin-top: 20px;
                justify-content: end;
            }
        }
    }
}
</style>
