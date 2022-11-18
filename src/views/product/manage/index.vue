<script lang="ts" setup>
import { acceptProgressTypeOptions, onlineTypeOptions, PlatformType } from '@/enums';
import { getProducts } from '@/api';
import type { ProductEntity } from '@/types';
import { ProductList } from '../components';
import { noop } from '@/utils';
import { useListControlModel } from '@/composables';

const route = useRoute();
const platform = ref(Number(route.params.type));

const { model: listControlModel, clear: clearModel } = useListControlModel();


const count = ref(0);
const list = ref<ProductEntity[]>([]);
function getList() {
    getProducts(Object.assign({ platform: platform.value }, listControlModel))
        .then(({ total, data }) => {
            count.value = total;
            list.value = data;
        })
        .catch(noop);
}

watch(listControlModel, () => {
    nextTick(getList);
}, { immediate: true });

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
    console.log(req);
}

</script>

<template>
  <PagePanel>
    <Board class="product-manage">
        <PlatformTab @tab-change="handleTabChange" />
        <ListQueryControl
            v-model="listControlModel"
            :searchConfig="{
                label: '请输入产品名称',
                field: 'searchInput'
            }"
            :filterOptionsConfigs="[
                // { label: '机构名称', field: 'org', options: [] },
                { label: '产品状态', field: 'status', options: onlineTypeOptions },
            ]"
            :sortConfigs="[
                { label: '申请时间', field: 'createTime', },
            ]"
        >
            <template v-slot:search-rest>
                <RouterLink :to="`${route.path}/new/1`">
                    <el-button type="primary">新建</el-button>
                </RouterLink>
            </template>
        </ListQueryControl>
        <Text>
        </Text>

        <ProductList :list="list" @click-detail="goDetail" />

        <FlexRow horizontal="end">
            <el-pagination
                v-model:current-page="listControlModel.pageIndex"
                v-model:page-size="listControlModel.pageSize"
                :page-sizes="[10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="count"
            />
        </FlexRow>
    </Board>
  </PagePanel>
</template>
<style lang="postcss">
.product-manage {
  @apply;
}
</style>
