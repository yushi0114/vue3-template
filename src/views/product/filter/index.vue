<script lang="ts" setup>
// import { PlatformType } from '@/enums';
import { getProductFilters } from '@/api';
import { useApi, useQueryParams } from '@/composables';
import type { ProductFilterEntity } from '@/types';
import Draggable from 'vuedraggable';

const dragging = ref(false);
const { request } = useApi(getProductFilters);
const { queryParams, goQuery } = useQueryParams({
    searchInput: ''
});

const filters = ref<ProductFilterEntity[]>([]);
const list  =ref([
    { name: "John", id: 0 },
    { name: "Joao", id: 1 },
    { name: "Jean", id: 2 }
    ])
function getList() {
    request({})
        .then((res) => {
            console.log(res);
            filters.value = res.data;
        });
}

watch(queryParams, () => {
    getList();
}, { immediate: true });



</script>

<template>
    <PagePanel>
        <Board class="product-filter" full>
            <PlatformTab />
            <draggable
                :list="filters"
                item-key="id"
                @start="dragging = true"
                @end="dragging = false"
            >
                <template #item="{ element: parent }">
                    <ContentBoard :label="parent.typeValue">
                        <template #label-rest>
                            <FlexRow gap="xs">
                                <TextHoverable color="regular">
                                    <i-ep-plus />
                                </TextHoverable>
                                <TextHoverable color="regular">
                                    <i-ep-edit />
                                </TextHoverable>
                                <TextHoverable color="regular">
                                    <i-ep-close />
                                </TextHoverable>
                            </FlexRow>
                        </template>

                        <draggable
                            :list="parent.filter"
                            item-key="id"
                            class="product-filter-group"
                            @start="dragging = true"
                            @end="dragging = false"
                        >
                            <template #item="{ element: child }">
                                <ElTag>
                                    <FlexRow horizontal="between" gap="md" >
                                        <div>{{ child.filterValue }}</div>
                                        <FlexRow gap="line" class="product-filter-tag-operator">
                                            <TextHoverable color="regular" size="xs">
                                                <i-ep-edit />
                                            </TextHoverable>
                                            <TextHoverable color="regular"  size="xs">
                                                <i-ep-close />
                                            </TextHoverable>
                                        </FlexRow>
                                    </FlexRow>
                                </ElTag>
                            </template>
                        </draggable>
                    </ContentBoard>
                </template>
            </draggable>
        </Board>
    </PagePanel>
</template>

<style lang="scss">
.product-filter {
    user-select: none;
}

.product-filter-tag-operator {
    line-height: 0;
    margin-top: calc($gap-line * 2);
}

.product-filter-group {
    display: flex;
    flex-wrap: wrap;
    gap: $gap-xs;
}
</style>
