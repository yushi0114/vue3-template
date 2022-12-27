<template>
    <ListQueryControl
        v-model="filterObject"
        :filterRowVisible="false"
        :searchConfig="{
            label: '请输入关键字进行搜索',
            field: 'searchInput',
        }">
        <template v-slot:search-rest>
            <el-button type="danger" :disabled="isDeleteEnabled" @click="handleDeleteItems">
                <template #icon>
                    <Icon :name="'ep:delete'"></Icon>
                </template>
                批量删除
            </el-button>
        </template>
    </ListQueryControl>
    <LoadingBoard :loading="loading" :empty="!listData.list.length">
        <CommonTable
            :data="listData.list"
            @sort-change="handleSortChange"
            @selection-change="handleSelectionChange"
            :default-sort="{ prop: 'createTime', order: 'descending' }"
        >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column prop="orgName" label="机构名称"/>
            <el-table-column prop="inquiry" label="查询账号"/>
            <el-table-column prop="corpName" label="企业名称"/>
            <el-table-column prop="corpCode" label="统一信用代码"/>
            <el-table-column prop="createTime" sortable label="查询时间"/>
            <TableOperatorColumn
                width="120"
                @[ItemOperate.delete]="(scope: any) => handleDeleteItem(scope.row)"
                :operators="[
                    { name: '删除', value: ItemOperate.delete, icon: 'ep-delete' },
                ]">
            </TableOperatorColumn>
        </CommonTable>
        <CommonPagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="filterObject.currentPage"
            :total="listData.total"/>
    </LoadingBoard>
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import { LoadingService } from '@/views/system/loading-service';
import { deleteItems, filterObject, getPageList, listData, loading } from './finance-score';
import { ElMessageBox } from 'element-plus';
import type { FinanceScoreListItemType } from '@/types/finance';
import { ItemOperate } from '@/components';

const isDeleteEnabled = ref<boolean>(true);
const willDeleteList = ref<string[]>([]);


function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'createTime', order: string }) {
    // console.log(params);
    filterObject.value.currentPage = 1;
    filterObject.value.currentSize = 10;
    filterObject.value.sortField = 'create_time';
    filterObject.value.sortType = formatSortType(params.order);
    await getPageList();
}

async function handleSearchList() {
    filterObject.value.currentPage = 1;
    filterObject.value.currentSize = 10;
    await getPageList();
}

async function handleCurrentChange(item: number) {
    filterObject.value.currentPage = item;
    await getPageList();
}

async function handleSizeChange(item: number) {
    filterObject.value.currentSize = item;
    await getPageList();
}

async function handleSelectionChange(list: FinanceScoreListItemType[]) {
    isDeleteEnabled.value = false;
    willDeleteList.value = list.map(item => item.id);
    if (list.length === 0) {
        isDeleteEnabled.value = true;
    }
}

async function handleDeleteItems() {
    ElMessageBox.confirm(
        '确定要删除选中的查询记录吗？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async() => {
            await deleteItems(willDeleteList.value);
            await getPageList();
        })
        .catch(() => {});
}

async function handleDeleteItem(item: FinanceScoreListItemType) {
    ElMessageBox.confirm(
        '确定要删除当前查询记录吗？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async() => {
            LoadingService.getInstance().loading();
            await deleteItems([item.id]);
            await getPageList();
            LoadingService.getInstance().stop();
        })
        .catch(() => {});
}

watch(() => filterObject.value.searchInput, handleSearchList);

onMounted(getPageList);
</script>

<style scoped lang="scss">
</style>
