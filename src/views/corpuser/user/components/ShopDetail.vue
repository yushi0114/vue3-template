<template>
    <div class="shop-cart-container">
        <el-drawer
            v-model="innerModel"
            title="购物车详情"
            size="60%"
            :before-close="handleClose"
            @open="getInfoList">
            <div class="header">
                <el-input
                    class="searchInput"
                    placeholder="请输入产品名称进行查询"
                    v-model.trim="searchInput"
                    size="large"
                    clearable
                    @clear="searchInfoList(true)"
                    @keyup.enter="searchInfoList(false)">
                    <template #append>
                        <el-button
                            :icon="Search"
                            @click="searchInfoList(false)" />
                    </template>
                </el-input>
                <el-button
                    type="danger"
                    :loading="loadingBatchDelete"
                    :icon="Delete"
                    :disabled="!ids.length"
                    @click="handleBatchDelete"
                    >批量删除</el-button
                >
            </div>
            <div class="content">
                <LoadingBoard
                    :loading="shopInfoloading"
                    :empty="false">
                    <sjc-table
                        ref="sjcTableRef"
                        :table-data="shopCarInfoList"
                        :columns="TABLE_COLUMNS"
                        :show-header="true"
                        :table-config="TABLE_CONFIG"
                        :showPagination="false"
                        @multi-selection="handleSelectionChange">
                        <template #loanDue="{ scope }">
                            <Text size="sm">{{
                                formatterFilterUnit(
                                    (PRODUCT_LIST_FIELDS_MAP as any)[platformType].loan.title,
                                    scope.row.loanDue
                                )
                            }}</Text>
                        </template>
                        <template #loanLimit="{ scope }">
                            <Text size="sm">{{
                                formatterFilterUnit(
                                    (PRODUCT_LIST_FIELDS_MAP as any)[platformType as any].loanLimit.title,
                                    scope.row.loanLimit
                                )
                            }}</Text>
                        </template>
                        <template #status="{ scope }">
                            <el-switch
                                v-model="scope.row.status"
                                :active-value="1"
                                :inactive-value="0"
                                disabled></el-switch>
                        </template>
                        <template #handler="{ scope }">
                            <ListOperator
                                :max-out-count="1"
                                @[ItemOperate.delete]="() => handleDelete(scope.row)"
                                :operators="[{ name: '删除', value: ItemOperate.delete, icon: 'ep-delete' }]" />
                        </template>
                    </sjc-table>

                    <CommonPagination
                        v-model:current-page="page.currentPage"
                        v-model:page-size="page.pageSize"
                        :total="page.total"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" />
                </LoadingBoard>
            </div>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { Search, Delete } from '@element-plus/icons-vue';
import { ItemOperate, type ListOperatorOption } from '@/components';
import { ElMessage } from 'element-plus';
import {
    shopInfoloading,
    activeName,
    platformType,
    page,
    shopCarInfoList,
    getShopCartInfo,
    listData,
} from '@/views/corpuser/user/components/userTable';
import { PRODUCT_LIST_FIELDS_MAP } from '@/views/product/constants';
import { useFilterUnit } from '@/views/product/hooks/useFilterUnit';
import { useTableCheckbox, useApi } from '@/composables';
import type { ITableConfig } from '@/components/SjcTable/types';
import { noop } from '@/utils';
import { CorpUserService } from '@/api/corpUser';
import type { ShopCartTable } from '@/types/corpUser';

const { formatterFilterUnit } = useFilterUnit();

const props = defineProps({
    drawerVisible: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
        default: '',
    },
});

const emit = defineEmits<{
    (e: 'close', flag: boolean): void;
    (e: 'update:drawerVisible', visible: boolean): void;
}>();
const { loading: loadingBatchDelete, request: deleteUser } = useApi(
    (idArr: string) => new CorpUserService(activeName.value as any).getInstance().deleteShopUser({ idArr }),
    {
        onSuccess() {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            getInfoList();
        },
        onError: noop,
    }
);

const innerModel = computed({
    get: () => props.drawerVisible,
    set: (val) => emit('update:drawerVisible', val),
});
const searchInput = ref('');

// 获取详情列表
const getInfoList = async () => {
    const params = {
        tab: activeName.value,
        searchInput: searchInput.value,
        pageIndex: page.currentPage,
        pageSize: page.pageSize,
        id: props.userId,
    };
    await getShopCartInfo(params);
};

const listDataRef = computed(() => {
    return listData.value.list;
});
const { ids, handleSelectionChange } = useTableCheckbox(listDataRef);

// 表格配置项
const TABLE_CONFIG: ITableConfig = reactive({
    showHandler: true,
    showAppend: false,
    showSelection: true,
    appendLabel: '',
    handlerConfig: {
        width: 120,
        label: '操作',
    },
});

// 表格列配置
const TABLE_COLUMNS = [
    {
        label: '产品名称',
        prop: 'name',
    },
    {
        label: '担保方式',
        prop: 'guaranty',
    },
    {
        label: '机构名称',
        prop: 'orgName',
    },
    // 自定义索引
    {
        label: '年化利率',
        prop: 'referenceRate',
    },
    {
        label: (PRODUCT_LIST_FIELDS_MAP as any)[platformType.value].loan.title,
        prop: 'loanDue',
        slotName: 'loanDue',
    },
    {
        label: (PRODUCT_LIST_FIELDS_MAP as any)[platformType.value].loanLimit.title,
        prop: 'loanLimit',
        slotName: 'loanLimit',
    },
    {
        label: '状态',
        prop: 'status',
        slotName: 'status',
    },
];
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

const handleBatchDelete = async () => {
    const idArr = ids.value.map((item) => `"${item}"`).join(',');
    try {
        await ElMessageBox.confirm(`确认删除已选中的${ids.value.length}条购物车数据吗？`, '删除', {
            type: 'warning',
        });
        deleteUser(idArr);
    } catch {
        noop;
    }
};

const handleDelete = async (req: ShopCartTable) => {
    const idArr = `"${req.id}"`;
    try {
        await ElMessageBox.confirm('确认删除此条购物车吗？', '删除', {
            type: 'warning',
        });
        deleteUser(idArr);
    } catch {
        noop;
    }
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
