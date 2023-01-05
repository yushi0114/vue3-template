<script lang="ts" setup>
import ArticleSortDialog from './ArticleSortDialog.vue';
import { Search } from '@element-plus/icons-vue';

import {
    NEWS_TYPE,
    ARTICLE_STATUS,
    ARTICLE_OPERATE_MODE_LABEL,
    ARTICLE_OPERATE_MODE,
    ARTICLE_MODULE,
    ARTICLE_PAGE,
} from '@/enums';
import { useTable, useJumpLink, useArticleModule, useArticleDetail } from '../hooks';
import { ARTICLE_STATUS_TAG_MAP } from '../constants';
import type { TAB_ITEM } from '@/types';
import { hasScrollBar } from '@/utils';

const { query } = useRoute();
const props = defineProps<{
    tab: TAB_ITEM;
    module: ARTICLE_MODULE;
    activeId: string;
}>();

const hoverId = ref('');
const emit = defineEmits<{
    (e: 'update:activeId', value: string): void;
    (e: 'refresh'): void;
}>();
const { bindDetailListRef, detailListMap } = useArticleDetail();

const showNoMore = ref(false);

const handleActiveIdChange = (id: string) => {
    emit('update:activeId', id);
};

const getActiveId = computed(() => {
    return props.activeId;
});
const { isNewsModule, getArticleTypeLabel } = useArticleModule(props.module);

const {
    params,
    state,
    _updateNewsStatus,
    handleDebounceSearch,
    handleMoreOperate,
    handleFilterChange,
    loadMore,
    showArticleSortDialog,
    currentArticle,
    updateSort,
} = useTable(props.tab, props.module, ARTICLE_PAGE.DETAIL, emit, getActiveId);

const { handleToCreate } = useJumpLink({
    tab: props.tab,
    module: props.module,
});

const filterStatus = ref(props.tab.filterOption[0].value);

const init = () => {
    if (props.tab.value === Number(query.tab)) {
        filterStatus.value = Number(query.status) as ARTICLE_STATUS;
    }
};
const handleSelectChange = () => {
    filterStatus.value === ARTICLE_STATUS.ALL && (filterStatus.value = props.tab.filterOption[0].value);
    handleFilterChange({ status: filterStatus.value });
};

onMounted(() => {
    init();
    window.onresize = () => {
        (() => {
            showNoMore.value = hasScrollBar(detailListMap.value.get(props.tab.value));
        })();
    };
});

watch(
    () => state.loading,
    () => {
        nextTick(() => {
            showNoMore.value = hasScrollBar(detailListMap.value.get(props.tab.value));
        });
    }
);

defineExpose({
    _updateNewsStatus,
});
</script>

<template>
    <div
        class="article-list-wrapper">
        <FlexRow
            horizontal="between"
            gap="xs">
            <div class="flex flex-1 gap-xs">
                <el-input
                    :prefix-icon="Search"
                    :placeholder="`请输入${getArticleTypeLabel}标题`"
                    v-model.trim="params.searchInput"
                    clearable
                    @input="handleDebounceSearch">
                </el-input>
                <el-select
                    style="width: 160px"
                    v-model="filterStatus"
                    clearable
                    @change="handleSelectChange">
                    <el-option
                        v-for="item in tab.filterOption"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <el-tooltip
                content="新建"
                placement="top">
                <div>
                    <i-ep-plus
                        class="cursor-pointer plus-button"
                        @click="handleToCreate" />
                </div>
            </el-tooltip>
        </FlexRow>
        <LoadingBoard :loading="state.loading && !state.loadingMore" :empty="state.data.length === 0" :image-size="160">
            <template v-if="state.data.length > 0">
                <ul
                    class="article-list"
                    :ref="(el) => bindDetailListRef(el, props.tab.value)"
                    v-infinite-scroll="loadMore"
                    :infinite-scroll-disabled="state.disabled">
                    <li
                        v-for="(item, index) in state.data"
                        @mouseenter="hoverId = item.id"
                        :key="item.id + index"
                        class="article-list-item"
                        :class="{ active: activeId === item.id }"
                        @click="handleActiveIdChange(item.id)">
                        <div class="article-title-wrap">
                            <Icon name="ep-document"> </Icon>
                            <TextHoverable
                                class="flex-1"
                                size="sm"
                                hoverable
                                truncate>
                                {{ item.title }}
                            </TextHoverable>
                            <el-tag
                                :type="ARTICLE_STATUS_TAG_MAP[item.status as keyof typeof ARTICLE_STATUS_TAG_MAP].status">
                                {{ ARTICLE_STATUS_TAG_MAP[item.status as keyof typeof ARTICLE_STATUS_TAG_MAP].label }}
                            </el-tag>
                            <el-tag
                                v-if="isNewsModule && item.hotNews === NEWS_TYPE.HOT"
                                type="danger">
                                热点新闻
                            </el-tag>
                        </div>

                        <ListOperator
                            v-if="hoverId === item.id"
                            tooltipDisabled
                            placement="right"
                            :max-out-count="0"
                            class="icon-more"
                            @operate="(opt) => handleMoreOperate(opt.value, item)"
                            :operators="[
                                { name: ARTICLE_OPERATE_MODE_LABEL.EDIT, value: ARTICLE_OPERATE_MODE.EDIT, icon: 'ep-edit-pen', disabled: item.status === ARTICLE_STATUS.PUBLISHED },
                                item.status === ARTICLE_STATUS.PUBLISHED ? {
                                    name: ARTICLE_OPERATE_MODE_LABEL.OFFLINE,
                                    value: ARTICLE_OPERATE_MODE.OFFLINE,
                                    icon: 'ep-sold-out'
                                } : {
                                    name: ARTICLE_OPERATE_MODE_LABEL.PUBLISH,
                                    value: ARTICLE_OPERATE_MODE.PUBLISH,
                                    icon: 'ep-sell'
                                },
                                { name: ARTICLE_OPERATE_MODE_LABEL.SORT, value: ARTICLE_OPERATE_MODE.SORT, icon: 'ep-sort' },
                                { name: ARTICLE_OPERATE_MODE_LABEL.DELETE, value: ARTICLE_OPERATE_MODE.DELETE, icon: 'ep-delete' },
                            ]"
                        />
                        <div class="icon-more-placeholder" v-else></div>
                    </li>
                    <Text
                        size="sm"
                        color="regular"
                        align="center"
                        block
                        v-if="state.loadingMore"
                        >加载中...</Text
                    >
                    <Text
                        size="sm"
                        color="regular"
                        align="center"
                        block
                        v-if="state.noMore && showNoMore"
                        >没有更多了</Text
                    >
                </ul>
            </template>
        </LoadingBoard>
        <ArticleSortDialog
            v-model="showArticleSortDialog"
            :data="currentArticle"
            @confirm="(row) => updateSort({ id: row.id, sort: Number(row.sort) })"></ArticleSortDialog>
    </div>
</template>

<style lang="scss" scoped>
.article-list-wrapper {
    height: 100%;
    .plus-button {
        width: 1.25rem;
        height: 1.25rem;
        cursor: pointer;
        color: #606266;
        margin-right: calc($gap-line * 2);
    }
}
.article-list {
    flex: 1;
    box-sizing: border-box;
    margin: $gap-sm 0;
    overflow-y: overlay;

    &::-webkit-scrollbar {
        width: 0;
    }

    &:hover {
        &::-webkit-scrollbar {
            width: 8px;
        }
    }
}
.article-list-item {
    padding: calc($gap-line * 2) $gap-xs;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    border-radius: 4px;
    transition: .2s ease all;
    margin-bottom: $gap-line;

    &:hover {
        cursor: pointer;
        color: $color-primary;
        background-color: $fill-color;
    }
    &.active {
        cursor: pointer;
        color: $color-primary;
        background-color: $fill-color;
    }

}

.article-title-wrap {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    gap: $gap-xs;
}
.text {
    cursor: pointer;
    flex: 1;
    margin-right: $gap-xs;
}
.icon-more {
    margin-left: calc($gap-line * 2);
    margin-right: calc($gap-line * -2);
}

.icon-more-placeholder {
    width: $gap-xl;
}
</style>
