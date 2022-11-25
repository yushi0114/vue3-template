<template>
    <div class="search-box">
        <el-input
            class="search-input"
            placeholder="请输入搜索内容"
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
        <el-button type="primary" @click="handleCreateNewItem">
            <template #icon>
                <Icon :name="'ep:plus'"></Icon>
            </template>
            新建
        </el-button>
    </div>
    <el-table
        :data="listData.list" style="width: 100%"
        @sort-change="handleSortChange"
        :default-sort="{ prop: 'updateTime', order: 'descending' }">
        <el-table-column prop="name" label="伙伴名称" width="180"/>
        <el-table-column prop="imgUrl" label="图片">
            <template #default="scope">
                <el-image style="height: 40px;" :src="scope.row.imgUrl"></el-image>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
            <template #default="scope">
                <el-button
                    type="primary"
                    size="small"
                    @click.prevent="handleEditItem(scope.row)">
                    <template #icon>
                        <Icon :name="'ep:edit'"></Icon>
                    </template>
                </el-button>
                <el-button
                    type="danger"
                    size="small"
                    @click.prevent="handleRemoveItem(scope.row)">
                    <template #icon>
                        <Icon :name="'ep:delete'"></Icon>
                    </template>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="page-content">
        <el-pagination
            class="margin-20-20"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="filterObject.currentPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listData.total">
        </el-pagination>
    </div>
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
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
import type { FinancePartnerListItemType } from '@/views/finance/type/finance-parnter.type';
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
    filterObject.value.currentPage = 0;
    filterObject.value.currentSize = 10;
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

function handleCurrentChange(item: number) {
    filterObject.value.currentPage = item;
}

function handleSizeChange(item: number) {
    filterObject.value.currentSize = item;
}

function handleRemoveItem(item: FinancePartnerListItemType) {
    ElMessageBox.confirm(
        '确定要删除当前用户吗？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            await remove({
                id: item.id
            });
            await getPageList({
                tab: activeName.value
            });
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            });
        });
}

</script>

<style scoped lang="scss">
.search-box {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;

    .search-input {
        max-width: 220px;
    }
}

.page-content {
    display: flex;
    justify-content: right;
    padding-top: 10px;
}
</style>
