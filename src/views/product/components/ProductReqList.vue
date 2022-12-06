<script lang="ts" setup>
import type { ProductRequirementEntity } from '@/types';
import { ItemOperate, ListField, ListProgress, RectLogo, type ListOperatorOption } from '@/components';
import { AcceptProgressType, expectTimeTypeMap, requirmentProgressTypeMap } from '@/enums';
import { REQ_TABLE_COLUMNS, REQ_TABLE_CONFIG} from '../constants';
import { isEmptyPlainObject } from '@/utils';

const props = withDefaults(
    defineProps<{
        list?: ProductRequirementEntity[],
        loading?: boolean,
        isSelectAll?: boolean;
        isIndeterminate?: boolean;
    }>(),
    {
        list: () => [],
        loading: false,
        isSelectAll: false,
        isIndeterminate: false
    }
);

const emits = defineEmits<{
    (e: ItemOperate.delete, detail: ProductRequirementEntity): void;
    (e: ItemOperate.detail, detail: ProductRequirementEntity): void;
    (e: 'multi-selection', selection: string[]): void;
}>();

const sjcTableRef = ref();
const colorStatusMap: Record<AcceptProgressType, string> = {
    [AcceptProgressType.all]: 'warning',
    [AcceptProgressType.undo]: 'warning',
    [AcceptProgressType.doing]: '',
    [AcceptProgressType.done]: 'success',
    [AcceptProgressType.refuse]: 'exception',
    [AcceptProgressType.undoIn48]: 'warning'
};

function handleOperate(opt: ListOperatorOption<ItemOperate>, item: ProductRequirementEntity) {
    if (opt.disabled) return;
    emits(opt.value as any, item);
}

const handleSelectionChange = (selection: any) => {
    emits('multi-selection', selection);
};

watch(() => props.isSelectAll, () => {
    sjcTableRef.value?.toggleAllSelection();
});

</script>

<template>
    <sjc-table
        class="pdt-list"
        ref="sjcTableRef"
        :table-data="list"
        :loading="loading"
        :columns="REQ_TABLE_COLUMNS"
        :show-header="false"
        :table-config="REQ_TABLE_CONFIG"
        :showPagination="false"
        @multi-selection="handleSelectionChange">
        <template #reqLogo="{ scope }">
            <RectLogo :name="scope.row.corpName" />
        </template>
        <template #append="{ props: { row: item } }: {props: { row: ProductRequirementEntity}}">
            <div class="pdt-list-content" v-if="!isEmptyPlainObject(item)">
                <div class="pdt-list-info">
                    <div class="pdt-list-item">
                        <ListField
                            label="企业名称"
                            hoverable
                            @click="emits(ItemOperate.detail, item)"
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
        </template>
        <template #handler="{ scope }">
            <ListOperator
                :max-out-count="1"
                @operate="(opt: ListOperatorOption<ItemOperate>) => handleOperate(opt, scope.row)"
                :operators="[
                    { name: '删除', value: ItemOperate.delete, icon: 'ep-delete' },
                ]"
            />
        </template>
    </sjc-table>
  <!-- <List class="pdt-list">
        <ListItem v-for="item in list" :key="item.id" class="pdt-list-item">
            <RectLogo :name="item.corpName" />
            <div class="pdt-list-content">
                <div class="pdt-list-info">
                    <div class="pdt-list-item">
                        <ListField
                            label="企业名称"
                            hoverable
                            @click="emits(ItemOperate.detail, item)"
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

            <ListOperator
                :max-out-count="1"
                @operate="(opt: ListOperatorOption<ItemOperate>) => handleOperate(opt, item)"
                :operators="[
                    { name: '删除', value: ItemOperate.delete, icon: 'ep-delete' },
                ]"
            />
        </ListItem>
    </List> -->
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
