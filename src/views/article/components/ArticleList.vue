<script lang="ts" setup>
import ArticleSortDialog from './ArticleSortDialog.vue';
import { Plus } from '@element-plus/icons-vue';
import { ListField, ItemOperate } from '@/components';
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
const { params, tableConfig, currentArticle, showArticleSortDialog, state, pageConfig, pageSizeChange, handleMoreOperate, fetchTableData, updateSort } = useTable(
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
        <ListQueryControl
            v-model="listControlModel"
            :searchConfig="{
                label: `请输入${getArticleTypeLabel}标题进行查询`,
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
                    :icon="Plus"
                    @click="handleToCreate"
                    >新建</el-button
                >
            </template>
        </ListQueryControl>
        <LoadingBoard :loading="state.loading" :empty="!state.data.length">
        <sjc-table
            ref="sjcTableRef"
            :table-data="state.data"
            :columns="TABLE_COLUMNS"
            :show-header="false"
            row-class-name="tr-item"
            :table-config="tableConfig"
            :pagination-config="pageConfig"
            @page-change="pageSizeChange">
            <template #thumbnail="{ scope }">
                <div
                    class="thumbnail-wrapper"
                    v-if="isNewsModule">
                    <img
                        class="thumbnail"
                        v-real-img="{ img: scope.row.thumbnail, errImg }"
                        alt="" />
                </div>
                <FlexColumn
                    vertical="center"
                    v-else
                    class="date">
                    <Text class="date-day" size="xl">
                        {{ getDate(scope.row.publishDate).day }}
                    </Text>
                    <div style="flex:1;">{{ getDate(scope.row.publishDate).yearAndMonth }}</div>
                </FlexColumn>
            </template>
            <template #append="{ props }">
                <el-row>
                    <el-col
                        :span="24"
                        class="title">
                        <list-field
                            truncate
                            hoverable
                            @click="handleToDetail({ row: props.row, status: params.status })">
                            {{ props.row.title }}
                        </list-field>
                        <el-tag
                            :type="ARTICLE_STATUS_TAG_MAP[props.row.status as keyof typeof ARTICLE_STATUS_TAG_MAP].status">
                            {{ ARTICLE_STATUS_TAG_MAP[props.row.status as keyof typeof ARTICLE_STATUS_TAG_MAP].label }}
                        </el-tag>
                        <el-tag
                            v-if="isNewsModule && props.row.hotNews === NEWS_TYPE.HOT"
                            type="danger">
                            热点新闻
                        </el-tag>
                    </el-col>
                    <el-col
                        :span="24"
                        class="flex">
                        <list-field
                            truncate
                            label="摘要"
                            type="desc">
                            {{ props.row.summary }}
                        </list-field>
                    </el-col>
                    <template v-if="props.row.status === ARTICLE_STATUS.PUBLISHED">
                        <el-col :span="8">
                            <list-field
                                label="发布者"
                                type="desc">
                                {{ props.row.updateBy }}
                            </list-field>
                        </el-col>
                        <el-col :span="16">
                            <list-field
                                label="发布日期"
                                type="desc">
                                {{ props.row.createTime }}
                            </list-field>
                        </el-col>
                    </template>
                    <template v-if="props.row.status === ARTICLE_STATUS.OFFLINE">
                        <el-col :span="8">
                            <list-field
                                label="下线者"
                                type="desc">
                                {{ props.row.updateBy }}
                            </list-field>
                        </el-col>
                        <el-col :span="16">
                            <list-field
                                label="下线时间"
                                type="desc">
                                {{ props.row.updateTime }}
                            </list-field>
                        </el-col>
                    </template>
                    <template v-if="props.row.status === ARTICLE_STATUS.DRAFT">
                        <el-col :span="8">
                            <list-field
                                label="更新者"
                                type="desc">
                                {{ props.row.updateBy }}
                            </list-field>
                        </el-col>
                        <el-col :span="16">
                            <list-field
                                label="更新时间"
                                type="desc">
                                {{ props.row.updateTime }}
                            </list-field>
                        </el-col>
                    </template>
                </el-row>
            </template>
            <template #handler="{ scope }">
                <FlexRow
                    vertical="end"
                    horizontal="center">
                    <ListOperator
                        :max-out-count="1"
                        @[ItemOperate.edit]="handleToEdit(scope)"
                        @operate="(opt) => handleMoreOperate(opt.value, scope.row)"
                        :operators="[
                            { name: '编辑', value: ItemOperate.edit, icon: 'ep-edit-pen' },
                            scope.row.status === ARTICLE_STATUS.PUBLISHED ? {
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
                    <!-- <FlexRow
                        horizontal="center"
                        :class="[scope.row.status === ARTICLE_STATUS.PUBLISHED && 'cursor-not-allowed']">
                        <el-tooltip
                            placement="top"
                            content="编辑">
                            <el-button
                                type="primary"
                                text
                                :disabled="scope.row.status === ARTICLE_STATUS.PUBLISHED"
                                @click="handleToEdit(scope)">
                                <Icon name="ep-edit" />
                            </el-button>
                        </el-tooltip>
                    </FlexRow>
                    <el-dropdown @command="(command:ARTICLE_OPERATE_MODE) => handleMoreOperate(command, scope.row)">
                        <Text>
                            <el-tooltip
                                placement="top"
                                content="更多">
                                <el-button
                                    text
                                    :icon="MoreFilled"></el-button>
                            </el-tooltip>
                        </Text>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    v-if="scope.row.status === ARTICLE_STATUS.PUBLISHED"
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
                    </el-dropdown> -->
                </FlexRow>
            </template>
        </sjc-table>
        </LoadingBoard>
        <ArticleSortDialog v-model="showArticleSortDialog" :data="currentArticle" @confirm="(row) => updateSort({ id: row.id, sort: Number(row.sort) })"></ArticleSortDialog>
    </div>
</template>

<style lang="scss" scoped>
.tr-item {
    .thumbnail-wrapper {
        width: 70px;
        height: 60px;
        border: $border-width $border-style $fill-color;
        border-radius: $gap-xs;
        overflow:hidden;
        .thumbnail {
            width: 100%;
            height: 100%;
            transition: all 0.5s ease-in-out;
        }
    }
    .date {
        width: 67px;
        height: 67px;
        border: $border-width $border-style $fill-color;
        &-day {
            width: 100%;
            height: 40px;
            line-height: 40px;
            background-color: $fill-color;
            text-align: center;
        }
    }

    .title {
        display: flex;
        align-items: center;
        gap: $gap-xs;
    }
}
.tr-item:hover {
    /* background-color: var(--el-fill-color-light); */
    .thumbnail {
        transform: scale(1.1);
    }
}
</style>
