<script lang="ts" setup>
import { Boot } from '@wangeditor/editor';
import attachmentModule from '@wangeditor/plugin-upload-attachment';
import attachmentRenderElem from '@/components/editor-attachment/render-elem';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { useEditorControl } from './useEditor';
import { FILE_SERVER } from '@/enums';

export type EditorProps = {
    modelValue: string;
    maxTextLength?: number;
    readOnly?: boolean;
    fileServer?: FILE_SERVER;
};

export type EditorEmits = {
    (e: 'update:modelValue', value: string): void;
};
const props = withDefaults(defineProps<EditorProps>(), {
    modelValue: '',
    maxTextLength: 10000,
    readOnly: false,
    fileServer: FILE_SERVER.LXT,
});

const innerModel = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
});

const emit = defineEmits<EditorEmits>();
const {
    isFocus,
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

// 注册上传附件插件。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
const { editorPlugin } = attachmentModule;
if (editorPlugin && Boot.plugins.lastIndexOf(editorPlugin) < 0) {
    Boot.registerModule(attachmentModule);
    Boot.registerRenderElem(attachmentRenderElem);
}

</script>

<template>
    <div
        class="wangeditor-wrapper w-full"
        v-loading="editorLoading"
        element-loading-text="加载中">
        <div
            :class="['wangeditor', isFocus && 'is-focus']"
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
                :model-value="innerModel"
                @onChange="handleChange"
                @onCreated="handleCreated"
                @customAlert="customAlert"
                @customPaste="customPaste"
                @onFocus="isFocus = true"
                @onBlur="isFocus = false" />
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
                v-model="innerModel"
                @onCreated="handleCreated" />
        </div>
    </div>
</template>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss">
.wangeditor-wrapper {
    margin-top: $gap-sm;
    .wangeditor {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        border: $border;
        border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
        z-index: 3;
        line-height: 1.3;
        background-color: var(--w-e-textarea-bg-color);
        transition: var(--el-transition-border);

        &.is-focus {
            border-color: $color-primary;
        }

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
            padding: 0 2px;
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

            .w-e-text-container{
                word-break: break-all;
            }

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

            a {
                color: $color-primary-light-3;
                cursor: pointer;
                &:hover {
                    color: $color-primary;
                }
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
