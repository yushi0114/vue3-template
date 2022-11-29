<script lang="ts" setup>
import { Search, Delete } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { CorpUserTable } from '@/types/corpUser';
import { getBusinessUser, updateBusinessUserStatus, deleteBatchUser } from '@/api/corpUser';
import LxtShopDetail from './LxtShopDetail.vue';

const userList = ref<CorpUserTable[]>([]);
const searchInput = ref('');
const userId = ref('');

const allToogle = reactive({
    loading: true,
    drawerFlag: false,
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
    getCorpUserList();
});

const searchUserList = (isClear: boolean) => {
    if (isClear) {
        page.currentPage = 1;
        getCorpUserList();
    } else {
        if (searchInput.value.length >= 2) {
            page.currentPage = 1;
            getCorpUserList();
        } else {
            ElMessage({
                type: 'error',
                message: '输入内容不能少于2个字符',
            });
        }
    }
};

// 获取列表
const getCorpUserList = () => {
    const params = {
        searchInput: searchInput.value,
        pageIndex: page.currentPage,
        pageSize: page.pageSize,
        sortField: sort.sortField,
        sortType: sort.sortType
    };

    allToogle.loading = true;
    return getBusinessUser(params)
        .then((res) => {
            userList.value = res.data;
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
        getCorpUserList();
    }
};

const handleToDetail = (data: CorpUserTable) => {
    allToogle.drawerFlag = true;
    userId.value = data.id;
};

const handleDrawerClose = (val: boolean) => {
    allToogle.drawerFlag = val;
};

// 变更用户状态
const changeUserStatus = (row: CorpUserTable, index: number) => {
    const text = row.status === 1 ? '启用' : '停用';
    ElMessageBox.confirm(
        `确定变更用户“${row.account}”的状态为${text}吗？`,
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        const params = {
            status: row.status,
            account: row.account
        };

        return updateBusinessUserStatus(params)
            .then(async() => {
                await refreshTable();
                ElMessage({
                    type: 'success',
                    message: '变更用户状态成功',
                });
            })
            .catch(() => {
                row.status === 1 ? userList.value[index].status = 0 : userList.value[index].status = 1;
            });
    }).catch(() => {
        row.status === 1 ? userList.value[index].status = 0 : userList.value[index].status = 1;
    });
};

// 刷新用户列表
const refreshTable = () => {
    searchInput.value = '';
    getCorpUserList();
};

let userAllId: Array<string> = [];
const handleSelectionChange = (val: CorpUserTable[]) => {
    allToogle.batchDeleteToogle = false;
    userAllId = val.map(item => item.id);
    if (userAllId.length === 0) {
        allToogle.batchDeleteToogle = true;
    }
};

// 批量删除
const batchDelete = () => {
    const params = {
        idArr: userAllId
    };
    ElMessageBox.confirm(
        '确定删除已勾选的所有用户吗？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        return deleteBatchUser(params)
            .then(() => {
                ElMessage({
                    type: 'success',
                    message: '删除用户成功',
                });
                refreshTable();
            })
            .catch(() => {});
    }).catch(() => {
        allToogle.batchDeleteToogle = false;
    });
};

// 单个删除
const handleDelete = (row: CorpUserTable) => {
    const params = {
        idArr: [row.id]
    };

    ElMessageBox.confirm(
        `确定删除用户名为“${row.account}”的用户吗？`,
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        return deleteBatchUser(params)
            .then(() => {
                ElMessage({
                    type: 'success',
                    message: '删除用户成功',
                });
                refreshTable();
            })
            .catch(() => {});
    }).catch(() => {});
};

const handleSizeChange = (val: number) => {
    page.currentPage = 1;
    page.pageSize = val;
    getCorpUserList();
};

const handleCurrentChange = (val: number) => {
    page.currentPage = val;
    getCorpUserList();
};

</script>

<template>
    <div class="user-container">
        <div class="header">
            <el-input
                class="searchInput"
                placeholder="请输入关键字进行查询"
                v-model.trim="searchInput"
                size="large"
                clearable
                @clear="searchUserList(true)"
                @keyup.enter="searchUserList(false)"
            >
                <template #append>
                    <el-button :icon="Search" @click="searchUserList(false)" />
                </template>
            </el-input>
            <el-button type="danger" :disabled="allToogle.batchDeleteToogle" @click="batchDelete">批量删除</el-button>
        </div>
        <div class="content">
            <el-table
                v-loading="allToogle.loading"
                :data="userList"
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
                <el-table-column prop="account" label="用户名">
                    <template #default="scope">
                        <div @click="handleToDetail(scope.row)" class="underline-text">{{ scope.row.account }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" sortable />
                <el-table-column prop="updateTime" label="更新时间" sortable />
                <el-table-column label="状态">
                    <template #default="scope">
                        <el-switch
                            v-model="scope.row.status"
                            :active-value="1"
                            :inactive-value="0"
                            @change="changeUserStatus(scope.row, scope.$index)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-tooltip content="删除" placement="top-start">
                            <el-button
                                :icon="Delete"
                                text
                                @click="handleDelete(scope.row)"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
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

            <LxtShopDetail :drawerVisible="allToogle.drawerFlag" :userId="userId" @close="handleDrawerClose"></LxtShopDetail>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.user-container {
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
        .underline-text {
            text-decoration: underline;
            cursor: pointer;
            &:hover {
                color: #1B5CFF;
            }
        }

        .table-pagination {
            margin-top: 20px;
            justify-content: flex-end;
        }
    }
}
</style>
