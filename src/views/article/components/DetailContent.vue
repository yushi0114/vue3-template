<script lang="ts" setup>
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
            <Text
                class="px-10"
                size="xl"
                :bold="true"
                truncate
                block
                align="center">
                {{ data.title }}
            </Text>
            <Text
                class="px-30"
                size="lg"
                truncate
                block
                align="center">
                {{ data.subTitle }}
            </Text>
            <FlexRow
                horizontal="between"
                class="px-20">
                <ListField
                    class="flex-1 min-w-0"
                    label="信息来源"
                    truncate
                    >{{ data.origin }}</ListField
                >
                <ListField label="发布日期">{{ data.publishDate }}</ListField>
            </FlexRow>
            <el-divider style="--el-border-color: #a12e37;margin: 16px 0"></el-divider>
            <sjc-editor
                class="editor"
                v-model:model-value="data.content"
                read-only></sjc-editor>
        </template>
        <el-empty
            v-else
            :description="`请在左侧选择${getArticleTypeLabel}~`"></el-empty>
    </div>
</template>

<style lang="scss">
.detail {
    padding: 0 160px;
    .editor{
        padding: 0 $gap-lg;
    }
}
</style>
