<template>
    <ListQueryControl
        v-model="financeCodeFilterObject"
        :filterRowVisible="false"
        :searchConfig="{
            label: '请输入机构名称、机构编码进行查询',
            field: 'searchInput',
        }">
        <template v-slot:search-rest>
            <FlexRow gap="sm">
                <el-button @click="handleDownloadExcelTemplate">
                    <FlexRow gap="xs">
                        <Icon :name="'ep:download'"></Icon>
                        下载Excel模板
                    </FlexRow>
                </el-button>
                <el-dropdown split-button type="primary" placement="bottom-end" @click="handleCreateNewItem">
                    <FlexRow gap="xs"><Icon :name="'ep:plus'"></Icon> 新建</FlexRow>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <ElUpload
                                    action=""
                                    :show-file-list="false"
                                    :http-request="handleUpload"
                                    :before-upload="beforeUpload">
                                    <template #trigger>
                                        <FlexRow gap="xs">
                                            <Icon :name="'ep:upload'"></Icon>
                                            上传
                                        </FlexRow>
                                    </template>
                                </ElUpload>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <FlexRow @click="handleDownloadList" gap="xs">
                                    <Icon :name="'ep:download'"></Icon>
                                    下载
                                </FlexRow>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </FlexRow>
        </template>
    </ListQueryControl>
    <sjc-table
        ref="sjcTableRef"
        :loading="loading"
        :table-data="codeList.list"
        :columns="CODE_TABLE_COLUMNS"
        :table-config="CODE_TABLE_CONFIG"
        :showPagination="false"
        @sort-change="handleSortChange"
        :default-sort="{ prop: 'updateTime', order: 'descending' }"
        @filter-change="handleFilterChange"
        >
        <template #orgName="{ scope }">
            <TextHoverable underline size="sm" @click="handleToDetail(scope.row)">{{
                    scope.row.orgName
                }}
            </TextHoverable>
        </template>
        <template #handler="{ scope }">
            <ListOperator
                @[ItemOperate.edit]="handleEditItem(scope.row)"
                @[ItemOperate.delete]="handleRemoveItem(scope.row)"
                :operators="[
                    { name: '编辑', value: ItemOperate.edit, icon: 'ep-edit-pen' },
                    { name: '删除', value: ItemOperate.delete, icon: 'ep-delete' },
                ]">
            </ListOperator>
        </template>
    </sjc-table>
    <CommonPagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="financeCodeFilterObject.currentPage"
        :total="codeList.total"/>
    <CodeForm
        v-model="isFormShow"
        :data-detail="dataDetail"></CodeForm>
    <code-detail
        :drawer-visible="isDrawerShow"
        :data-detail="dataDetail"
        @close="handleDrawerClose"></code-detail>
</template>

<script lang="ts" setup>
import type { UploadRequestOptions } from 'element-plus';
import { CODE_TABLE_COLUMNS, CODE_TABLE_CONFIG } from '../constants';
import {
    codeList,
    deleteFinanceCode,
    downloadExcelTemplate,
    exportFinanceCodeList,
    financeCodeFilterObject,
    goCreateFormView,
    goEditFormView,
    importFinanceCodeList,
    loading,
    setFinanceCodeList,
    setOrgTypeCodeList,
    setCityCodeList
} from './code-list';
import type { FinanceCodeListItemType } from '@/types/finance';
import CodeForm from '@/views/finance/code/components/code-form.vue';
import CodeDetail from '@/views/finance/code/components/code-detail.vue';
import { ItemOperate } from '@/components';

const dataDetail = ref<FinanceCodeListItemType>();
const isDrawerShow = ref<boolean>(false);
const isFormShow = ref<boolean>(false);

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
    isFormShow.value = true;
    await goCreateFormView();
}

function handleToDetail(item: FinanceCodeListItemType) {
    dataDetail.value = item;
    isDrawerShow.value = true;
}

function handleDrawerClose() {
    isDrawerShow.value = false;
}

async function handleEditItem(item: FinanceCodeListItemType) {
    isFormShow.value = true;
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

const handleFilterChange = (filters: { [K in 'orgTypeCodeArr' | 'cityCodeArr']: string[]}) => {
    financeCodeFilterObject.currentPage = 1;
    financeCodeFilterObject.currentSize = 10;
    (Object.keys(filters) as ('orgTypeCodeArr' | 'cityCodeArr')[]).forEach((key) => {
        financeCodeFilterObject[key] = filters[key];
    });
    setFinanceCodeList();
};

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
        .catch(() => {});
}

watch(() => financeCodeFilterObject.searchInput, handleSearchList);

onMounted(() => {
    setFinanceCodeList();
    setOrgTypeCodeList();
    setCityCodeList();
});
</script>

<style scoped lang="scss">
</style>
