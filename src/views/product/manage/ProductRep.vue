<script lang="ts" setup>
import { acceptProgressTypeOptions } from '@/enums';
import { getProductReqs, getTopOrgs } from '@/api';
import type { PlainOption, ProductRequirementEntity } from '@/types';
import { ProductReqList, ProductReqDetail } from '../components';
import { noop } from '@/utils';
import { useListControlModel, useApi } from '@/composables';

const { back } = useRouter();
const route = useRoute();
const platform = ref(Number(route.params.p));
const { model: listControlModel } = useListControlModel({
    numberFields: ['progress'],
});
const count = ref(0);
const list = ref<ProductRequirementEntity[]>([]);
const topOrgOptions = ref<PlainOption[]>([]);
const detail = ref<ProductRequirementEntity | null>(null);
const { request: requestOrgOptions } = useApi(getTopOrgs, { cache: true });

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
        <Board class="product-apply space-y-2">
            <FlexRow>
                <el-button
                    class="mr-2"
                    @click="back"
                    ><i-ep-back></i-ep-back>返回</el-button
                >
                <div
                    class="text-$el-text-color-secondary"
                    >当前产品：{{ listControlModel.productName }}</div
                >
            </FlexRow>
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
                    <el-button type="primary"><i-ep-download />下载</el-button>
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
<style lang="scss">
.product-apply {
    height: 100%;
}
</style>
