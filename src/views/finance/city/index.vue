<script lang="ts" setup>
import { Search, Plus } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import cityDetail from './components/cityDetail.vue';

interface ICityTable {
    name: string,
    code: string,
    sort: number,
    createBy: string,
    createTime: string,
    updateBy?: string,
    updateTime: string
}

const searchInput = ref('');

const dataSource = [
    {
        name: '沈阳市',
        code: '210100',
        sort: 1,
        createBy: 'XXX',
        createTime: '2022-07-15 20:01:17',
        updateBy: 'YYY',
        updateTime: '2022-09-19 14:01:22',
    }
];

let drawerFlag = ref(false);
let dataDetail = reactive({});

function handleSearch() {
    console.log('搜索');
}

function handleSortChange() {
    console.log('排序');
}

function handleCreateCity() {
    console.log('新建');
}

function handleEdit(index: number, row: ICityTable) {
    console.log('编辑');
    console.log(index, row);
}

function handleDelete(index: number, row: ICityTable) {
    console.log('删除');
    console.log(index, row);
    ElMessageBox.confirm(
        `确定删除“${row.name}”吗？`,
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
        }
    ).then(() => {

    }).catch(() => {

    });
}

function handleToDetail(data: ICityTable) {
    dataDetail = data;
    console.log('详情');
    drawerFlag.value = true;
}

function handleClose() {
    drawerFlag.value = !drawerFlag.value;
}
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
                        :data="dataSource"
                        @sort-change="handleSortChange"
                        style="width: 100%"
                        border>
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
                                    @click="handleEdit(scope.$index, scope.row)"
                                  >编辑</el-button
                                >
                                <el-button
                                    link
                                    type="danger"
                                    size="small"
                                  @click="handleDelete(scope.$index, scope.row)"
                                  >删除</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- <el-drawer
                        v-model="drawerFlag"
                        title="城市详情"
                        size="50%"
                    >
                        <span>123</span>
                    </el-drawer> -->
                    <city-detail :drawerFlag="drawerFlag" :dataDetail="dataDetail" @close="handleClose"></city-detail>
                </div>
            </Board>
        </Layout>
    </PagePanel>
</template>

<style lang="scss">
.city-wrapper {
    padding: 12px;

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
        }
    }
}
</style>
