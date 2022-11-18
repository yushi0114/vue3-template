<script lang="ts" setup>
import type { ProductEntity } from '@/types';
import { List, ListField, ListItem, ListProgress, RectLogo, type ListOperatorOption } from '@/components';
import { SwitchType } from '@/enums';

enum ItemOpt {
    corps = 1,
    offline = 2,
    online = 3,
    edit = 4,
    delete = 5,
}

withDefaults(
    defineProps<{
        list?: ProductEntity[],
    }>(),
    {
        list: () => []
    }
);

const router = useRouter();
const route = useRoute();
const emits = defineEmits<{
    (e: 'click-detail', detail: ProductEntity): void;
}>();

function handleOperate(opt: ListOperatorOption<ItemOpt>, pdt: ProductEntity) {
    if (opt.value === ItemOpt.corps) {
        router.push(`/product-apply/${route.params.type}?corp=${pdt.id}`);
    }
    else if (opt.value === ItemOpt.offline) {
        //
    }
    else if (opt.value === ItemOpt.online) {
        //
    }
    else if (opt.value === ItemOpt.edit) {
        //
    }
    else if (opt.value === ItemOpt.delete) {
        //
    }
}
</script>

<template>
  <List class="pdt-list">
        <ListItem
            v-for="item in list"
            :key="item.id"
            class="pdt-list-item"
            :disabled="item.status === SwitchType.off"
            @operate="(opt) => handleOperate(opt, item)"
            :variables="{
                isOnline: item.status === SwitchType.on
            }"
            v-slot="{ isOnline }"
            :operators="[
                { name: '查看申请企业', value: ItemOpt.corps },
                { name: item.status === SwitchType.off ? '上架' : '下架', value: item.status === SwitchType.off ? ItemOpt.online : ItemOpt.offline },
                { name: '编辑', value: ItemOpt.edit, icon: 'ep-edit', disabled: isOnline },
                { name: '删除', value: ItemOpt.delete, icon: 'ep-delete', disabled: isOnline },
            ]">
            <RectLogo :name="item.name" />
            <div class="pdt-list-content" :disabled="isOnline">
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

</style>
