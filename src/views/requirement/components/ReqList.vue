<script lang="ts" setup>
import { AcceptProgressType, expectTimeTypeMap, requirmentProgressTypeMap } from '@/enums';
import type { RequirementEntity } from '@/types';
import { ItemOperate, ListField, ListProgress, RectLogo, type ListOperatorOption } from '@/components';
import { TABLE_CONFIG, TABLE_COLUMNS} from '../constants';

const props = withDefaults(
    defineProps<{
        list?: RequirementEntity[],
        loading?: boolean;
        isSelectAll?: boolean;
    }>(),
    {
        list: () => [],
        loading: false,
        isSelectAll: false,
    }
);

const emits = defineEmits<{
    (e: ItemOperate.detail, detail: RequirementEntity): void;
    (e: ItemOperate.delete, detail: RequirementEntity): void;
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

function handleOperate(opt: ListOperatorOption<ItemOperate>, item: RequirementEntity) {
    if (opt.disabled) return;
    emits(ItemOperate.delete as any, item);
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
        class="req-list"
        ref="sjcTableRef"
        :table-data="list"
        :loading="loading"
        :columns="TABLE_COLUMNS"
        :show-header="false"
        row-class-name="tr-item"
        :table-config="TABLE_CONFIG"
        :showPagination="false"
        @multi-selection="handleSelectionChange">
        <template #reqLogo="{ scope }">
            <RectLogo :name="scope.row.corpName" />
        </template>
        <template #append="{ props }">
            <div class="req-list-content">
                <div class="req-list-info">
                    <div class="req-list-item">
                        <ListField label="企业名称" hoverable @click="emits(ItemOperate.detail, props.row)">{{ props.row.corpName }}</ListField>
                        <ListField label="联系人" type="desc">{{ props.row.contactPerson }}</ListField>
                    </div>
                    <div class="req-list-item">
                        <ListField label="期望融资金额">{{ props.row.expectFinancing }}万元</ListField>
                        <ListField label="联系电话" type="desc">{{ props.row.contactMobile }}</ListField>
                    </div>
                    <div class="req-list-item">
                        <ListField label="期望放款时间">{{ expectTimeTypeMap[(props.row as RequirementEntity).expectTime] }}</ListField>
                        <ListField label="发布时间" type="desc">{{ props.row.createTime }}</ListField>
                    </div>
                </div>
                <ListProgress
                    label="需求进度"
                    :progress="props.row.barCode * 100"
                    :status="colorStatusMap[(props.row as RequirementEntity).progress]"
                >
                    {{ requirmentProgressTypeMap[(props.row as RequirementEntity).progress] }}
                </ListProgress>
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
  <!-- <List class="req-list">
        <ListItem v-for="(item, i) in list" :key="i" class="req-list-item">
            <RectLogo :name="item.corpName" />
            <div class="req-list-content">
                <div class="req-list-info">
                    <div class="req-list-item">
                        <ListField label="企业名称" hoverable @click="emits(ItemOperate.detail, item)">{{ item.corpName }}</ListField>
                        <ListField label="联系人" type="desc">{{ item.contactPerson }}</ListField>
                    </div>
                    <div class="req-list-item">
                        <ListField label="期望融资金额">{{ item.expectFinancing }}万元</ListField>
                        <ListField label="联系电话" type="desc">{{ item.contactMobile }}</ListField>
                    </div>
                    <div class="req-list-item">
                        <ListField label="期望放款时间">{{ expectTimeTypeMap[item.expectTime] }}</ListField>
                        <ListField label="发布时间" type="desc">{{ item.createTime }}</ListField>
                    </div>
                </div>
                <ListProgress
                    label="需求进度"
                    :progress="item.barCode * 100"
                    :status="colorStatusMap[item.progress]"
                >
                    {{ requirmentProgressTypeMap[item.progress] }}
                </ListProgress>
            </div>

            <ListOperator
                @operate="(opt: ListOperatorOption<ItemOperate>) => handleOperate(opt, item)"
                :operators="[
                    { name: '删除', value: ItemOperate.delete, icon: 'ep-delete', disabled: item.progress !== 0 },
                ]"
            />
        </ListItem>
    </List> -->
</template>

<style lang="scss">
.req-list {
    margin-bottom: $gap-md;
}

.req-list-item {
    display: flex;
    column-gap: $gap-md;
}

.req-list-content {
    flex: 1;
}

.req-list-info {
    display: flex;
    flex: 1;

    & > div {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
}

.req-list-item .list-field {
    margin-bottom: $gap-line;
}
</style>
