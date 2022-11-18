<script lang="ts" setup>
import { useQueryParams } from '@/composables';
import { PlatformType, ProductRecommandType, productRecommandTypeOptions, productRecommandTypeMap } from '@/enums';
import { Plus } from '@element-plus/icons-vue';

const { queryParams, goQuery } = useQueryParams({
    kind: ProductRecommandType.primary
});
const route = useRoute();
const kind = ref(queryParams.value.kind);
const kindName = computed<string>(() => {
    return productRecommandTypeMap[queryParams.value.kind];
});

function getList() {

}

watch(kind, () => {
    getList();
    nextTick(() => {
        console.log(kindName.value);
    });
}, { immediate: true });


</script>

<template>
    <PagePanel>
        <Board class="product-recommend" full>
            <PlatformTab :filter-types="[PlatformType.LiaoXinTong]"/>

            <FlexRow horizontal="between">
                <el-select v-model="kind" @change="(type: ProductRecommandType) => goQuery({ kind })">
                    <el-option
                        v-for="opt in productRecommandTypeOptions"
                        :key="opt.value"
                        :value="opt.value"
                        :label="opt.name"/>
                </el-select>

                <RouterLink :to="`${route.path}/create/${kind}`">
                    <el-button :icon="Plus" type="primary">新建{{ kindName }}</el-button>
                </RouterLink>
            </FlexRow>
        </Board>
    </PagePanel>
</template>

<style lang="scss">
.product-recommend {
  @apply;
}

.pdt-rmd-tab {
    flex: 1;
    height: 100%;
}
</style>
