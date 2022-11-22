<script lang="ts" setup>
import type { Recordable } from '@/types/globals';
import SjcEditor from '@/components/editor/SjcEditor.vue';
import type { NewsItem } from '@/types';
import { ARTICLE_MODULE } from '@/enums';
import { useArticleModule } from '../hooks';

const props = withDefaults(
    defineProps<{
        // eslint-disable-next-line no-undef
        data: NewsItem | Recordable;
        module: ARTICLE_MODULE;
    }>(),
    {
        data: () => ({}),
        module: ARTICLE_MODULE.NEWS_LXT,
    }
);

const { getArticleTypeLabel } = useArticleModule(props.module);
</script>

<template>
    <div class="detail">
        <template v-if="data.id">
            <div class="text-center text-2xl">{{ data.title }}</div>
            <div class="text-center">{{ data.subTitle }}</div>
            <div class="flex-between px-20">
                <div>信息来源：{{ data.origin }}</div>
                <div>发布日期：{{ data.publishDate }}</div>
            </div>
            <el-divider class="!border-t-$el-color-error"></el-divider>
            <sjc-editor
                v-model:model-value="data.content"
                read-only></sjc-editor>
        </template>
        <el-empty
            v-else
            :description="`请在左侧选择${getArticleTypeLabel}~`"></el-empty>
    </div>
</template>

<style lang="postcss">
.detail {
    @apply;
}
</style>
