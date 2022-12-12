<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { fetchCityList, deleteCity } from '@/api/city';
import type { ICityTable } from '@/types/city';

import CityDetail from './CityDetail.vue';
import CityModal from './CityModal.vue';
import { ItemOperate } from '@/components';

const dataSource = ref<ICityTable[]>([]);
const model = reactive({ searchInput: '' });

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
        name: model.searchInput,
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

watch(model, () => {
    dataSource.value = [];
    page.currentPage = 1;
    getCityList();
});
</script>

<template>
    <ListQueryControl
        v-model="model"
        :filter-row-visible="false"
        :searchConfig="{
            label: '请输入关键字进行查询',
            field: 'searchInput',
        }">

        <template #search-rest>
            <el-button type="primary" :icon="Plus" @click="handleCreateCity">新建</el-button>
        </template>
    </ListQueryControl>
    <LoadingBoard :loading="allToogle.loading" :empty="!dataSource.length">
        <el-table
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
                    <TextHoverable underline size="sm" @click="handleToDetail(scope.row)">{{ scope.row.name }}</TextHoverable>
                </template>
            </el-table-column>
            <el-table-column prop="code" label="行政区划代码" />
            <el-table-column prop="sort" label="排序" sortable/>
            <el-table-column prop="createBy" label="创建者" />
            <el-table-column prop="createTime" label="创建时间" sortable />
            <el-table-column prop="updateTime" label="更新时间" sortable />
            <TableOperatorColumn
                width="120"
                @[ItemOperate.edit]="(scope: any) => handleEdit(scope.row)"
                @[ItemOperate.delete]="(scope: any) => handleDelete(scope.row)"
                :operators="[
                    { name: '编辑', value: ItemOperate.edit, icon: 'ep-edit-pen' },
                    { name: '删除', value: ItemOperate.delete, icon: 'ep-delete' },
                ]">
            </TableOperatorColumn>
        </el-table>
    </LoadingBoard>
    <CommonPagination
        v-model:currentPage="page.currentPage"
        v-model:page-size="page.pageSize"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />

    <city-detail :drawerVisible="allToogle.drawerFlag" :dataDetail="dataDetail.data" @close="handleDrawerClose"></city-detail>
    <city-modal :dialogVisible="allToogle.dialogFlag" :dataEdit="dataEdit" @close="handleDialogClose" @refresh="refreshTable"></city-modal>
</template>

<style lang="scss" scoped>
</style>
