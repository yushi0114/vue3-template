<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { CorpUserTable } from '@/types/corpUser';
import { getBusinessUser, updateBusinessUserStatus, deleteBatchUser } from '@/api/corpUser';
import LxtShopDetail from './LxtShopDetail.vue';
import { useListControlModel } from '@/composables';
import { ItemOperate } from '@/components';

const userList = ref<CorpUserTable[]>([]);
const userId = ref('');
const { model } = useListControlModel({
    initialModel: { searchInput: '' }
});

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

// 获取列表
const getCorpUserList = () => {
    const params = {
        searchInput: model.searchInput,
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
    model.searchInput = '';
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

watch(model, () => {
    userList.value = [];
    page.currentPage = 1;
    getCorpUserList();
});
</script>

<template>
    <div class="user-container">
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
        <LoadingBoard :loading="allToogle.loading" :empty="!userList.length">
            <CommonTable
                :data="userList"
                :default-sort="{ prop: 'createTime', order: 'descending' }"
                @sort-change="handleSortChange"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" align="center" width="55" />
                <el-table-column prop="account" label="用户名">
                    <template #default="scope">
                        <TextHoverable underline size="sm" @click="handleToDetail(scope.row)">{{ scope.row.account }}</TextHoverable>
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
                <TableOperatorColumn
                    width="120"
                    @[ItemOperate.delete]="(scope: any) => handleDelete(scope.row)"
                    :operators="[
                        { name: '删除', value: ItemOperate.delete, icon: 'ep-delete' },
                    ]">
                </TableOperatorColumn>
            </CommonTable>
        </LoadingBoard>

        <CommonPagination
            v-model:current-page="page.currentPage"
            v-model:page-size="page.pageSize"
            :total="page.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />

        <LxtShopDetail :drawerVisible="allToogle.drawerFlag" :userId="userId" @close="handleDrawerClose"></LxtShopDetail>
    </div>

</template>

<style lang="scss" scoped>
.user-container {
}
</style>
