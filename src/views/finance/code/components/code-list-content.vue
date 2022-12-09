<template>
    <div class="search-box">
        <el-input
            class="search-input"
            size="large"
            placeholder="请输入关键字进行搜索"
            clearable
            @keyup.enter="handleSearchList"
            @clear="handleClear"
            v-model="financeCodeFilterObject.searchInput">
            <template #append>
                <el-button @click="handleSearchList">
                    <template #icon>
                        <Icon :name="'ep:search'"></Icon>
                    </template>
                </el-button>
            </template>
        </el-input>
        <div class="right-control">
            <el-button @click="handleDownloadExcelTemplate">
                <template #icon>
                    <Icon :name="'ep:download'"></Icon>
                </template>
                下载Excel模板
            </el-button>
            <el-button type="primary" @click="handleCreateNewItem">
                <template #icon>
                    <Icon :name="'ep:plus'"></Icon>
                </template>
                新建
            </el-button>
            <el-dropdown placement="bottom-end">
                <div class="dropdown-icon">
                    <Icon style="transform: rotate(90deg)" :name="'ep:more'"></Icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <el-upload
                                action=""
                                :show-file-list="false"
                                :http-request="handleUpload"
                                :before-upload="beforeUpload">
                                <template #trigger>
                                    <el-button
                                        link
                                        class="custom-btn"
                                        size="small">
                                        <template #icon>
                                            <Icon :name="'ep:upload'"></Icon>
                                        </template>
                                        上传
                                    </el-button>
                                </template>
                            </el-upload>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <el-button
                                @click="handleDownloadList"
                                link
                                class="custom-btn"
                                size="small">
                                <template #icon>
                                    <Icon :name="'ep:download'"></Icon>
                                </template>
                                下载
                            </el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>
    <el-table
        :data="codeList.list"
        style="width: 100%"
        @sort-change="handleSortChange"
        :default-sort="{ prop: 'updateTime', order: 'descending' }"
        :header-cell-style="{
                    color: '#595959',
                    'background-color': '#f3f4f8'
                }">
        <el-table-column prop="orgName" label="机构名称"/>
        <el-table-column prop="orgCode" label="机构编码" width="180"/>
        <el-table-column prop="orgTypeName" label="机构分类" width="180"/>
        <el-table-column prop="createBy" label="创建者" width="180"/>
        <el-table-column prop="createTime" sortable label="创建时间"/>
        <el-table-column prop="updateTime" sortable label="更新时间"/>
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
    <CommonPagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="financeCodeFilterObject.currentPage"
        :total="codeList.total" />
</template>

<script lang="ts" setup>
import type { UploadRequestOptions } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
    codeList,
    deleteFinanceCode,
    downloadExcelTemplate,
    exportFinanceCodeList,
    financeCodeFilterObject,
    goCreateFormView,
    goEditFormView,
    importFinanceCodeList,
    setFinanceCodeList
} from './code-list';
import { LoadingService } from '@/views/system/loading-service';
import type { FinanceCodeListItemType } from '@/types/finance';

function formatSortType(value: string) {
    return value === 'ascending' ? 'asc' : 'desc';
}

function beforeUpload(file: File) {
    if (!/\.(xlsx|xls)$/.test(file.name)) {
        ElMessage({
            type: 'error',
            message: '只支持xls或xlsx格式的文件',
        });
        return false;
    }
    if (file.size > 2 * 1024 * 1024) {
        ElMessage({
            type: 'error',
            message: '文件大小不能超过2MB',
        });
        return false;
    }
    return true;
}

async function handleUpload(param: UploadRequestOptions) {
    LoadingService.getInstance().loading();
    await importFinanceCodeList(param.file);
    await setFinanceCodeList();
    LoadingService.getInstance().stop();
}

async function handleCreateNewItem() {
    LoadingService.getInstance().loading();
    await goCreateFormView();
    LoadingService.getInstance().stop();
}

async function handleEditItem(item: FinanceCodeListItemType) {
    LoadingService.getInstance().loading();
    await goEditFormView(item);
    LoadingService.getInstance().stop();
}

async function handleDownloadList() {
    await exportFinanceCodeList();
}

async function handleDownloadExcelTemplate() {
    await downloadExcelTemplate();
}

async function handleClear() {
    financeCodeFilterObject.currentPage = 1;
    financeCodeFilterObject.currentSize = 10;
    LoadingService.getInstance().loading();
    await setFinanceCodeList();
    LoadingService.getInstance().stop();
}

async function handleSortChange(params: { prop: 'updateTime' | 'createTime', order: string }) {
    LoadingService.getInstance().loading();
    financeCodeFilterObject.currentPage = 1;
    financeCodeFilterObject.currentSize = 10;
    financeCodeFilterObject.sortField = params.prop === 'updateTime' ? 'update_time' : 'create_time';
    financeCodeFilterObject.sortType = formatSortType(params.order);
    await setFinanceCodeList();
    LoadingService.getInstance().stop();
}

async function handleSearchList() {
    financeCodeFilterObject.currentPage = 1;
    financeCodeFilterObject.currentSize = 10;
    LoadingService.getInstance().loading();
    await setFinanceCodeList();
    LoadingService.getInstance().stop();
}

async function handleCurrentChange(item: number) {
    financeCodeFilterObject.currentPage = item;
    LoadingService.getInstance().loading();
    await setFinanceCodeList();
    LoadingService.getInstance().stop();
}

async function handleSizeChange(item: number) {
    financeCodeFilterObject.currentSize = item;
    LoadingService.getInstance().loading();
    await setFinanceCodeList();
    LoadingService.getInstance().stop();
}

function handleRemoveItem(item: FinanceCodeListItemType) {
    ElMessageBox.confirm(
        '确定要删除当前机构编码吗？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            LoadingService.getInstance().loading();
            await deleteFinanceCode(item.id);
            await setFinanceCodeList();
            LoadingService.getInstance().stop();
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
    padding-bottom: 20px;

    .search-input {
        max-width: 350px;
    }
}

.right-control {
    display: flex;
    align-items: center;
}

.dropdown-icon {
    font-size: 14px;
    cursor: pointer;
    padding: 0 4px;
}
</style>
