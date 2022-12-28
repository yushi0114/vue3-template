<template>
    <div class="user-container">
        <ListQueryControl
            v-model="filterObject"
            :filter-row-visible="false"
            :searchConfig="{
                label: '请输入用户名进行查询',
                field: 'searchInput',
            }">

            <template #search-rest>
                <el-button type="danger" :icon="Delete" :disabled="allToogle.batchDeleteToogle" @click="batchDelete">批量删除</el-button>
            </template>
        </ListQueryControl>
        <LoadingBoard :loading="loading" :empty="!listData.list.length">
            <CommonTable
                :data="listData.list"
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

            <CommonPagination
                v-model:current-page="filterObject.currentPage"
                v-model:page-size="filterObject.pageSize"
                :total="listData.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                />
        </LoadingBoard>

        <ShopDetail :drawerVisible="allToogle.drawerFlag" :userId="userId" @close="handleDrawerClose"></ShopDetail>
    </div>

</template>

<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { CorpUserTable } from '@/types/corpUser';
import {
    loading,
    allToogle,
    listData,
    activeName,
    filterObject,
    getPageList,
    changeStatus,
    deleteUser
} from '@/views/corpuser/user/components/userTable';
import { ItemOperate } from '@/components';
import ShopDetail from './ShopDetail.vue';

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

const handleSortChange = async(params: { prop: 'updateTime' | 'createTime', order: string }) => {
    filterObject.value.currentPage = 1;
    filterObject.value.pageSize = 10;
    filterObject.value.sortField = params.prop;
    filterObject.value.sortType = formatSortType(params.order);
    await getPageList({
        tab: activeName.value
    });
};

const userId = ref('');
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
            tab: activeName.value,
            status: row.status,
            account: row.account
        };
        return changeStatus(params)
            .then( async() => {
                ElMessage({
                    type: 'success',
                    message: '变更用户状态成功',
                });
                await getPageList({
                    tab: activeName.value
                });
            })
            .catch(() => {
                row.status === 1 ? listData.value.list[index].status = 0 : listData.value.list[index].status = 1;
            });
    }).catch(() => {
        row.status === 1 ? listData.value.list[index].status = 0 : listData.value.list[index].status = 1;
    });
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
    ElMessageBox.confirm(
        '确定删除已勾选的所有用户吗？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        const params = {
            tab: activeName.value,
            idArr: userAllId
        };
        return deleteUser(params)
            .then(async() => {
                ElMessage({
                    type: 'success',
                    message: '删除用户成功',
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
const handleDelete = (row: CorpUserTable) => {
    ElMessageBox.confirm(
        `确定删除用户名为“${row.account}”的用户吗？`,
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
        return deleteUser(params)
            .then(async() => {
                ElMessage({
                    type: 'success',
                    message: '删除用户成功',
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
