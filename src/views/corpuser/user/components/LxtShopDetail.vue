<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { getShopCartInfo } from '@/api/corpUser';
import type { ShopCartTable } from '@/types/corpUser';

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

const loading = ref(true);
const shopCarInfoList = ref<ShopCartTable[]>([]);
const searchInput = ref('');

// 分页配置项
const page = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
});

// 获取详情列表
const getInfoList = () => {
    const params = {
        searchInput: searchInput.value,
        pageIndex: page.currentPage,
        pageSize: page.pageSize,
        id: props.userId
    };

    loading.value = true;
    return getShopCartInfo(params)
        .then((res) => {
            shopCarInfoList.value = res.data;
            page.total = res.total;
        })
        .catch(() => {})
        .finally(() => {
            loading.value = false;
        });
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

const emit = defineEmits<{
  (e: 'close', flag: boolean): void
}>();

const handleClose = () => {
    searchInput.value = '';
    emit('close', false);
};

</script>

<template>
    <div class="shop-cart-container">
        <el-drawer
            v-model="drawerVisible"
            title="购物车详情"
            size="60%"
            :before-close="handleClose"
            @open="getInfoList"
        >
            <div class="header">
                <el-input
                    class="searchInput"
                    placeholder="请输入关键字进行查询"
                    v-model.trim="searchInput"
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
                <el-table
                    v-loading="loading"
                    :data="shopCarInfoList"
                    style="width: 100%"
                    :header-cell-style="{
                        color: '#595959',
                        'background-color': '#f3f4f8'
                    }"
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
                </el-table>

                <el-pagination
                    v-model:current-page="page.currentPage"
                    v-model:page-size="page.pageSize"
                    :page-sizes="[10, 20, 50]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    class="table-pagination"
                />
            </div>
        </el-drawer>
    </div>
</template>

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
            height: 40px;
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

        .table-pagination {
            margin-top: 20px;
            justify-content: end;
        }
    }
}
</style>
