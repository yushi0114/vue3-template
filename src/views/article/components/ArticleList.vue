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
                    ><i-ep-plus />新建</el-button
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
                    class="w-70px h-60px border border-$el-fill-color rounded-lg overflow-hidden"
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
            <template #append="{ props }">
                <el-row>
                    <el-col
                        :span="24"
                        class="flex items-center gap-2">
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
                <div class="flex-center items-end gap-2">
                    <div
                        :class="['flex-center', scope.row.status === ARTICLE_STATUS.PUBLISHED && 'cursor-not-allowed']">
                        <!-- <TextHoverable
                            size="sm"
                            :color="scope.row.status === ARTICLE_STATUS.PUBLISHED ? 'disabled' : 'regular'"
                            @click="handleToEdit(scope)">
                            编辑
                        </TextHoverable> -->
                        <el-button
                            type="primary"
                            circle
                            :disabled="scope.row.status === ARTICLE_STATUS.PUBLISHED"
                            @click="handleToEdit(scope)">
                            <el-tooltip
                                placement="top"
                                content="编辑">
                                <Icon name="ep-edit" />
                            </el-tooltip>
                        </el-button>
                    </div>
                    <el-dropdown @command="(command:ARTICLE_OPERATE_MODE) => handleMoreOperate(command, scope.row)">
                        <!-- <TextHoverable
                            size="sm"
                            color="regular">
                            更多
                        </TextHoverable> -->
                        <el-button circle>
                            <el-tooltip
                                placement="top"
                                content="更多">
                                <Icon name="ep-more-filled" />
                            </el-tooltip>
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
