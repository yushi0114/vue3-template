<script lang="ts" setup>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { useEditorControl } from './useEditor';
import { FILE_SERVER } from '@/enums';

type EditorProps = {
    modelValue: string;
    maxTextLength?: number;
    readOnly?: boolean;
    fileServer?: FILE_SERVER;
};

type EditorEmits = {
    (e: 'update:modelValue', value: string): void;
};
const props = withDefaults(defineProps<EditorProps>(), {
    modelValue: '',
    maxTextLength: 10000,
    readOnly: false,
    fileServer: FILE_SERVER.LXT,
});

const emit = defineEmits<EditorEmits>();
const {
    editorRef,
    editorLoading,
    toolbarConfig,
    editorConfig,
    headers,
    isFullScreen,
    TEXT_LENGTH,
    handleCreated,
    handleChange,
    customAlert,
    customPaste,
    deleteUploadedFile,
    goAnchor,
    getTitleText,
} = useEditorControl(props, emit);

const getFullScreenStyle = computed(() => {
    if (isFullScreen) {
        return { zIndex: 3000 };
    }
    return {};
});
defineExpose({
    deleteUploadedFile,
});
</script>

<template>
    <div
        class="wangeditor-wrapper w-full"
        v-loading="editorLoading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading">
        <div
            class="wangeditor"
            :style="getFullScreenStyle"
            v-if="!readOnly">
            <!-- 工具栏 -->
            <Toolbar
                class="wangeditor__toolbar"
                :class="{ 'wangeditor__toolbar--full': isFullScreen }"
                :editor="editorRef"
                mode="default"
                :defaultConfig="toolbarConfig" />
            <!-- 编辑器 -->
            <Editor
                class="wangeditor__editor"
                :class="{ 'wangeditor__editor--full': isFullScreen }"
                :defaultConfig="editorConfig"
                mode="default"
                :model-value="modelValue"
                @onChange="handleChange"
                @onCreated="handleCreated"
                @customAlert="customAlert"
                @customPaste="customPaste" />
            <!-- 显示 headers -->
            <div
                class="wangeditor__headers"
                :class="{ 'wangeditor__headers--full': isFullScreen }">
                <div class="title">标题目录</div>
                <ul id="header-container">
                    <li
                        v-for="item in headers"
                        :key="item.id"
                        :type="(item as any).type"
                        :id="item.id"
                        :title="getTitleText(item)"
                        @click="goAnchor(item.id)">
                        {{ getTitleText(item) }}
                    </li>
                </ul>
            </div>
            <div class="wangeditor__limit">{{ TEXT_LENGTH }}/{{ props.maxTextLength }}</div>
        </div>
        <div
            class="wangeditor wangeditor--disabled"
            v-else>
            <!-- 编辑器 -->
            <Editor
                class="wangeditor__editor wangeditor__editor--readonly"
                :defaultConfig="editorConfig"
                v-model="modelValue"
                @onCreated="handleCreated" />
        </div>
    </div>
</template>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
.wangeditor-wrapper {
    margin-top: $gap-sm;
    .wangeditor {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        border: $border;
        z-index: 3;
        line-height: 1.3;
        background-color: $bg-color;

        ol {
            list-style-type: decimal;
        }
        ul {
            list-style: disc;
        }

        &--disabled {
            border: none;
        }

        &__toolbar {
            flex-grow: 1;
            flex-basis: 100%;
            border-bottom: $border;
        }

        &__toolbar--full {
            flex-grow: 0;
            flex-basis: auto;
        }

        &__editor {
            width: 75%;
            min-height: 400px !important;
            display: grid;
            padding-bottom: $gap-lg;
            h1 {
                font-size: 2em !important;
                margin-block-start: 0.67em !important;
                margin-block-end: 0.67em !important;
            }

            img {
                max-width: 100%;
                height: auto;
            }

            video {
                max-width: 100%;
                height: auto;
            }

            .w-e-text-placeholder {
                top: $gap-md;
                left: $gap-sm;
            }

            &--full {
                width: 76%;
                overflow-y: auto;
                background-color: $bg-color;
                .w-e-text-container {
                    height: auto !important;
                }
            }

            &--readonly {
                width: 100%;
            }
        }

        &__headers {
            width: 24%;
            border-left: $border;

            .title {
                @include font(18px);
                padding: $gap-lg;
                text-align: center;
                color: $text-color-primary;
            }
            #header-container {
                list-style-type: none;
                padding: 0 $gap-lg;
                li {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: $text-color-primary;
                    margin: $gap-sm 0;
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                    }
                }
                li[type='header1'] {
                    @include font(24px);
                    font-weight: bold;
                }
                li[type='header2'] {
                    @include font(20px);
                    padding-left: 15px;
                    font-weight: bold;
                }
                li[type='header3'] {
                    @include font(16px);
                    padding-left: 30px;
                    font-weight: bold;
                }
                li[type='header4'] {
                    @include font(14px);
                    padding-left: 45px;
                    font-weight: bold;
                }
                li[type='header5'] {
                    @include font(12px);
                    padding-left: 60px;
                    font-weight: bold;
                }
            }
        }

        &__headers--full {
            position: absolute;
            right: 0;
            top: 40px;
            background-color: $bg-color;
            border-top: $border;
            height: 100%;
            overflow-y: auto;
        }

        &__limit {
            position: absolute;
            bottom: 10px;
            right: 25%;
            color: $text-color-placeholder;
        }
    }
}
</style>
