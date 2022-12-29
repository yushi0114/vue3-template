<template>
    <div class="shop-cart-container">
        <el-drawer
            v-model="innerModel"
            title="购物车详情"
            size="60%"
            :before-close="handleClose"
            @open="getInfoList"
        >
            <div class="header">
                <el-input
                    class="searchInput"
                    placeholder="请输入产品名称进行查询"
                    v-model.trim="searchInput"
                    size="large"
                    clearable
                    @clear="searchInfoList(true)"
                    @keyup.enter="searchInfoList(false)"
                >
                    <template #append>
                        <el-button :icon="Search" @click="searchInfoList(false)" />
                    </template>
                </el-input>
            </div>
            <div class="content">
            <LoadingBoard :loading="shopInfoloading" :empty="!shopCarInfoList.length">
                <CommonTable
                    :data="shopCarInfoList"
                >
                    <el-table-column prop="name" label="产品名称">
                        <template #default="scope">
                            <span class="text-ellipsis" :title="scope.row.name">{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="guaranty" label="担保方式">
                        <template #default="scope">
                            <span class="text-ellipsis" :title="scope.row.guaranty">{{ scope.row.guaranty }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="orgName" label="机构名称">
                        <template #default="scope">
                            <span class="text-ellipsis" :title="scope.row.orgName">{{ scope.row.orgName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="referenceRate" label="年化利率">
                        <template #default="scope">
                            <span class="text-ellipsis" :title="scope.row.referenceRate">{{ scope.row.referenceRate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="loanDue" label="贷款期限">
                        <template #default="scope">
                            <span class="text-ellipsis" :title="scope.row.loanDue">{{ scope.row.loanDue }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="loanLimit" label="贷款额度">
                        <template #default="scope">
                            <span class="text-ellipsis" :title="scope.row.loanLimit">{{ scope.row.loanLimit }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template #default="scope">
                            <el-switch
                                v-model="scope.row.status"
                                :active-value="1"
                                :inactive-value="0"
                                disabled
                            ></el-switch>
                        </template>
                    </el-table-column>
                </CommonTable>

                <CommonPagination
                    v-model:current-page="page.currentPage"
                    v-model:page-size="page.pageSize"
                    :total="page.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
                </LoadingBoard>
            </div>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import {
    shopInfoloading,
    activeName,
    page,
    shopCarInfoList,
    getShopCartInfo,
} from '@/views/corpuser/user/components/userTable';

const props = defineProps({
    drawerVisible: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
        default: ''
    }
});

const emit = defineEmits<{
  (e: 'close', flag: boolean): void
  (e: 'update:drawerVisible', visible: boolean): void
}>();

const innerModel = computed({
    get: () => props.drawerVisible,
    set: (val) => emit('update:drawerVisible', val)
});
const searchInput = ref('');

// 获取详情列表
const getInfoList = async() => {
    const params = {
        tab: activeName.value,
        searchInput: searchInput.value,
        pageIndex: page.currentPage,
        pageSize: page.pageSize,
        id: props.userId
    };
    await getShopCartInfo(params);
};

// 搜索
const searchInfoList = (isClear: boolean) => {
    if (isClear) {
        page.currentPage = 1;
        getInfoList();
    } else {
        if (searchInput.value.length >= 2) {
            page.currentPage = 1;
            getInfoList();
        } else {
            ElMessage({
                type: 'error',
                message: '输入内容不能少于2个字符',
            });
        }
    }
};

const handleSizeChange = (val: number) => {
    page.currentPage = 1;
    page.pageSize = val;
    getInfoList();
};

const handleCurrentChange = (val: number) => {
    page.currentPage = val;
    getInfoList();
};


const handleClose = () => {
    searchInput.value = '';
    shopCarInfoList.value = [];
    emit('close', false);
};

</script>

<style lang="scss" scoped>
.shop-cart-container {
    :deep(.el-drawer__body) {
        padding-top: 0;
    }

    .header {
        min-height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 6px;
        margin-bottom: 20px;

        .searchInput {
            width: 350px;
        }
    }

    .content {
        :deep(.el-table__cell) {
            padding: 12px;
        }
        .text-ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
