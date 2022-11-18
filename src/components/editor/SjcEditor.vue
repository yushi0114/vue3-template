<script lang="ts" setup>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { Boot } from '@wangeditor/editor';
import attachmentModule from '@wangeditor/plugin-upload-attachment';
import { useEditorControl } from './useEditor';
import { FILE_SERVER } from '@/enums';

type EditorProps = {
    modelValue: string;
    readOnly: boolean;
    fileServer: FILE_SERVER;
};

type EditorEmits = {
    (e: 'update:modelValue', value: string): void;
};
const props = withDefaults(defineProps<EditorProps>(), {
    modelValue: '',
    readOnly: false,
    fileServer: FILE_SERVER.LXT,
});

const emit = defineEmits<EditorEmits>();
Boot.registerModule(attachmentModule);
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
        <div class="wangeditor" :style="getFullScreenStyle" v-if="!readOnly">
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
            <div class="wangeditor__headers" :class="{ 'wangeditor__headers--full': isFullScreen }">
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
            <div class="wangeditor__limit">{{ TEXT_LENGTH }}/10000</div>
        </div>
        <div class="wangeditor wangeditor--disabled" v-else>
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
<style lang="scss">
.wangeditor-wrapper {
    margin-top: 10px;
    .wangeditor {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        border: 1px solid #ccc;
        z-index: 3;
        line-height: 1.3;
        background-color: var(--w-e-textarea-bg-color);

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
            border-bottom: 1px solid #ccc;
        }

        &__toolbar--full {
            flex-grow: 0;
            flex-basis: auto;
        }

        &__editor {
            width: 75%;
            min-height: 400px !important;
            padding-bottom: 20px;
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
                top: 16px;
                left: 12px;
            }

            &--full {
                width: 76%;
                overflow-y: auto;
                background-color: #ffffff;
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
            border-left: 1px solid #ccc;

            .title {
                padding: 20px;
                text-align: center;
                font-size: 18px;
            }
            #header-container {
                list-style-type: none;
                padding: 0 20px;
                li {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #333;
                    margin: 10px 0;
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                    }
                }
                li[type='header1'] {
                    font-size: 24px;
                    font-weight: bold;
                }
                li[type='header2'] {
                    font-size: 20px;
                    padding-left: 15px;
                    font-weight: bold;
                }
                li[type='header3'] {
                    font-size: 16px;
                    padding-left: 30px;
                    font-weight: bold;
                }
                li[type='header4'] {
                    font-size: 14px;
                    padding-left: 45px;
                    font-weight: bold;
                }
                li[type='header5'] {
                    font-size: 12px;
                    padding-left: 60px;
                    font-weight: bold;
                }
            }
        }

        &__headers--full {
            position: absolute;
            right: 0;
            top: 40px;
            background-color: #fff;
            border-top: 1px solid #ccc;
            height: 100%;
            overflow-y: auto;
        }

        &__limit {
            position: absolute;
            bottom: 10px;
            right: 25%;
            color: #ccc;
        }
    }
}
</style>
