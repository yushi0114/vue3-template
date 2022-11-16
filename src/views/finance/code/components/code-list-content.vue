<template>
    <div class="search-box">
        <el-input class="search-input" placeholder="请输入搜索内容" v-model="financeCodeFilterObject.searchInput">
            <template #append>
                <el-button>
                    <template #icon>
                        <Icon :name="'ep:search'"></Icon>
                    </template>
                </el-button>
            </template>
        </el-input>
        <el-button type="primary" @click="handleCreateNewRole">
            <template #icon>
                <Icon :name="'ep:plus'"></Icon>
                新建
            </template>
        </el-button>
    </div>
    <el-table :data="codeList.list" style="width: 100%">
        <el-table-column prop="orgName" label="机构名称" width="180"/>
        <el-table-column prop="orgCode" label="机构编码" width="180"/>
        <el-table-column prop="orgTypeName" label="机构分类" width="180"/>
        <el-table-column prop="createBy" label="创建者" width="180"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="updateTime" label="更新时间"/>
        <el-table-column label="操作" width="180">
            <template #default="scope">
                <el-button
                    type="primary"
                    size="small"
                    @click.prevent="handleEditRoleItem(scope.row)"
                >
                    编辑
                </el-button>
                <el-button
                    type="danger"
                    size="small"
                    @click.prevent="handleRemoveRoleItem(scope.row)"
                >
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="page-content">
        <el-pagination
            class="margin-20-20"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="financeCodeFilterObject.currentPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="codeList.total">
        </el-pagination>
    </div>
</template>

<script lang="ts" setup>
import type { RoleListItemType } from '@/views/system/type/role-list.type';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
    codeForm,
    codeList,
    currentCodeId,
    financeCodeFilterObject,
    formType,
    mode,
    setCityCodeList,
    setFinanceCodeList,
    setOrgTypeCodeList
} from './code-list';
import { LoadingService } from '@/views/system/loading-service';
import type { FinanceCodeListItemType } from '@/views/finance/type/finance-code.type';
import { deleteFinanceCode } from '@/api/finance/finance-code';

async function handleEditRoleItem(item: FinanceCodeListItemType) {
    LoadingService.getInstance().loading();
    mode.value = 'form';
    formType.value = 'edit';
    currentCodeId.value = item.id;
    await setOrgTypeCodeList();
    await setCityCodeList();
    codeForm.value = {
        cityCode: item.cityCode,
        orgCode: item.orgCode,
        orgName: item.orgName,
        orgTypeCode: item.orgTypeCode,
        address: item.address
    };
    LoadingService.getInstance().stop();

}

function handleCurrentChange(item: number) {
    financeCodeFilterObject.currentPage = item;
}

function handleSizeChange(item: number) {
    financeCodeFilterObject.currentSize = item;
}

async function handleCreateNewRole() {
    mode.value = 'form';
    formType.value = 'create';
    await setOrgTypeCodeList();
    await setCityCodeList();
}

function handleRemoveRoleItem(item: RoleListItemType) {
    ElMessageBox.confirm(
        '确定要删除当前角色吗？',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            await deleteFinanceCode({
                id: item.id,
                menuName: ''
            });
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            await setFinanceCodeList();
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
