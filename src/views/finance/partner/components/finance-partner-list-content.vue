<template>
    <div class="search-box">
        <el-input
            class="search-input"
            size="large"
            placeholder="请输入合作伙伴名称进行查询"
            @clear="handleClear"
            clearable
            @keyup.enter="handleSearchList"
            v-model="filterObject.searchInput">
            <template #append>
                <el-button :icon="Search" @click="handleSearchList" />
            </template>
        </el-input>
        <el-button type="primary" :icon="Plus" @click="handleCreateNewItem">新建</el-button>
    </div>
    <el-table
        :data="listData.list" style="width: 100%"
        @sort-change="handleSortChange"
        :default-sort="{ prop: 'updateTime', order: 'descending' }"
        :header-cell-style="{
                    color: '#595959',
                    'background-color': '#f3f4f8'
                }">
        <el-table-column prop="name" label="合作伙伴"/>
        <el-table-column prop="imgUrl" label="LOGO">
            <template #default="scope">
                <el-image style="height: 40px;" :src="scope.row.imgUrl"></el-image>
            </template>
        </el-table-column>
        <el-table-column>
            <template #header>
                <span class="header-options">操作</span>
            </template>
            <template #default="scope">
                <el-button text :icon="EditPen"  @click.prevent="handleEditItem(scope.row)" />
                <el-button text :icon="Delete" @click.prevent="handleRemoveItem(scope.row)" />
            </template>
        </el-table-column>
    </el-table>
    <div class="page-content">
        <el-pagination
            v-if="listData.total"
            class="margin-20-20"
            v-model:current-page="filterObject.currentPage"
            v-model:page-size="filterObject.currentSize"
            :page-sizes="[10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listData.total"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script lang="ts" setup>
import { Search, Plus, EditPen, Delete } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import { LoadingService } from '@/views/system/loading-service';
import {
    activeName,
    currentId,
    fileList,
    filterObject,
    form,
    formType,
    getPageList,
    listData,
    mode,
    remove,
    resetFilterObject,
    resetForm
} from '@/views/finance/partner/components/finance-partner';
import type { FinancePartnerListItemType } from '@/types/finance';
import { dataURLToFile } from '@/utils';

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

async function handleSortChange(params: { prop: 'updateTime' | 'createTime', order: string }) {
    console.log(params);
    LoadingService.getInstance().loading();
    filterObject.value.currentPage = 0;
    filterObject.value.currentSize = 10;
    filterObject.value.sortField = params.prop;
    filterObject.value.sortType = formatSortType(params.order);
    await getPageList({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
}

async function handleSearchList() {
    LoadingService.getInstance().loading();
    filterObject.value.currentPage = 1;
    await getPageList({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
}

async function handleClear() {
    LoadingService.getInstance().loading();
    resetFilterObject();
    await getPageList({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
}

function handleEditItem(item: FinancePartnerListItemType) {
    mode.value = 'form';
    formType.value = 'edit';
    form.value.name = item.name;
    form.value.imgUrl = item.imgUrl;
    fileList.value = [
        {
            name: dataURLToFile(item.imgUrl).name,
            url: item.imgUrl
        }
    ];
    form.value.status = item.status === 1;
    currentId.value = item.id;
}

async function handleCreateNewItem() {
    mode.value = 'form';
    formType.value = 'create';
    currentId.value = '';
    resetForm();
}

async function handleCurrentChange(item: number) {
    filterObject.value.currentPage = item;
    LoadingService.getInstance().loading();
    await getPageList({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
}

async function handleSizeChange(item: number) {
    filterObject.value.currentPage = 1;
    filterObject.value.currentSize = item;
    LoadingService.getInstance().loading();
    await getPageList({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
}

function handleRemoveItem(item: FinancePartnerListItemType) {
    ElMessageBox.confirm(
        `确定删除“${item.name}”的合作伙伴吗？`,
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async() => {
            await remove({
                id: item.id
            });
            await getPageList({
                tab: activeName.value
            });
        })
        .catch(() => {});
}

</script>

<style scoped lang="scss">
.search-box {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;

    .search-input {
        width: 350px;
    }
}

.header-options {
    padding-left: 15px;
}
</style>
