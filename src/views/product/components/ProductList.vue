<script lang="ts" setup>
import type { ProductEntity } from '@/types';
import { List, ListField, ListItem, ListProgress, RectLogo, type ListOperatorOption, ItemOperate } from '@/components';
import { SwitchType } from '@/enums';

withDefaults(
    defineProps<{
        list?: ProductEntity[],
    }>(),
    {
        list: () => []
    }
);

const emits = defineEmits<{
    (e: ItemOperate.detail, detail: ProductEntity): void;
    (e: ItemOperate.delete, detail: ProductEntity): void;
    (e: ItemOperate.edit, detail: ProductEntity): void;
    (e: ItemOperate.online, detail: ProductEntity): void;
    (e: ItemOperate.offline, detail: ProductEntity): void;
}>();

function handleOperate(opt: ListOperatorOption<ItemOperate>, pdt: ProductEntity) {
    emits(opt.value as any, pdt);
}
</script>

<template>
  <List class="pdt-list" v-empty="{visible: !list.length}">
        <ListItem
            v-for="item in list"
            :key="item.id"
            class="pdt-list-item"
            :disabled="item.status === SwitchType.off"
            :variables="{
                isOnline: item.status === SwitchType.on
            }"
            v-slot="{ isOnline }"
            >
            <RectLogo :name="item.name" />
            <div class="pdt-list-content" :disabled="isOnline">
                <div class="pdt-list-info">
                    <div class="pdt-list-item">
                        <ListField hoverable @click="emits(ItemOperate.detail, item)">{{ item.name }}</ListField>
                        <ListField label="贷款额度" type="desc">{{ item.loanDue }}</ListField>
                    </div>
                    <div class="pdt-list-item">
                        <ListField label="机构名称">{{ item.orgName }}</ListField>
                        <ListField label="贷款期限" type="desc">{{ item.loanLimit }}</ListField>
                    </div>
                    <div class="pdt-list-item">
                        <!-- 空格占位 -->
                        <ListField>{{ '\u00A0' }}</ListField>
                        <ListField label="年化利率" type="desc">{{ item.referenceRate }}</ListField>
                    </div>
                </div>
                <FlexRow class="pdt-list-bottom" horizontal="between">
                    <ListProgress
                        label="成功率"
                        :progress="Number(item.successRate) * 100"
                        status=""
                    >
                        {{ Number(item.successRate) * 100 }}%
                    </ListProgress>
                </FlexRow>
            </div>

            <ListOperator
                :max-out-count="1"
                @operate="(opt: ListOperatorOption<ItemOperate>) => handleOperate(opt, item)"
                :operators="[
                    { name: '查看申请企业', value: ItemOperate.reqDetail },
                    { name: isOnline ? '下架' : '上架', value: isOnline ? ItemOperate.offline : ItemOperate.online },
                    { name: '编辑', value: ItemOperate.edit, icon: 'ep-edit', disabled: isOnline },
                    { name: '删除', value: ItemOperate.delete, icon: 'ep-delete', disabled: isOnline },
                ]"
            />
        </ListItem>
    </List>
</template>

<style lang="scss">
.pdt-list {
    flex: 1;
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

</style>
