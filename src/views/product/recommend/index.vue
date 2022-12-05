<script lang="ts" setup>
import { getProductRecommends, deleteProductRecommends } from '@/api';
import { useQueryParams, useApi } from '@/composables';
import { PlatformType, ProductRecommandType, productRecommandTypeOptions, productRecommandTypeMap } from '@/enums';
import type { ProductRecommandEntity } from '@/types';
import { noop } from '@/utils';
import { Plus } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';

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
            console.log(res.data);
            recommands.value = res.data;
        });
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

function handleEdit(rd: ProductRecommandEntity) {
    console.log(rd);
    router.push(`${route.path}/edit/${kind.value}?id=${rd.id}`);
}

watch(kind, () => {
    getList();
}, { immediate: true });


</script>

<template>
    <PagePanel>
        <Board class="product-recommend" full>
            <PlatformTab :filter-types="[PlatformType.LiaoXinTong]"/>

            <FlexRow horizontal="between">
                <el-select v-model="kind" @change="goQuery({ kind })">
                    <el-option
                        v-for="opt in productRecommandTypeOptions"
                        :key="opt.value"
                        :value="opt.value"
                        :label="opt.name"/>
                </el-select>

                <RouterLink :to="`${route.path}/edit/${kind}?id=0`">
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
                                <i-ep-close />
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
.product-recommend {
}

.pdt-rmd-tab {
    flex: 1;
    height: 100%;
}

.product-recommand-row {
    gap: $gap-xs;
    padding-top: $gap-sm;
}

.product-recommand-poster {
    width: 230px;
}

.product-recommand-icon {
    cursor: pointer;
}
</style>
