<script lang="ts" setup>
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

const { params, state, _updateNewsStatus, handleDebounceSearch, handleMoreOperate, handleFilterChange } = useTable(
    props.tab,
    props.module,
    ARTICLE_PAGE.DETAIL,
    emit,
    getActiveId
);

const { handleToCreate } = useJumpLink({
    tab: props.tab,
    module: props.module,
});

defineExpose({
    _updateNewsStatus,
});
</script>

<template>
    <div class="article-list-wrapper">
        <el-space direction="vertical" :size="20" fill class="!w-full">
            <div class="flex-between">
                <div class="flex flex-1">
                    <el-input
                        placeholder="请输入关键字进行查询"
                        v-model.trim="params.searchInput"
                        clearable
                        @input="handleDebounceSearch">
                    </el-input>
                    <el-select
                        v-if="tab.value === ARTICLE_STATUS.ALL"
                        class="ml-2 w-150px"
                        v-model="params.status"
                        @change="() => handleFilterChange()">
                        <el-option
                            v-for="item in ARTICLE_STATUS_SELECT_OPTIONS"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <el-tooltip content="新建" placement="top">
                    <i-ep-plus class="cursor-pointer ml-2" @click="handleToCreate"></i-ep-plus>
                </el-tooltip>
            </div>
            <template v-if="!state.loading && state.data.length > 0">
                <ul class="article-list">
                    <li
                        v-for="(item, index) in state.data"
                        :key="item.id + index"
                        class="article-list-item"
                        :class="{ active: activeId === item.id }"
                        @click="handleActiveIdChange(item.id)">
                        <div class="article-title-wrap">
                            <i-ep-document class="mr-1"></i-ep-document>
                            <span class="article-title" :class="{ 'text-$el-color-primary': activeId === item.id }">
                                {{ item.title }}
                            </span>
                            <el-tag
                                class="mx-2"
                                :type="ARTICLE_STATUS_TAG_MAP[item.status as keyof typeof ARTICLE_STATUS_TAG_MAP].status">
                                {{ ARTICLE_STATUS_TAG_MAP[item.status as keyof typeof ARTICLE_STATUS_TAG_MAP].label }}
                            </el-tag>
                            <el-tag v-if="isNewsModule && item.hotNews === NEWS_TYPE.HOT" type="danger">
                                热点新闻
                            </el-tag>
                        </div>
                        <el-dropdown @command="(command:ARTICLE_OPERATE_MODE) => handleMoreOperate(command, item)">
                            <i-ep-more-filled class="icon-more"></i-ep-more-filled>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item
                                        :disabled="item.status === ARTICLE_STATUS.PUBLISHED"
                                        :command="ARTICLE_OPERATE_MODE.EDIT"
                                        ><i-ep-edit />{{ ARTICLE_OPERATE_MODE_LABEL.EDIT }}
                                    </el-dropdown-item>
                                    <el-dropdown-item
                                        v-if="item.status === ARTICLE_STATUS.PUBLISHED"
                                        :command="ARTICLE_OPERATE_MODE.OFFLINE"
                                        ><i-ep-sold-out />{{ ARTICLE_OPERATE_MODE_LABEL.OFFLINE }}
                                    </el-dropdown-item>
                                    <el-dropdown-item v-else :command="ARTICLE_OPERATE_MODE.PUBLISH">
                                        <i-ep-sell />{{ ARTICLE_OPERATE_MODE_LABEL.PUBLISH }}
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="ARTICLE_OPERATE_MODE.SORT"
                                        ><i-ep-sort />{{ ARTICLE_OPERATE_MODE_LABEL.SORT }}
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="ARTICLE_OPERATE_MODE.DELETE"
                                        ><i-ep-delete />{{ ARTICLE_OPERATE_MODE_LABEL.DELETE }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </li>
                    <!-- <p v-if="loadMore">更多...</p>
                    <p v-if="isNoMoreShow">没有更多了</p> -->
                </ul>
            </template>
            <el-empty v-else-if="!state.loading && state.data.length === 0" :image="emptyImg"></el-empty>
        </el-space>
    </div>
</template>

<style lang="postcss" scoped>
.article-list {
    @apply box-border my-4 overflow-y-auto;

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
    @apply h-30px leading-30px text-sm flex-between flex-nowrap;
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
    @apply flex items-center;
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
