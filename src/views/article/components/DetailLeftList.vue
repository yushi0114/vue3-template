<script lang="ts" setup>
import ArticleSortDialog from './ArticleSortDialog.vue';
import { Edit, SoldOut, Sell, Sort, Delete, Search } from '@element-plus/icons-vue';
import emptyImg from '@/assets/images/no-data.png';
import {
    NEWS_TYPE,
    ARTICLE_STATUS,
    ARTICLE_OPERATE_MODE_LABEL,
    ARTICLE_OPERATE_MODE,
    ARTICLE_MODULE,
    ARTICLE_PAGE,
} from '@/enums';
import { useTable, useJumpLink, useArticleModule, useArticleDetail } from '../hooks';
import { ARTICLE_STATUS_TAG_MAP, ARTICLE_STATUS_SELECT_OPTIONS } from '../constants';
import type { TAB_ITEM } from '@/types';
import { hasScrollBar } from '@/utils';

const props = defineProps<{
    tab: TAB_ITEM;
    module: ARTICLE_MODULE;
    activeId: string;
}>();
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
    updateSort
} = useTable(props.tab, props.module, ARTICLE_PAGE.DETAIL, emit, getActiveId);

const { handleToCreate } = useJumpLink({
    tab: props.tab,
    module: props.module,
});

onMounted(() => {
    console.log('props.tab：', props.tab);
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
        class="article-list-wrapper"
        v-loading="state.loading && !state.loadingMore">
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
                    v-if="tab.value === ARTICLE_STATUS.ALL"
                    style="width: 160px"
                    v-model="params.status"
                    clearable
                    @change="() => handleFilterChange()">
                    <el-option
                        v-for="item in ARTICLE_STATUS_SELECT_OPTIONS"
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
        <template v-if="state.data.length > 0">
            <ul
                class="article-list"
                :ref="(el) => bindDetailListRef(el, props.tab.value)"
                v-infinite-scroll="loadMore"
                :infinite-scroll-disabled="state.disabled">
                <li
                    v-for="(item, index) in state.data"
                    :key="item.id + index"
                    class="article-list-item"
                    :class="{ active: activeId === item.id }"
                    @click="handleActiveIdChange(item.id)">
                    <div class="article-title-wrap">
                        <Icon name="ep-document"> </Icon>
                        <list-field
                            class="flex-1"
                            :class="{ 'text-$el-color-primary': activeId === item.id }"
                            hoverable
                            truncate>
                            {{ item.title }}
                        </list-field>
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
                    <el-dropdown @command="(command:ARTICLE_OPERATE_MODE) => handleMoreOperate(command, item)">
                        <div>
                            <Icon
                                class="icon-more"
                                name="ep-more-filled">
                            </Icon>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    :disabled="item.status === ARTICLE_STATUS.PUBLISHED"
                                    :command="ARTICLE_OPERATE_MODE.EDIT"
                                    :icon="Edit"
                                    >{{ ARTICLE_OPERATE_MODE_LABEL.EDIT }}
                                </el-dropdown-item>
                                <el-dropdown-item
                                    v-if="item.status === ARTICLE_STATUS.PUBLISHED"
                                    :command="ARTICLE_OPERATE_MODE.OFFLINE"
                                    :icon="SoldOut"
                                    >{{ ARTICLE_OPERATE_MODE_LABEL.OFFLINE }}
                                </el-dropdown-item>
                                <el-dropdown-item
                                    v-else
                                    :command="ARTICLE_OPERATE_MODE.PUBLISH"
                                    :icon="Sell">
                                    {{ ARTICLE_OPERATE_MODE_LABEL.PUBLISH }}
                                </el-dropdown-item>
                                <el-dropdown-item
                                    :command="ARTICLE_OPERATE_MODE.SORT"
                                    :icon="Sort"
                                    >{{ ARTICLE_OPERATE_MODE_LABEL.SORT }}
                                </el-dropdown-item>
                                <el-dropdown-item
                                    :command="ARTICLE_OPERATE_MODE.DELETE"
                                    :icon="Delete"
                                    >{{ ARTICLE_OPERATE_MODE_LABEL.DELETE }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
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
        <el-empty
            v-else-if="!state.loading && state.data.length === 0"
            :image="emptyImg"></el-empty>
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
    }
}
.article-list {
    flex: 1;
    box-sizing: border-box;
    margin-top: $gap-md;
    overflow-y: overlay;
    padding-right: $gap-xs;

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
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;

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
    &.active .icon-more {
        display: block;
    }
    &.active .article-title-wrap {
        margin-right: 0;
    }
}
.article-list-item:hover .icon-more {
    display: block;
}

.article-list-item:hover .article-title-wrap {
    margin-right: 0;
}
.article-title-wrap {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    gap: $gap-xs;
    margin-right: 18px;
}
.text {
    cursor: pointer;
    flex: 1;
    margin-right: $gap-xs;
}
.icon-more {
    transform: rotate(90deg);
    color: #c0c4cc;
    display: none;
    padding-right: 4px;
}
</style>
