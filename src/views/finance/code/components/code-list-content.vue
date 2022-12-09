<template>
    <ListQueryControl
        v-model="financeCodeFilterObject"
        :filterRowVisible="false"
        :searchConfig="{
            label: '请输入关键字进行查询',
            field: 'searchInput',
        }">
        <template v-slot:search-rest>
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
        </template>
    </ListQueryControl>
    <LoadingBoard :loading="loading" :empty="!codeList.list.length">
        <el-table
            :data="codeList.list"
            style="width: 100%"
            @sort-change="handleSortChange"
            :default-sort="{ prop: 'updateTime', order: 'descending' }"
            :header-cell-style="{
                color: '#595959',
                'background-color': '#f3f4f8'
            }">
            <el-table-column label="机构名称">
                <template #default="scope">
                    <TextHoverable underline size="sm" @click="handleToDetail(scope.row)">{{
                            scope.row.orgName
                        }}
                    </TextHoverable>
                </template>
            </el-table-column>
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
    </LoadingBoard>
    <CommonPagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="financeCodeFilterObject.currentPage"
        :total="codeList.total" />
    <code-detail
        :drawer-visible="isDrawerShow"
        :data-detail="dataDetail"
        @close="handleDrawerClose"></code-detail>
</template>

<script lang="ts" setup>
import type { UploadRequestOptions } from 'element-plus';
import {
    codeList,
    deleteFinanceCode,
    downloadExcelTemplate,
    exportFinanceCodeList,
    financeCodeFilterObject,
    goCreateFormView,
    goEditFormView,
    importFinanceCodeList,
    setFinanceCodeList,
    loading,
} from './code-list';
import type { FinanceCodeListItemType } from '@/types/finance';
import CodeDetail from '@/views/finance/code/components/code-detail.vue';

const dataDetail = ref<FinanceCodeListItemType>();
const isDrawerShow = ref<boolean>(false);


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
    await importFinanceCodeList(param.file);
    await setFinanceCodeList();
}

async function handleCreateNewItem() {
    await goCreateFormView();
}

function handleToDetail(item: FinanceCategoryListItemType) {
    dataDetail.value = item;
    isDrawerShow.value = true;
}

function handleDrawerClose() {
    isDrawerShow.value = false;
}

async function handleEditItem(item: FinanceCodeListItemType) {
    await goEditFormView(item);
}

async function handleDownloadList() {
    await exportFinanceCodeList();
}

async function handleDownloadExcelTemplate() {
    await downloadExcelTemplate();
}

async function handleSortChange(params: { prop: 'updateTime' | 'createTime', order: string }) {
    financeCodeFilterObject.currentPage = 1;
    financeCodeFilterObject.currentSize = 10;
    financeCodeFilterObject.sortField = params.prop === 'updateTime' ? 'update_time' : 'create_time';
    financeCodeFilterObject.sortType = formatSortType(params.order);
    await setFinanceCodeList();
}

async function handleSearchList() {
    financeCodeFilterObject.currentPage = 1;
    financeCodeFilterObject.currentSize = 10;
    await setFinanceCodeList();
}

async function handleCurrentChange(item: number) {
    financeCodeFilterObject.currentPage = item;
    await setFinanceCodeList();
}

async function handleSizeChange(item: number) {
    financeCodeFilterObject.currentSize = item;
    await setFinanceCodeList();
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
        .then(async() => {
            await deleteFinanceCode(item.id);
            await setFinanceCodeList();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            });
        });
}

watch(() => financeCodeFilterObject.searchInput, handleSearchList);

onMounted(setFinanceCodeList);
</script>

<style scoped lang="scss">
</style>
