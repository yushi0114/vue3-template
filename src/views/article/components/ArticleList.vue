<script lang="ts" setup>
// import { Search } from '@element-plus/icons-vue';
import { ListField } from '@/components';
import { NEWS_TYPE, ARTICLE_STATUS, ARTICLE_OPERATE_MODE_LABEL, ARTICLE_OPERATE_MODE, ARTICLE_MODULE } from '@/enums';
// import ArticleFilter from './ArticleFilter.vue';
import { useTable, useJumpLink, useArticleModule } from '../hooks';
import {
    TABLE_COLUMNS,
    ARTICLE_STATUS_TAG_MAP,
    ARTICLE_STATUS_SELECT_OPTIONS,
    ARTICLE_SORT_CONFIG,
} from '../constants';
import errImg from '@/assets/images/empty-image.png';
import type { TAB_ITEM } from '@/types';
import { useListControlModel } from '@/composables';
import { pick } from 'lodash';

const { model: listControlModel } = useListControlModel();

const props = defineProps<{
    tab: TAB_ITEM;
    module: ARTICLE_MODULE;
}>();

const { isNewsModule, getArticleTypeLabel } = useArticleModule(props.module);

const getDate = computed(() => {
    return (date: string) => {
        const [newDate] = date.split(' ') || [];
        const [year, month, day] = newDate.split('-') || [];
        return {
            yearAndMonth: `${year}/${month}`,
            day,
        };
    };
});

const sjcTableRef = ref<HTMLElement | null>(null); // 表格ref
const { params, tableConfig, state, pageConfig, pageSizeChange, handleMoreOperate, fetchTableData } = useTable(
    props.tab,
    props.module
);

Object.assign(pageConfig, pick(listControlModel, ['pageIndex', 'pageSize']));

const JumpLinkParams = reactive({
    tab: props.tab,
    module: props.module,
});
const { handleToCreate, handleToEdit, handleToDetail } = useJumpLink(JumpLinkParams);

watch(listControlModel, () => {
    Object.assign(params, listControlModel);
    nextTick(fetchTableData);
});
</script>

<template>
    <div class="article-list">
        <el-space
            direction="vertical"
            :size="20"
            fill
            class="!w-full">
            <!-- <div class="flex justify-between">
                <el-input
                    class="!w-350px"
                    placeholder="请输入关键字进行查询"
                    v-model.trim="params.searchInput"
                    clearable
                    @clear="handleSearch"
                    @keyup.enter="handleSearch">
                    <template #append>
                        <el-button :icon="Search" @click="handleSearch"></el-button>
                    </template>
                </el-input>
                <el-button type="primary" @click="handleToCreate">新建</el-button>
            </div>
            <article-filter
                :tab="tab"
                @sort-change="handleSortChange"
                @filter-change="handleFilterChange"></article-filter> -->
            <ListQueryControl
                v-model="listControlModel"
                :searchConfig="{
                    label: `请输入${getArticleTypeLabel}标题`,
                    field: isNewsModule ? 'searchInput' : 'title',
                }"
                :filterOptionsConfigs="
                    tab.value === ARTICLE_STATUS.ALL
                        ? [
                              {
                                  label: `${getArticleTypeLabel}状态`,
                                  field: 'status',
                                  options: ARTICLE_STATUS_SELECT_OPTIONS,
                              },
                          ]
                        : []
                "
                :sortConfigs="ARTICLE_SORT_CONFIG">
                <template v-slot:search-rest>
                    <el-button
                        type="primary"
                        @click="handleToCreate"
                        >新建</el-button
                    >
                </template>
            </ListQueryControl>
            <sjc-table
                ref="sjcTableRef"
                :table-data="state.data"
                :loading="state.loading"
                :columns="TABLE_COLUMNS"
                :show-header="false"
                row-class-name="tr-item"
                :table-config="tableConfig"
                :pagination-config="pageConfig"
                @page-change="pageSizeChange">
                <template #thumbnail="{ scope }">
                    <div
                        class="w-70px h-60px border border-$el-fill-color overflow-hidden"
                        v-if="isNewsModule">
                        <img
                            class="w-full h-full thumbnail"
                            v-real-img="{ img: scope.row.thumbnail, errImg }"
                            alt="" />
                    </div>
                    <div
                        v-else
                        class="w-67px h-67px flex-center flex-col border border-$el-fill-color">
                        <div class="w-full h-60% bg-$el-fill-color text-2xl text-center">
                            {{ getDate(scope.row.publishDate).day }}
                        </div>
                        <div class="flex-1">{{ getDate(scope.row.publishDate).yearAndMonth }}</div>
                    </div>
                </template>
                <template #content="{ scope }">
                    <el-row>
                        <el-col
                            :span="24"
                            class="flex items-center gap-2">
                            <list-field
                                hoverable
                                @click="handleToDetail({ row: scope.row, status: params.status })">
                                {{ scope.row.title }}
                            </list-field>
                            <el-tag
                                :type="ARTICLE_STATUS_TAG_MAP[scope.row.status as keyof typeof ARTICLE_STATUS_TAG_MAP].status">
                                {{
                                    ARTICLE_STATUS_TAG_MAP[scope.row.status as keyof typeof ARTICLE_STATUS_TAG_MAP]
                                        .label
                                }}
                            </el-tag>
                            <el-tag
                                v-if="isNewsModule && scope.row.hotNews === NEWS_TYPE.HOT"
                                type="danger">
                                热点新闻
                            </el-tag>
                        </el-col>
                        <el-col>
                            <list-field
                                label="摘要"
                                type="desc">
                                {{ scope.row.summary }}
                            </list-field>
                        </el-col>
                        <template v-if="scope.row.status === ARTICLE_STATUS.PUBLISHED">
                            <el-col :span="8">
                                <list-field
                                    label="发布者"
                                    type="desc">
                                    {{ scope.row.updateBy }}
                                </list-field>
                            </el-col>
                            <el-col :span="16">
                                <list-field
                                    label="发布日期"
                                    type="desc">
                                    {{ scope.row.createTime }}
                                </list-field>
                            </el-col>
                        </template>
                        <template v-if="scope.row.status === ARTICLE_STATUS.OFFLINE">
                            <el-col :span="8">
                                <list-field
                                    label="下线者"
                                    type="desc">
                                    {{ scope.row.updateBy }}
                                </list-field>
                            </el-col>
                            <el-col :span="16">
                                <list-field
                                    label="下线时间"
                                    type="desc">
                                    {{ scope.row.updateTime }}
                                </list-field>
                            </el-col>
                        </template>
                        <template v-if="scope.row.status === ARTICLE_STATUS.DRAFT">
                            <el-col :span="8">
                                <list-field
                                    label="更新者"
                                    type="desc">
                                    {{ scope.row.updateBy }}
                                </list-field>
                            </el-col>
                            <el-col :span="16">
                                <list-field
                                    label="更新时间"
                                    type="desc">
                                    {{ scope.row.updateTime }}
                                </list-field>
                            </el-col>
                        </template>
                    </el-row>
                </template>
                <template #handler="{ scope }">
                    <div class="flex-center">
                        <el-button
                            link
                            type="primary"
                            :disabled="scope.row.status === ARTICLE_STATUS.PUBLISHED"
                            size="small"
                            @click="handleToEdit(scope)"
                            >编辑</el-button
                        >
                        <el-dropdown @command="(command:ARTICLE_OPERATE_MODE) => handleMoreOperate(command, scope.row)">
                            <el-button
                                size="small"
                                link>
                                更多<i-ep-arrow-down />
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item
                                        v-if="scope.row.status === ARTICLE_STATUS.PUBLISHED"
                                        :command="ARTICLE_OPERATE_MODE.OFFLINE"
                                        ><i-ep-sold-out />{{ ARTICLE_OPERATE_MODE_LABEL.OFFLINE }}
                                    </el-dropdown-item>
                                    <el-dropdown-item
                                        v-else
                                        :command="ARTICLE_OPERATE_MODE.PUBLISH">
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
                    </div>
                </template>
            </sjc-table>
        </el-space>
    </div>
</template>

<style lang="scss">
.tr-item {
    .thumbnail {
        transition: all 0.5s ease-in-out;
    }
}
.tr-item:hover {
    .thumbnail {
        transform: scale(1.1);
    }
}
</style>
