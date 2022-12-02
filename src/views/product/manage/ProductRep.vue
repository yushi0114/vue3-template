<script lang="ts" setup>
import { acceptProgressTypeOptions, PlatformType } from '@/enums';
import { getProductOptions, getProductReqs, getTopOrgs } from '@/api';
import type { PlainOption, ProductRequirementEntity } from '@/types';
import { ProductReqList, ProductReqDetail } from '../components';
import { noop } from '@/utils';
import { useListControlModel, useApi } from '@/composables';

const route = useRoute();
const platform = ref(Number(route.params.type));
const { model: listControlModel, clear: clearModel } = useListControlModel({
    numberFields: ['progress'],
});
const count = ref(0);
const list = ref<ProductRequirementEntity[]>([]);
const topOrgOptions = ref<PlainOption[]>([]);
const productOptions = ref<PlainOption[]>([]);
const detail = ref<ProductRequirementEntity | null>(null);
const { request: requestOrgOptions } = useApi(getTopOrgs, { cache: true });
const { request: requestPdtOptions } = useApi(getProductOptions, { cache: true });

function getList() {
    getProductReqs(Object.assign({ platform: platform.value }, listControlModel))
        .then(({ total, data }) => {
            count.value = total;
            list.value = data;
        })
        .catch(noop);
}

watch(listControlModel, () => {
    nextTick(getList);
});

function clear() {
    count.value = 0;
    list.value = [];
    clearModel();
}

function handleTabChange(plat: PlatformType) {
    clear();
    platform.value = plat;
}

function goDetail(req: ProductRequirementEntity) {
    detail.value = req;
}

onBeforeMount(() => {
    requestOrgOptions()
        .then(res => topOrgOptions.value = res.data.map(({ orgId, orgName }) => ({ name: orgName, value: orgId })));

    // requestPdtOptions({ platform: platform.value })
    //     .then(res => {
    //         productOptions.value = res.map(({ id, name }) => ({ name, value: id }));
    //     });
});

onMounted(() => {
    getList();
});

</script>

<template>
    <PagePanel>
        <Board class="product-apply">
            <PlatformTab @tab-change="handleTabChange" />
            <ListQueryControl
                v-model="listControlModel"
                :searchConfig="{
                    label: '请输入产品名称',
                    field: 'searchInput'
                }"
                :filterOptionsConfigs="[
                    { label: '机构名称', field: 'orgId', options: topOrgOptions },
                    { label: '产品状态', field: 'progress', options: acceptProgressTypeOptions },
                ]"
                :sortConfigs="[
                    { label: '申请时间', field: 'createTime', },
                ]"
                :dateRangeConfig="{
                    label: '申请时间',
                    field: '',
                    options: [
                        { name: '开始月份', value: 'startTime', },
                        { name: '结束月份', value: 'endTime', },
                    ]
                }"
            >
                <template v-slot:search-rest>
                    <RouterLink :to="`${route.path}/new/1`">
                        <el-button type="primary"><i-ep-download />下载</el-button>
                    </RouterLink>
                </template>
            </ListQueryControl>
            <Text>
            </Text>

            <ProductReqList :list="list" @item-detail="goDetail" />

            <FlexRow horizontal="end">
                <el-pagination v-model:current-page="listControlModel.pageIndex"
                    v-model:page-size="listControlModel.pageSize" :page-sizes="[10, 20, 50]"
                    layout="total, sizes, prev, pager, next, jumper" :total="count" />
            </FlexRow>
        </Board>

        <ProductReqDetail
            :modelValue="!!detail"
            @closed="detail = null"
            :content="detail" />
    </PagePanel>
</template>
<style lang="postcss">
.product-apply {
    @apply;
}
</style>
