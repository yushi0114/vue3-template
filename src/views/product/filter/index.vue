<script lang="ts" setup>
import { Plus, Search } from '@element-plus/icons-vue';
import { PlatformType, OPERATE_TYPE } from '@/enums';
import Draggable from 'vuedraggable';
import { useFilter } from '../hooks/useFilter';
import FilterModal from './components/FilterModal.vue';
import FilterOptionsModal from './components/FilterOptionsModal.vue';
import type { ProductFilterEntity } from '@/types';
import { noop } from '@/utils';
import { CANT_CHANGE_FILTER_MAP, FILTER_UNIT_MAP } from '../constants';

const dragging = ref(false);

const model = ref({
    search: ''
});
const route = useRoute();
const platform = ref<PlatformType>(Number(route.params.type));
const filterModalRef = ref<InstanceType<typeof FilterModal> | null>(null);
const filterOptionsModalRef = ref<InstanceType<typeof FilterOptionsModal> | null>(null);
const {
    loading,
    loadingFilter,
    loadingFilterOptions,
    filters,
    FILTERS_FORM,
    requestUpdateProductFilter,
    requestAddProductFilter,
    requestDeleteProductFilter,
    requestAddProductFilterOptions,
    requestUpdateProductFilterSort,
    FILTERS_OPTIONS_FORM,
} = useFilter(platform);

const formatFilters = computed(() => {
    const searchKey = model.value.search || '';
    if (searchKey === '') return filters.value;
    return filters.value.filter(f => {
        return f.typeValue.includes(searchKey)
            || f.filter?.some((fItem) => fItem.filterValue.includes(searchKey));
    });
});

function handleTabChange(plat: PlatformType) {
    platform.value = plat;
}

const formatterFilterUnit = computed(() => {
    return (typeValue: keyof typeof FILTER_UNIT_MAP, filterValue: string) => {
        return FILTER_UNIT_MAP[typeValue] && filterValue !== '不限' ? filterValue + FILTER_UNIT_MAP[typeValue] : filterValue;
    };
});

const canFilterChange = computed(() => {
    return (typeValue: string) => {
        return !CANT_CHANGE_FILTER_MAP[platform.value].includes(typeValue);
    };
});
const handleOpenFilterModal = (data?: ProductFilterEntity) => {
    filterModalRef.value?.open(data ?? null);
};

const handleOpenFilterOptionsModal = (type: OPERATE_TYPE, data?: ProductFilterEntity) => {
    filterOptionsModalRef.value?.open({ type, data });
};

const handleFilterModalSubmit = (type: OPERATE_TYPE, values: any) => {
    type === OPERATE_TYPE.ADD &&
        requestAddProductFilter(values).then(() => {
            filterModalRef.value?.handleCancel();
        });

    type === OPERATE_TYPE.EDIT &&
        requestUpdateProductFilter(values).then(() => {
            filterModalRef.value?.handleCancel();
        });
};

const handleFilterOptionsModalSubmit = (type: OPERATE_TYPE, values: any) => {
    type === OPERATE_TYPE.ADD &&
        requestAddProductFilterOptions(values).then(() => {
            filterOptionsModalRef.value?.handleCancel();
        });

    type === OPERATE_TYPE.EDIT &&
        requestUpdateProductFilter(values).then(() => {
            filterOptionsModalRef.value?.handleCancel();
        });
};

const handleDeleteFilter = async(filter: ProductFilterEntity) => {
    try {
        await ElMessageBox.confirm(
            `确认删除“${filter.typeValue}${filter.filterValue ? '/' + filter.filterValue : ''}”的筛选项吗？`,
            '删除',
            {
                type: 'warning',
            }
        );
        requestDeleteProductFilter({ id: filter.id ?? filter.filterId });
    } catch {
        noop;
    }
};

const handleDragListChange = () => {
    requestUpdateProductFilterSort({ data: filters.value });
};
</script>

<template>
    <PagePanel>
        <Board
            class="product-filter"
            v-loading="loading"
            full>
            <PlatformTab @tab-change="handleTabChange" />
            <ListQueryControl
                :filterRowVisible="false"
                v-model="model"
                :search-config="{
                    label: '请输入关键字进行查询',
                    field: 'search',
                }"
            >
                <template v-slot:search-rest>
                    <el-button
                        type="primary"
                        :icon="Plus"
                        @click="handleOpenFilterModal(undefined)"
                        >新建类别</el-button
                    >
                </template>
            </ListQueryControl>
            <draggable
                v-model="formatFilters"
                item-key="id"
                filter=".disable-drag"
                @start="dragging = true"
                @end="dragging = false"
                @sort="handleDragListChange">
                <template #item="{ element: parent }">
                    <ContentBoard
                        class="product-filter-item"
                        hoverable
                        :disabled="!parent.isFilterShow"
                        :label="parent.typeValue">
                        <template #label-rest>
                            <FlexRow full gap="xs" class="opt-row">
                                <CircleOptBtn
                                    v-if="canFilterChange(parent.typeValue)"
                                    class="disable-drag pointer"
                                    @click="handleOpenFilterModal(parent)"
                                    :disabled="!parent.isFilterShow">
                                    <i-ep-edit-pen />
                                </CircleOptBtn>
                                <CircleOptBtn
                                    v-if="canFilterChange(parent.typeValue)"
                                    class="disable-drag pointer"
                                    @click="handleDeleteFilter(parent)"
                                    :disabled="!parent.isFilterShow">
                                    <i-ep-close />
                                </CircleOptBtn>
                            </FlexRow>
                        </template>

                        <draggable
                            :list="parent.filter"
                            item-key="id"
                            class="product-filter-group"
                            filter=".disable-drag"
                            @start="dragging = true"
                            @end="dragging = false"
                            @sort="handleDragListChange">
                            <template #item="{ element: child, index }">
                                <FlexRow gap="xs">
                                    <ElTag
                                        :class="[child.filterValue === '不限' && 'disable-drag']"
                                        :type="child.isFilterShow ? '' : 'info'"
                                        class="normal-tag"
                                    >
                                        <FlexRow
                                            horizontal="between"
                                            gap="md">
                                            <div>{{ formatterFilterUnit(parent.typeValue, child.filterValue) }}</div>
                                            <FlexRow
                                                v-if="child.filterValue !== '不限'"
                                                gap="line"
                                                class="product-filter-tag-operator">
                                                <CircleOptBtn
                                                    class="disable-drag pointer"
                                                    size="sm"
                                                    v-if="parent.isFilterShow"
                                                    @click="handleOpenFilterOptionsModal(OPERATE_TYPE.EDIT, child)">
                                                    <i-ep-edit-pen />
                                                </CircleOptBtn>
                                                <CircleOptBtn
                                                    class="disable-drag pointer"
                                                    size="sm"
                                                    @click="handleDeleteFilter(child)">
                                                    <i-ep-close />
                                                </CircleOptBtn>
                                            </FlexRow>
                                        </FlexRow>
                                    </ElTag>
                                    <ElTag
                                        v-if="(index === parent.filter.length - 1)"
                                        class="disable-drag pointer"
                                        @click="handleOpenFilterOptionsModal(OPERATE_TYPE.ADD, parent)"
                                        effect="plain"
                                        type="info">
                                        <FlexRow>
                                            <i-ep-plus />
                                            新建过滤项
                                        </FlexRow>
                                    </ElTag>
                                </FlexRow>
                            </template>
                        </draggable>
                    </ContentBoard>
                </template>
            </draggable>
            <FilterModal
                ref="filterModalRef"
                :loading="loadingFilter"
                :form="FILTERS_FORM"
                @submit="handleFilterModalSubmit"></FilterModal>
            <FilterOptionsModal
                ref="filterOptionsModalRef"
                :loading="loadingFilterOptions"
                :form="FILTERS_OPTIONS_FORM"
                @submit="handleFilterOptionsModalSubmit" />
        </Board>
    </PagePanel>
</template>

<style lang="scss" scoped>
.product-filter {
    user-select: none;
    &-item {
        &:hover {
            cursor: move;
        }
    }
}

.product-filter-tag-operator {
    line-height: 0;
}

.product-filter-group {
    display: flex;
    flex-wrap: wrap;
    gap: $gap-xs;
}

.disable-drag {
    cursor: default !important;
    &.pointer {
        cursor: pointer !important;
    }
}

.opt-row {
    padding: 0 $gap-xs;
}

.product-filter-item {
    border-bottom: 1px solid $color-info-light-8;
    padding-bottom: $gap-xl;
}

.opt-control {
    margin-bottom: $gap-sm;
}

.normal-tag {
    border-color: $color-info-light-7;
    display: flex;
    align-items: center;
}
</style>
