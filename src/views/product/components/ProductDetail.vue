<script lang="ts" setup>
import { getProduct } from '@/api';
import type { ProductEntity, ProductFilterEntity } from '@/types';
import { useApi } from '@/composables';

const fixFilterTexts = ['贷款额度', '贷款期限', '担保方式'];
const props = withDefaults(
    defineProps<{
        content?: ProductEntity | null
    }>(),
    {
        content: null
    }
);

const emits = defineEmits<{
    (e: 'open'): void
    (e: 'closed'): void
}>();

const detail = ref<ProductEntity | null>(null);
const filters = ref<ProductFilterEntity[]>([]);
const fixFilters = ref<ProductFilterEntity[]>([]);

const { request } = useApi(getProduct);

function handleOpen() {
    if (!props.content) return;

    request({ id: props.content.id })
        .then(res => {
            detail.value = res;
            fixFilters.value = [];
            filters.value = res.filterList.filter(f => {
                if (fixFilterTexts.includes(f.typeValue)) {
                    fixFilters.value.push(f);
                    return false;
                }

                return true;
            });
        });
    emits('open');
}

function handleClosed() {
    detail.value = null;
    emits('closed');

}

</script>

<template>
    <el-drawer :size="850"  @open="handleOpen" @closed="handleClosed">
        <!-- -->
        <template #header>
            <Text>产品详情</Text>
        </template>
        <FlexRow vertical="stretch" class="pdt-detail-row">
            <ContentBoard label="产品名称">
                <Text truncate size="lg" bold color="primary">{{ detail?.name }}</Text>
            </ContentBoard>
            <ContentBoard label="年化利率">
                <Text truncate size="lg" bold color="primary">{{ detail?.referenceRate }}</Text>
            </ContentBoard>
            <ContentBoard :label="f.typeValue" v-for="(f, i) in fixFilters" :key="i">
                <Text truncate size="lg" bold color="primary">{{ f.filterValue }}</Text>
            </ContentBoard>
        </FlexRow>

        <FlexRow vertical="stretch" class="pdt-detail-row">
            <ContentBoard label="机构名称">
                <div class="pdt-detail-orgname">
                    <Text truncate size="md" color="regular">{{ detail?.orgName }}</Text>
                </div>
            </ContentBoard>
            <ContentBoard label="机构Logo">
                <img class="pdt-detail-logo" :src="detail?.logoContent!" />
            </ContentBoard>
        </FlexRow>

        <ContentBoard label="产品简介">
            <Text size="sm" color="regular">{{ detail?.description }}</Text>
        </ContentBoard>
        <ContentBoard label="产品特点">
            <Text size="sm" color="regular">{{ detail?.feature }}</Text>
        </ContentBoard>
        <ContentBoard label="适用客户">
            <Text size="sm" color="regular">{{ detail?.customer }}</Text>
        </ContentBoard>
        <ContentBoard label="还款方式">
            <Text size="sm" color="regular">{{ detail?.repayment }}</Text>
        </ContentBoard>
        <ContentBoard label="申请条件">
            <Text size="sm" color="regular">{{ detail?.applicationConditions }}</Text>
        </ContentBoard>
        <ContentBoard label="所需资料">
            <Text size="sm" color="regular">{{ detail?.requiredMaterials }}</Text>
        </ContentBoard>
        <ContentBoard label="咨询电话">
            <Text size="sm" color="regular">{{ detail?.supportTel }}</Text>
        </ContentBoard>
        <ContentBoard :label="f.typeValue" v-for="(f, i) in filters" :key="i">
            <Text size="sm" color="regular">{{ f.filterValue }}</Text>
        </ContentBoard>

    </el-drawer>
</template>

<style lang="scss">
.pdt-detail-row {
    gap: $gap-sm;
    margin-bottom: $gap-md;
    > * {
        flex: 1;
    }

    .i-content-board {
        margin-top: 0;
    }

}

.pdt-detail-logo {
    max-height: 100px;
    max-width: 200px;
}

.pdt-detail-orgname {
    height: 100%;
    display: flex;
    align-items: center;
}
</style>
