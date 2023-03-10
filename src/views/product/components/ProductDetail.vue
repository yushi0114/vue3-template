<script lang="ts" setup>
import { getProduct } from '@/api';
import { PlatformType } from '@/enums';
import type { ProductEntity, ProductFilterEntity } from '@/types';
import { useApi } from '@/composables';
import { useFilterUnit } from '../hooks/useFilterUnit';

const fixFilterTextsMap = {
    [PlatformType.LiaoXinTong]: ['贷款额度', '贷款期限', '担保方式'],
    [PlatformType.ShiZongFu]: ['融资额度', '融资期限', '担保方式']
};
const { formatterFilterUnit } = useFilterUnit();
const props = withDefaults(
    defineProps<{
        content?: ProductEntity | null;
        platform: PlatformType;
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

    request({ id: props.content.id, platform: props.platform })
        .then(res => {
            detail.value = res;
            fixFilters.value = [];
            filters.value = res.filterList.filter(f => {
                if (fixFilterTextsMap[props.platform].includes(f.typeValue)) {
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
    <DetailDrawer  @open="handleOpen" @closed="handleClosed">
        <!-- -->
        <template #header>
            <Text>产品详情</Text>
        </template>
        <FlexRow vertical="stretch" class="pdt-detail-row">
            <ContentBoard background label="产品名称">
                <Text truncate size="lg" bold color="primary">{{ detail?.name }}</Text>
            </ContentBoard>
            <ContentBoard background label="年化利率">
                <Text truncate size="lg" bold color="primary">{{ detail?.referenceRate }}</Text>
            </ContentBoard>
            <ContentBoard background :label="f.typeValue" v-for="(f, i) in fixFilters" :key="i">
                <Text truncate size="lg" bold color="primary">{{ formatterFilterUnit(f.typeValue as any, f.filterValue) }}</Text>
            </ContentBoard>
        </FlexRow>

        <FlexRow vertical="stretch" class="pdt-detail-row">
            <ContentBoard background label="机构名称">
                <div class="pdt-detail-orgname">
                    <Text truncate size="md" color="regular">{{ detail?.orgName }}</Text>
                </div>
            </ContentBoard>
            <ContentBoard background label="机构Logo">
                <img class="pdt-detail-logo" :src="detail?.logoContent!" />
            </ContentBoard>
        </FlexRow>

        <ContentBoard background label="产品简介">
            <Text size="sm" color="regular">{{ detail?.description }}</Text>
        </ContentBoard>
        <ContentBoard background label="产品特点">
            <Text size="sm" color="regular">{{ detail?.feature }}</Text>
        </ContentBoard>
        <ContentBoard background label="适用客户">
            <Text size="sm" color="regular">{{ detail?.customer }}</Text>
        </ContentBoard>
        <ContentBoard background label="还款方式">
            <Text size="sm" color="regular">{{ detail?.repayment }}</Text>
        </ContentBoard>
        <ContentBoard background label="申请条件">
            <Text size="sm" color="regular">{{ detail?.applicationConditions }}</Text>
        </ContentBoard>
        <ContentBoard background label="所需资料">
            <Text size="sm" color="regular">{{ detail?.requiredMaterials }}</Text>
        </ContentBoard>
        <ContentBoard background label="咨询电话">
            <Text size="sm" color="regular">{{ detail?.supportTel }}</Text>
        </ContentBoard>
        <ContentBoard background :label="f.typeValue" v-for="(f, i) in filters" :key="i">
            <Text size="sm" color="regular">{{ f.filterValue }}</Text>
        </ContentBoard>

    </DetailDrawer>
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
