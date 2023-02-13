<script lang="ts" setup>
import { TAB_LIST } from '../constants';
import ArticleList from './ArticleList.vue';
import { ARTICLE_MODULE, ARTICLE_STATUS } from '@/enums';

const props = withDefaults(
    defineProps<{
        module: ARTICLE_MODULE;
        tabValue?: ARTICLE_STATUS;
    }>(),
    {
        module: ARTICLE_MODULE.NEWS_LXT,
    }
);

const activeName = ref(props.tabValue ?? ARTICLE_STATUS.ALL);
defineExpose({
    activeName
});
</script>

<template>
    <div class="article-wrapper">
        <el-tabs
            class="h-full flex flex-col"
            :class="{ tabs: $attrs['tab-position'] === 'left' }"
            v-bind="$attrs"
            v-model="activeName">
            <el-tab-pane
                class="h-full"
                v-for="tab in TAB_LIST"
                :name="tab.value"
                :key="tab.title">
                <template #label>
                    <el-button
                        v-if="$attrs['tab-position'] === 'left'"
                        class="w-full tab-label"
                        :class="[tab.value === activeName && 'active']"
                        text>
                        <FlexRow gap="xs">
                            <Icon :name="tab.icon"></Icon>
                            <Text size="sm">{{ tab.title }}</Text>
                        </FlexRow>
                    </el-button>
                    <Text
                        size="sm"
                        v-else
                        >{{ tab.title }}</Text
                    >
                </template>
                <slot
                    :tab="tab"
                    :active-name="activeName"
                    :module="module">
                    <article-list
                        v-if="activeName === tab.value"
                        :tab="tab"
                        :module="module"></article-list>
                </slot>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style lang="scss" scoped>
.article-wrapper {
    height: 100%;
    & .tabs {
        display: flex;
        flex-direction: row;

        :deep(.el-tabs__header) {
            margin-right: $gap-md;
        }

        :deep(.el-tabs__item) {
            padding-left: 0;
            padding-right: $gap-md;
            margin-bottom: $gap-xs;
            width: 8.75rem;
            height: 2.5rem;

            .tab-label {
                height: 100%;
            }
        }


        :deep(.el-tabs__nav-wrap::after) {
            width: $border-width;
        }

        :deep(.el-tabs--left) {
            align-items: flex-start;
        }

        :deep(.el-tabs__active-bar) {
            display: none;
        }

        :deep(.el-tabs__content) {
            flex: 1;
            height: 100%;
        }

        :deep(.el-button) {
            transition: .2s ease all;
            &:hover {
                background-color: $color-info-light-9;
                color: $color-primary;
            }

            &:focus {
                background-color: inherit;
            }
        }
    }

    :deep(.el-tabs__content) {
        flex: 1;
    }

    .tab-label {
        justify-content: flex-start;
    }

    .tab-label.active {
        background-color: $color-info-light-9;
        color: $color-primary;

        &:focus {
            background-color: $color-info-light-9;
            color: $color-primary;
        }
    }
}
</style>
