<script lang="ts" setup>
import { getProductRecommends, deleteProductRecommends } from '@/api';
import { useQueryParams, useApi } from '@/composables';
import { ProductRecommandType, productRecommandTypeOptions, productRecommandTypeMap, SwitchType } from '@/enums';
import type { ProductRecommandEntity } from '@/types';
import { noop } from '@/utils';
import { Plus } from '@element-plus/icons-vue';
import { ElMessageBox, type TabsPaneContext } from 'element-plus';

const { queryParams, goQuery } = useQueryParams({
    kind: ProductRecommandType.primary
});
const route = useRoute();
const router = useRouter();
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
    router.push(`${route.path}/edit/${kind.value}?id=${rd.id}`);
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
        <Board class="product-recommend" full>
            <el-tabs
                v-model="kind"
                @tab-click="handleRecommendTabClick">
                <el-tab-pane
                    v-for="opt in productRecommandTypeOptions"
                    :key="opt.value"
                    :label="opt.name"
                    :name="opt.value"></el-tab-pane>
            </el-tabs>
            <LoadingBoard :loading="loading" :empty="!recommands.length">
            <FlexRow vertical="start" horizontal="between">
                <FlexRow class="product-recommand-row">
                    <ContentBoard
                        hoverable
                        :disabled="(recommand.status === SwitchType.off)"
                        :label="recommand.name"
                        v-for="(recommand, i) in recommands"
                        :key="i">
                        <template #label-rest>
                            <FlexRow gap="xs">
                                <CircleOptBtn @click="handleEdit(recommand)" :disabled="(recommand.status === SwitchType.off)">
                                    <i-ep-edit-pen />
                                </CircleOptBtn>
                                <CircleOptBtn @click="handleDelete(recommand)" :disabled="(recommand.status === SwitchType.off)">
                                    <i-ep-close />
                                </CircleOptBtn>
                            </FlexRow>
                        </template>
                        <img class="product-recommand-poster" :class="{ disabled: recommand.status === SwitchType.off }" :src="recommand.productPoster" />
                    </ContentBoard>
                </FlexRow>
                <RouterLink :to="`${route.path}/edit/${kind}?id=0`">
                    <el-button :icon="Plus" type="primary">新建{{ kindName }}</el-button>
                </RouterLink>
            </FlexRow>
            <FlexRow class="product-recommand-row" vertical="start">
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
            </LoadingBoard>
        </Board>
    </PagePanel>
</template>

<style lang="scss">
.product-recommand-row {
    flex: 1;
    gap: $gap-xs;
    display: flex;
    flex-wrap: wrap;

    & .opt-btn {
        width: 1.2rem;
        height: 1.2rem;
        font-size: 0.75rem;
        border-radius: 1rem;
        color: $text-color-secondary;

        &:hover {
            background: $color-primary;
            color: $color-white;
        }
    }

    .disabled .opt-btn:hover {
        background: $color-info-light-3;
        color: $color-white;
    }
}

.product-recommand-poster {
    width: 230px;

    &.disabled {
        opacity: 0.5;
    }
}
</style>
