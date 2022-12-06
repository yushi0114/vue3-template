<script lang="ts" setup>
import { getProductRecommends, deleteProductRecommends } from '@/api';
import { useQueryParams, useApi } from '@/composables';
import { ProductRecommandType, productRecommandTypeOptions, productRecommandTypeMap } from '@/enums';
import type { ProductRecommandEntity } from '@/types';
import { noop } from '@/utils';
import { Plus } from '@element-plus/icons-vue';
import { ElMessageBox, type TabsPaneContext } from 'element-plus';

const { queryParams, goQuery } = useQueryParams({
    kind: ProductRecommandType.primary
});
const route = useRoute();
const kind = ref(queryParams.value.kind);
const kindName = computed<string>(() => {
    return productRecommandTypeMap[queryParams.value.kind];
});
const { request, loading } = useApi(getProductRecommends);
const recommands = ref<ProductRecommandEntity[]>([]);

function getList() {
    request({ productType: kind.value })
        .then(res => {
            recommands.value = res;
        });
}

watch(kind, () => {
    getList();
}, { immediate: true });

function handleRecommendTabClick(tab: TabsPaneContext) {
    goQuery({ kind: tab.paneName as ProductRecommandType });
}

function handleEdit(rd: ProductRecommandEntity) {
    console.log(rd);
}

function handleDelete(rd: ProductRecommandEntity) {
    ElMessageBox.confirm(
        `您确定删除名为“${rd.name}”的${kindName.value}吗?`,
        `删除${kindName.value}`,
        {
            confirmButtonText: '删除',
        }
    )
        .then(() => deleteProductRecommends({ id: rd.id }))
        .then(() => {
            ElMessage({ message: '删除成功', type: 'success' });
            getList();
        })
        .catch(noop);
}
</script>

<template>
    <PagePanel>
        <Board class="product-recommend" full v-loading="loading">
            <el-tabs 
                v-model="kind"
                @tab-click="handleRecommendTabClick">
                <el-tab-pane
                    v-for="opt in productRecommandTypeOptions"
                    :key="opt.value"
                    :label="opt.name"
                    :name="opt.value"></el-tab-pane>
            </el-tabs>
            <FlexRow horizontal="end">
                <RouterLink :to="`${route.path}/create/${kind}`">
                    <el-button :icon="Plus" type="primary">新建{{ kindName }}</el-button>
                </RouterLink>
            </FlexRow>
            <FlexRow class="product-recommand-row">
                <ContentBoard
                    hoverable
                    :label="recommand.name"
                    v-for="(recommand, i) in recommands"
                    :key="i">
                    <template #label-rest>
                        <FlexRow gap="xs">
                            <TextHoverable color="regular" @click="handleEdit(recommand)">
                                <i-ep-edit />
                            </TextHoverable>
                            <TextHoverable color="regular" @click="handleDelete(recommand)">
                                <i-ep-delete />
                            </TextHoverable>
                        </FlexRow>
                    </template>
                    <img class="product-recommand-poster" :src="recommand.productPoster" />
                </ContentBoard>
            </FlexRow>
        </Board>
    </PagePanel>
</template>

<style lang="scss">
.product-recommand-row {
    gap: $gap-xs;
    padding-top: $gap-sm;
}

.product-recommand-poster {
    width: 230px;
}
</style>
