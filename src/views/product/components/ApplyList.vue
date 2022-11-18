<script lang="ts" setup>
import type { ProductRequirementEntity } from '@/types';
import { List, ListField, ListItem, ListProgress, RectLogo } from '@/components';
import { AcceptProgressType, expectTimeTypeMap, requirmentProgressTypeMap } from '@/enums';

withDefaults(
    defineProps<{
        list?: ProductRequirementEntity[],
    }>(),
    {
        list: () => []
    }
);

const emits = defineEmits<{
    (e: 'click-detail', detail: ProductRequirementEntity): void;
}>();

const colorStatusMap: Record<AcceptProgressType, string> = {
    [AcceptProgressType.all]: 'warning',
    [AcceptProgressType.undo]: 'warning',
    [AcceptProgressType.doing]: '',
    [AcceptProgressType.done]: 'success',
    [AcceptProgressType.refuse]: 'exception',
    [AcceptProgressType.undoIn48]: 'warning'
};
</script>

<template>
  <List class="pdt-list">
        <ListItem v-for="item in list" :key="item.id" class="pdt-list-item">
            <RectLogo :name="item.corpName" />
            <div class="pdt-list-content">
                <div class="pdt-list-info">
                    <div class="pdt-list-item">
                        <ListField
                            label="企业名称"
                            hoverable
                            @click="emits('click-detail', item)"
                        >{{ item.corpName }}</ListField>
                        <ListField label="期望融资金额" type="desc">{{ item.expectFinancing }}万元</ListField>
                    </div>
                    <div class="pdt-list-item">
                        <ListField label="申请产品名称">{{ item.productName }}</ListField>
                        <ListField label="期望放款时间" type="desc">{{ expectTimeTypeMap[item.expectTime] }}</ListField>
                    </div>
                    <div class="pdt-list-item">
                        <ListField label="申请机构名称">{{ item.orgName }}</ListField>
                        <ListField label="联系人" type="desc">{{ item.contactPerson }}</ListField>
                    </div>
                    <div class="pdt-list-item">
                        <ListField label="申请时间">{{ item.updateTime }}</ListField>
                        <ListField label="联系电话" type="desc">{{ item.contactMobile }}</ListField>
                    </div>
                </div>
                <FlexRow class="pdt-list-bottom" horizontal="between">
                    <ListProgress
                        label="需求进度"
                        :progress="item.barCode * 100"
                        :status="colorStatusMap[item.progress]"
                    >
                        {{ requirmentProgressTypeMap[item.progress] }}
                    </ListProgress>
                </FlexRow>
            </div>
        </ListItem>
    </List>
</template>

<style lang="scss">
.pdt-list {
    margin-bottom: $gap-md;
}

.pdt-list-item {
    display: flex;
    column-gap: $gap-md;
}

.pdt-list-content {
    flex: 1;
}

.pdt-list-info {
    display: flex;
    flex: 1;

    & > div {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
}

.pdt-list-item .list-field {
    margin-bottom: $gap-line;
}

.pdt-list-bottom {
    display: flex;
}

.pdt-list-operation {
    & .i-text {
        margin-left: $gap-sm;
    }
}
</style>
