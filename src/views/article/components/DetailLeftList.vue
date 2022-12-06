<script lang="ts" setup>
import { Edit, SoldOut, Sell, Sort, Delete, MoreFilled } from '@element-plus/icons-vue';
import emptyImg from '@/assets/images/no-data.png';
import {
    NEWS_TYPE,
    ARTICLE_STATUS,
    ARTICLE_OPERATE_MODE_LABEL,
    ARTICLE_OPERATE_MODE,
    ARTICLE_MODULE,
    ARTICLE_PAGE,
} from '@/enums';
import { useTable, useJumpLink, useArticleModule } from '../hooks';
import { ARTICLE_STATUS_TAG_MAP, ARTICLE_STATUS_SELECT_OPTIONS } from '../constants';
import type { TAB_ITEM } from '@/types';

const props = defineProps<{
    tab: TAB_ITEM;
    module: ARTICLE_MODULE;
    activeId: string;
}>();
const emit = defineEmits<{
    (e: 'update:activeId', value: string): void;
    (e: 'refresh'): void;
}>();

const handleActiveIdChange = (id: string) => {
    emit('update:activeId', id);
};

const getActiveId = computed(() => {
    return props.activeId;
});
const { isNewsModule } = useArticleModule(props.module);

const { params, state, _updateNewsStatus, handleDebounceSearch, handleMoreOperate, handleFilterChange, loadMore } =
    useTable(props.tab, props.module, ARTICLE_PAGE.DETAIL, emit, getActiveId);

const { handleToCreate } = useJumpLink({
    tab: props.tab,
    module: props.module,
});

defineExpose({
    _updateNewsStatus,
});
</script>

<template>
    <div
        class="article-list-wrapper"
        v-loading="state.loading && !state.loadingMore">
        <FlexRow horizontal="between" class="space-x-2">
            <div class="flex flex-1 space-x-2">
                <el-input
                    placeholder="请输入关键字进行查询"
                    v-model.trim="params.searchInput"
                    clearable
                    @input="handleDebounceSearch">
                </el-input>
                <el-select
                    v-if="tab.value === ARTICLE_STATUS.ALL"
                    class="w-160px"
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
                <i-ep-plus
                    class="cursor-pointer"
                    @click="handleToCreate"></i-ep-plus>
            </el-tooltip>
        </FlexRow>
        <template v-if="state.data.length > 0">
            <ul
                class="article-list"
                v-infinite-scroll="loadMore"
                :infinite-scroll-disabled="state.disabled">
                <li
                    v-for="(item, index) in state.data"
                    :key="item.id + index"
                    class="article-list-item"
                    :class="{ active: activeId === item.id }"
                    @click="handleActiveIdChange(item.id)">
                    <div class="article-title-wrap">
                        <Icon name="ep-document">
                        </Icon>
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
                        <Icon class="icon-more" name="ep-more-filled">
                        </Icon>
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
                                    :command="ARTICLE_OPERATE_MODE.PUBLISH" :icon="Sell">
                                    {{ ARTICLE_OPERATE_MODE_LABEL.PUBLISH }}
                                </el-dropdown-item>
                                <el-dropdown-item :command="ARTICLE_OPERATE_MODE.SORT"
                                    :icon="Sort"
                                    >{{ ARTICLE_OPERATE_MODE_LABEL.SORT }}
                                </el-dropdown-item>
                                <el-dropdown-item :command="ARTICLE_OPERATE_MODE.DELETE"
                                :icon="Delete"
                                    >{{ ARTICLE_OPERATE_MODE_LABEL.DELETE }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </li>
                <p
                    class="text-center text-sm text-$el-text-color-regular"
                    v-if="state.loading"
                    >加载中...</p
                >
                <p
                    class="text-center text-sm text-$el-text-color-regular"
                    v-if="state.noMore"
                    >没有更多了</p
                >
            </ul>
        </template>
        <el-empty
            v-else-if="!state.loading && state.data.length === 0"
            :image="emptyImg"></el-empty>
    </div>
</template>

<style lang="postcss" scoped>
.article-list-wrapper {
    @apply h-full;
}
.article-list {
    @apply flex-1 box-border mt-4 overflow-y-auto;

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
    @apply h-30px leading-30px text-sm flex items-center justify-between flex-nowrap;
    &:hover {
        @apply cursor-pointer text-$el-primary-color bg-$el-fill-color;
    }
    &.active {
        @apply cursor-pointer text-$el-primary-color bg-$el-fill-color;
    }
    &.active .icon-more {
        @apply display-block;
    }
}
.article-list-item:hover .icon-more {
    @apply display-block;
}
.article-title-wrap {
    @apply flex items-center flex-1 min-w-0 gap-2;
}
.text {
    @apply cursor-pointer flex-1 mr-2;
}
.icon-more {
    transform: rotate(90deg);
    color: #c0c4cc;
    display: none;
    padding-right: 4px;
}
</style>
