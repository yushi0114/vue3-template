<template>
    <div class="search-box">
        <el-input
            class="search-input"
            size="large"
            placeholder="请输入关键字进行搜索"
            @clear="handleClear"
            clearable
            @keyup.enter="handleSearchList"
            v-model="filterObject.searchInput">
            <template #append>
                <el-button @click="handleSearchList">
                    <template #icon>
                        <Icon :name="'ep:search'"></Icon>
                    </template>
                </el-button>
            </template>
        </el-input>
    </div>
    <el-table
        :data="listData.list" style="width: 100%"
        @sort-change="handleSortChange"
        :default-sort="{ prop: 'updateTime', order: 'descending' }"
        :header-cell-style="{
            color: '#595959',
            'background-color': '#f3f4f8'
        }">
        <el-table-column prop="orgName" label="所属机构" width="260"/>
        <el-table-column prop="account" label="手机号码"/>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column label="状态" align="center">
            <template #default="scope">
                <el-switch
                    v-model="scope.row.status"
                    :active-value="1"
                    :inactive-value="0"
                    disabled
                ></el-switch>
            </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建人"/>
        <el-table-column prop="createTime" sortable label="创建时间"/>
        <el-table-column prop="updateTime" sortable label="更新时间"/>
    </el-table>
    <CommonPagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filterObject.currentPage"
        :total="listData.total" />
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import { LoadingService } from '@/views/system/loading-service';
import { filterObject, getPageList, listData, resetFilterObject } from './finance-org-user';

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'create_ime', order: string }) {
    LoadingService.getInstance().loading();
    filterObject.value.currentPage = 0;
    filterObject.value.currentSize = 10;
    filterObject.value.sortField = 'create_time';
    filterObject.value.sortType = formatSortType(params.order);
    await getPageList();
    LoadingService.getInstance().stop();
}

async function handleSearchList() {
    LoadingService.getInstance().loading();
    filterObject.value.currentPage = 0;
    filterObject.value.currentSize = 10;
    await getPageList();
    LoadingService.getInstance().stop();
}

async function handleClear() {
    LoadingService.getInstance().loading();
    resetFilterObject();
    await getPageList();
    LoadingService.getInstance().stop();
}


async function handleCurrentChange(item: number) {
    filterObject.value.currentPage = item;
    LoadingService.getInstance().loading();
    await getPageList();
    LoadingService.getInstance().stop();
}

async function handleSizeChange(item: number) {
    filterObject.value.currentSize = item;
    LoadingService.getInstance().loading();
    await getPageList();
    LoadingService.getInstance().stop();
}

</script>

<style scoped lang="scss">
.search-box {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;

    .search-input {
        max-width: 350px;
    }
}

.page-content {
    display: flex;
    justify-content: right;
    padding-top: 10px;
}
</style>
