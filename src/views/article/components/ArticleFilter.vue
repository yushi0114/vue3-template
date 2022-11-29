<script lang="ts" setup>
import { SORT_TYPE, ARTICLE_STATUS, ARTICLE_STATUS_LABEL } from '@/enums';
import { pick } from 'lodash';
import { ARTICLE_STATUS_SELECT_OPTIONS, INIT_ARTICLE_SORT_LIST } from '../constants';
import type { ArticleSortItem } from '@/types';
type State = ArticleSortItem & {
    status: ARTICLE_STATUS;
};
const emit = defineEmits<{
    (e: 'sort-change', sort: Omit<ArticleSortItem, 'label'>): void;
    (e: 'filter-change', filter: { status: ARTICLE_STATUS }): void;
}>();

let ARTICLE_SORT_LIST = reactive(cloneDeep(INIT_ARTICLE_SORT_LIST));
const state: State = reactive({
    status: ARTICLE_STATUS.ALL,
    label: ARTICLE_STATUS_LABEL.ALL,
    sortType: SORT_TYPE.DESC,
    sortField: 'sort',
});

const handleCommand = (command: { label: string; value: ARTICLE_STATUS }) => {
    state.label = command.label;
    state.status = command.value;
    emit('filter-change', pick(state, ['status']));
};

const handleSortChange = (item: ArticleSortItem) => {
    let sortType: SORT_TYPE = item.sortType;
    ARTICLE_SORT_LIST.forEach((item: any) => (item.sortType = SORT_TYPE.NONE));
    switch (sortType) {
        case SORT_TYPE.DESC:
            item.sortType = SORT_TYPE.ASC;
            break;
        case SORT_TYPE.ASC:
            item.sortType = SORT_TYPE.NONE;
            break;
        case SORT_TYPE.NONE:
            item.sortType = SORT_TYPE.DESC;
            break;
    }
    state.sortType = item.sortType;
    state.sortField = item.sortField;
    emit('sort-change', pick(state, ['sortType', 'sortField']));
};
</script>

<template>
    <div class="article-filter">
        <el-dropdown
            v-show="($attrs.tab as any).value === ARTICLE_STATUS.ALL"
            trigger="click"
            @command="handleCommand">
            <span class="el-dropdown-link cursor-pointer">
                {{ state.label }}
                <el-icon class="el-icon--right">
                    <i-ep-arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        v-for="option in ARTICLE_STATUS_SELECT_OPTIONS"
                        :key="option.name"
                        :command="option">
                        {{ option.name }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <div v-show="($attrs.tab as any).value !== ARTICLE_STATUS.ALL"></div>
        <el-space size="small">
            <div
                v-for="item in ARTICLE_SORT_LIST"
                :key="item.label"
                class="article-sort-item"
                :class="{ active: state.sortField === item.sortField }"
                @click="handleSortChange(item)">
                {{ item.label }}
                <i-ep-sort v-show="item.sortType === SORT_TYPE.NONE"></i-ep-sort>
                <i-ep-sort-down v-show="item.sortType === SORT_TYPE.DESC"></i-ep-sort-down>
                <i-ep-sort-up v-show="item.sortType === SORT_TYPE.ASC"></i-ep-sort-up>
            </div>
        </el-space>
    </div>
</template>

<style lang="postcss" scoped>
.article-filter {
    @apply bg-$el-color-info-light-8 flex justify-between items-center h-50px;
}
.article-sort-item {
    @apply cursor-pointer;
    &:hover {
        color: var(--el-color-primary);
    }
    &.active {
        color: var(--el-color-primary);
    }
}
</style>
