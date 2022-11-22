<script lang="ts" setup>
import { AcceptProgressType, expectTimeTypeMap, requirmentProgressTypeMap } from '@/enums';
import type { RequirementEntity } from '@/types';
import { ItemOperate, List, ListField, ListItem, ListProgress, RectLogo, type ListOperatorOption } from '@/components';


withDefaults(
    defineProps<{
        list?: RequirementEntity[],
    }>(),
    {
        list: () => []
    }
);

const emits = defineEmits<{
    (e: ItemOperate.detail, detail: RequirementEntity): void;
    (e: ItemOperate.delete, detail: RequirementEntity): void;
}>();

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
</script>

<template>
  <List class="req-list">
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
    </List>
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
