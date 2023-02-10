<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue';
import { onlineTypeOptions, PlatformType, SwitchType, onlineTypeMap } from '@/enums';
import { getProducts, getTopOrgs, updateProductStatus, deleteProduct, isUsingProduct } from '@/api';
import type { PlainOption, ProductEntity } from '@/types';
import { ProductDetail, ProductList, ProductEdit } from '../components';
import { noop } from '@/utils';
import { useListControlModel, useApi } from '@/composables';

const { push } = useRouter();
const route = useRoute();
const platform = ref(Number(route.params.type));
const topOrgOptions = ref<PlainOption[]>([]);
const detail = ref<ProductEntity | null>(null);

const { model: listControlModel, clear: clearModel } = useListControlModel({
    numberFields: ['status'],
});

const { request: requestOrgOptions } = useApi(getTopOrgs, { cache: true });

const { request: requestProductStatus } = useApi(updateProductStatus, {
    onSuccess() {
        ElMessage({
            type: 'success',
            message: '操作成功',
        });
        getList();
    },
});

const { request: requestDeleteProduct } = useApi(deleteProduct, {
    onSuccess() {
        ElMessage({
            type: 'success',
            message: '操作成功',
        });
        getList();
    },
});

const { request: requestIsUsingProduct } = useApi((params) => isUsingProduct({platform: platform.value, ...params}));

const count = ref(0);
const list = ref<ProductEntity[]>([]);
const loading = ref(false);
const productEditModal = ref<InstanceType<typeof ProductEdit> | null>(null);
function getList() {
    loading.value = true;
    getProducts(Object.assign({ platform: platform.value }, listControlModel))
        .then(({ total, data }) => {
            count.value = total;
            list.value = data;
        })
        .catch(noop)
        .finally(() => {
            loading.value = false;
        });
}

function clear() {
    count.value = 0;
    list.value = [];
    clearModel();
}

function handleTabChange(plat: PlatformType) {
    clear();
    platform.value = plat;
}

function goDetail(req: ProductEntity) {
    detail.value = req;
}

function goReqDetail(req: ProductEntity) {
    push({
        path: `${route.path}/req/${platform.value}`,
        query: {
            productId: req.id,
            productName: req.name
        },
    });
}

const handleEdit = (req: ProductEntity) => {
    requestIsUsingProduct({id: req.id}).then(() => {
        productEditModal.value?.open({ id: req.id });
    }).catch(noop);
};

const handleUpdateStatus = async(req: ProductEntity) => {
    const params = {
        platform: platform.value,
        id: req.id,
        status: req.status === SwitchType.off ? SwitchType.on : SwitchType.off,
    };
    try {
        await ElMessageBox.confirm(`确定${onlineTypeMap[params.status]}标题为“${req.name}”的产品吗？`, '提示', {
            type: 'warning',
        });
        requestProductStatus(params);
    } catch {
        return;
    }
};

const handleDelete = async(req: ProductEntity) => {
    try {
        await requestIsUsingProduct({ id: req.id });
        await ElMessageBox.confirm(`确认删除“${req.name}”的产品吗？`, '删除', {
            type: 'warning',
        });
        requestDeleteProduct({ id: req.id, platform: platform.value });
    } catch {
        noop;
    }
};

watch(
    listControlModel,
    () => {
        nextTick(getList);
    },
    { immediate: true }
);

onBeforeMount(() => {
    requestOrgOptions().then(
        (res) => (topOrgOptions.value = res.data.map(({ orgId, orgName }) => ({ name: orgName, value: orgId })))
    );
});
</script>

<template>
    <PagePanel>
        <Board class="product-manage" full>
            <PlatformTab @tab-change="handleTabChange" />
                <ListQueryControl
                    v-model="listControlModel"
                    :searchConfig="{
                        label: '请输入产品名称进行查询',
                        field: 'searchInput',
                    }"
                    :filterOptionsConfigs="[
                        { label: '机构名称', field: 'orgId', searchable: true, options: topOrgOptions },
                        { label: '产品状态', field: 'status', options: onlineTypeOptions },
                    ]"
                    :sortConfigs="[{ label: '申请时间', field: 'createTime' }]">
                    <template v-slot:search-rest>
                        <RouterLink :to="`${route.path}/new/1`">
                            <el-button type="primary" :icon="Plus">新建</el-button>
                        </RouterLink>
                    </template>
                </ListQueryControl>
                <LoadingBoard :loading="loading" :empty="!list.length">
                    <ProductList
                        :loading="loading"
                        :list="list"
                        :platform="platform"
                        @item-detail="goDetail"
                        @item-req-detail="goReqDetail"
                        @item-edit="handleEdit"
                        @item-online="handleUpdateStatus"
                        @item-offline="handleUpdateStatus"
                        @item-delete="handleDelete" />

                    <CommonPagination
                        v-model:current-page="listControlModel.pageIndex"
                        v-model:page-size="listControlModel.pageSize"
                        :total="count" />
                </LoadingBoard>
        </Board>

        <ProductEdit
            ref="productEditModal"
            :platform="platform"
            @success="getList" />

        <ProductDetail
            :platform="platform"
            :modelValue="!!detail"
            @closed="detail = null"
            :content="detail" />
    </PagePanel>
</template>
<style lang="scss">
.product-manage {
    height: 100%;
}
</style>
