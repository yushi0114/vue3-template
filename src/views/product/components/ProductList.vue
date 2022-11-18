<script lang="ts" setup>
import type { ProductEntity } from '@/types';
import { List, ListField, ListItem, ListProgress, RectLogo } from '@/components';

withDefaults(
    defineProps<{
        list?: ProductEntity[],
    }>(),
    {
        list: () => []
    }
);

const emits = defineEmits<{
    (e: 'click-detail', detail: ProductEntity): void;
}>();
</script>

<template>
  <List class="pdt-list">
        <ListItem v-for="item in list" :key="item.id" class="pdt-list-item">
            <RectLogo :name="item.name" />
            <div class="pdt-list-content">
                <div class="pdt-list-info">
                    <div class="pdt-list-item">
                        <ListField hoverable @click="emits('click-detail', item)">{{ item.name }}</ListField>
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

                    <div class="pdt-list-operation">
                        <TextHoverable size="xs" color="regular">查看申请企业</TextHoverable>
                        <TextHoverable size="xs" color="regular">更多</TextHoverable>
                    </div>
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
