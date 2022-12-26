/*
 * @Description:
 * @FilePath: \dms-web\src\components\editor\useEditor.ts
 * @Author: zys
 * @Date: 2022-11-17 15:19:05
 * @LastEditTime: 2022-12-26 11:27:54
 * @LastEditors: zys
 * @Reference:
 */
import type { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import type { EditorProps, EditorEmits } from './SjcEditor.vue';
import {
    customParseLinkUrl,
    customCheckLinkFn,
    customCheckImageFn,
    customCheckVideoFn,
    customParseVideoSrc,
    findAllImgSrcsFromHtml,
    extractImageDataFromRtf,
    replaceImagesFileSourceWithInlineRepresentation,
    _convertHexToBase64,
} from './constants';
import type { InsertImageFnType, InsertVideoFnType, InsertAttachmentFnType, LinkList } from './types';
import {
    getFileIdByUrl,
    to,
    getTextWords,
    xss,
    checkFileType,
    FILE_TYPE_ERROR_MAP,
    FILE_TYPE_LIMIT_MAP,
    FILE_SIZE_ERROR_MAP,
    dataURLToFile,
} from '@/utils';
import { FILE_TYPE, UPLOAD_FILE_TYPE, FILE_SERVER, ARTICLE_API } from '@/enums';
import { useApiManage } from './useApiManage';

type MessageType = 'success' | 'warning' | 'info' | 'error';

export const useEditorControl = (props: EditorProps, emit: EditorEmits) => {
    const API_MAP = useApiManage(props.fileServer!);
    const uploadImgList = ref<string[]>([]);
    const uploadVideoList = ref<string[]>([]);
    const uploadAttachmentList = ref<string[]>([]);
    const isFirst = ref<boolean>(true);
    const isFocus = ref(false);
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef<IDomEditor>();

    const editorLoading = ref(false);

    const toolbarConfig = reactive({
        // toolbarKeys: [],
        excludeKeys: ['codeBlock'],
        insertKeys: {
            index: -1, // 自定义插入的位置
            keys: ['uploadAttachment'], // “上传附件”菜单
        },
    });

    const editorConfig: Partial<IEditorConfig> = reactive({
        placeholder: '请输入内容',
        autoFocus: false,
        readOnly: props.readOnly,
        scroll: false,
        // 在编辑器中，点击选中“附件”节点时，要弹出的菜单
        hoverbarKeys: {
            attachment: {
                menuKeys: ['downloadAttachment'], // “下载附件”菜单
            },
        },

        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
            insertLink: {
                checkLink: customCheckLinkFn,
                parseLinkUrl: customParseLinkUrl,
            },
            editLink: {
                checkLink: customCheckLinkFn,
                parseLinkUrl: customParseLinkUrl,
            },
            uploadImage: {
                server: '',
                // 单个文件的最大体积限制，默认为 2M
                maxFileSize: 2 * 1024 * 1024, // 2M
                // 最多可上传几个文件，默认为 100
                maxNumberOfFiles: 10,
                // 自定义上传
                async customUpload(file: File, insertFn: InsertImageFnType) {
                    // file 即选中的文件
                    if (!beforeUploadFile(file, FILE_TYPE.IMAGE)) {
                        return false;
                    }
                    editorLoading.value = true;
                    const [error, data = {}] = await to(
                        API_MAP[ARTICLE_API.UPLOAD_FILE]({ file, fileType: UPLOAD_FILE_TYPE.IMAGE })
                    );
                    // 自己实现上传，并得到图片 url alt href
                    // 最后插入图片
                    if (error) {
                        ElMessage.error('上传图片失败，请重试');
                        editorLoading.value = false;
                        return Promise.reject(error);
                    } else {
                        const url = (data as any).imgUrl;
                        uploadImgList.value.push(url);
                        insertFn(url, '', url);
                        editorLoading.value = false;
                        return url;
                    }
                },
            },
            uploadVideo: {
                server: '',
                // 自定义上传
                async customUpload(file: File, insertFn: InsertVideoFnType) {
                    // file 即选中的文件
                    if (!beforeUploadFile(file, FILE_TYPE.VIDEO)) {
                        return false;
                    }

                    editorLoading.value = true;

                    const [error, data = {}] = await to(
                        API_MAP[ARTICLE_API.UPLOAD_FILE]({ file, fileType: UPLOAD_FILE_TYPE.ANY_FILE })
                    );
                    // 自己实现上传，并得到图片 url alt href
                    // 最后插入图片
                    if (error) {
                        ElMessage.error('上传视频失败，请重试');
                    } else {
                        const url = (data as any).imgUrl;
                        uploadVideoList.value.push(url);
                        insertFn(url);
                    }

                    editorLoading.value = false;
                },
            },
            // “上传附件”菜单的配置
            uploadAttachment: {
                server: '',
                fieldName: 'custom-fileName',
                maxFileSize: 10 * 1024 * 1024, // 10M
                // 用户自定义上传
                async customUpload(file: File, insertFn: InsertAttachmentFnType) {
                    // file 即选中的文件
                    if (!beforeUploadFile(file)) {
                        return false;
                    }
                    editorLoading.value = true;
                    const [error, data = {}] = await to(
                        API_MAP[ARTICLE_API.UPLOAD_FILE]({ file, fileType: UPLOAD_FILE_TYPE.ANY_FILE })
                    );
                    // 自己实现上传，并得到图片 url alt href
                    // 最后插入图片
                    if (error) {
                        ElMessage.error('上传附件失败，请重试');
                    } else {
                        const url = (data as any).imgUrl;
                        uploadAttachmentList.value.push(url);
                        insertFn(file.name, url);
                    }

                    editorLoading.value = false;
                },
            },
            insertImage: {
                checkImage: customCheckImageFn,
                parseImageSrc: customParseLinkUrl,
            },
            editImage: {
                checkImage: customCheckImageFn,
                parseImageSrc: customParseLinkUrl,
            },
            insertVideo: {
                checkVideo: customCheckVideoFn, // 也支持 async 函数
                parseVideoSrc: customParseVideoSrc, // 也支持 async 函数
            },
            editVideo: {
                checkVideo: customCheckVideoFn, // 也支持 async 函数
                parseVideoSrc: customParseVideoSrc, // 也支持 async 函数
            },
        },
    });

    const headers = ref<any[]>([]);
    const isFullScreen = ref(false);
    const TEXT_LENGTH = ref(0);

    const beforeUploadFile = (file: File, type?: FILE_TYPE) => {
        const FILE_NAME_SUFFIX = checkFileType(file.name);
        if (!FILE_NAME_SUFFIX) {
            ElMessage.error('上传的文件格式不支持，请重新上传！');
            return false;
        }
        if (type && FILE_NAME_SUFFIX !== type) {
            ElMessage.error(FILE_TYPE_ERROR_MAP[type]);
            return false;
        }
        if (!file.size || file.size > FILE_TYPE_LIMIT_MAP[FILE_NAME_SUFFIX]) {
            ElMessage.error(FILE_SIZE_ERROR_MAP[FILE_NAME_SUFFIX]);
            return false;
        }
        return true;
    };

    const handleCreated = (editor: IDomEditor) => {
        editorRef.value = editor; // 记录 editor 实例，重要！
        editor.on('fullScreen', () => {
            isFullScreen.value = !isFullScreen.value;
        });
        editor.on('unFullScreen', () => {
            isFullScreen.value = !isFullScreen.value;
        });
    };

    const handleChange = (editor: IDomEditor) => {
        if (isFirst) {
            uploadImgList.value = editor
                .getElemsByType('image')
                .map((item) => (item as any).src)
                .filter((url) => {
                    return url.includes(FILE_SERVER.LXT) || url.includes(FILE_SERVER.ZJFW);
                });
            uploadVideoList.value = editor
                .getElemsByType('video')
                .map((item) => (item as any).src)
                .filter((url) => {
                    return url.includes(FILE_SERVER.LXT) || url.includes(FILE_SERVER.ZJFW);
                });
            uploadAttachmentList.value = editor
                .getElemsByType('attachment')
                .map((item) => (item as any).link)
                .filter((url) => {
                    return url.includes(FILE_SERVER.LXT) || url.includes(FILE_SERVER.ZJFW);
                });
            isFirst.value = false;
        }
        validate('输入内容');
        if (editor.getText() || !editor.isEmpty()) {
            emit('update:modelValue', xss.process(editor.getHtml()));
        } else {
            emit('update:modelValue', '');
        }
        headers.value = editor.getElemsByTypePrefix('header');
    };

    const handleMaxLength = () => {
        validate('输入内容');
    };

    const validate = (label = '') => {
        const text = editorRef.value?.getText() ?? '';
        TEXT_LENGTH.value = getTextWords(text);
        if (TEXT_LENGTH.value > props.maxTextLength!) {
            customAlert(`${label}不能超过${props.maxTextLength}字`, 'warning');
            return false;
        }
        return true;
    };

    const customAlert = (s: string, t: MessageType) => {
        ElMessage.closeAll();
        switch (t) {
            case 'success':
                ElMessage.success(s);
                break;
            case 'info':
                ElMessage.info(s);
                break;
            case 'warning':
                ElMessage.warning(s);
                break;
            case 'error':
                ElMessage.error(s);
                break;
            default:
                ElMessage.info(s);
                break;
        }
    };

    const customPaste = (editor: IDomEditor, event: ClipboardEvent) => {
        // event 是 ClipboardEvent 类型，可以拿到粘贴的数据
        // 可参考 https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent

        let html = event.clipboardData?.getData('text/html'); // 获取粘贴的 html
        const rtf = event.clipboardData?.getData('text/rtf'); // 获取 rtf 数据（如从 word wsp 复制粘贴）

        if (html && rtf) {
            // 该条件分支即表示要自定义word粘贴

            // 列表缩进会超出边框，直接过滤掉
            // html = html.replace(/text\-indent:\-(.*?)pt/gi, '');

            // 从html内容中查找粘贴内容中是否有图片元素，并返回img标签的属性src值的集合
            const imgSrcs = findAllImgSrcsFromHtml(html);
            // 如果有
            if (!imgSrcs || !Array.isArray(imgSrcs) || !imgSrcs.length) {
                editor.dangerouslyInsertHtml(html);
                // 阻止默认的粘贴行为
                event.preventDefault();
                return false;
            }
            // 从rtf内容中查找图片数据
            const rtfImageData = extractImageDataFromRtf(rtf);

            // 如果未找到
            if (!rtfImageData.length) {
                editor.dangerouslyInsertHtml(html);
                // 阻止默认的粘贴行为
                event.preventDefault();
                return false;
            }
            // TODO：此处可以将图片上传到自己的服务器上
            const promise: Promise<any>[] = rtfImageData.map(async (rtfImage) => {
                const file = dataURLToFile(`data:${rtfImage.type};base64,${_convertHexToBase64(rtfImage.hex)}`);
                const [, url = ''] = await to(editorConfig.MENU_CONF!.uploadImage.customUpload(file, () => {}));
                return url || '';
            });
            Promise.all(promise).then((urlList) => {
                // 执行替换：将html内容中的img标签的src替换成ref中的图片数据，如果上面上传了则为图片路径
                html = replaceImagesFileSourceWithInlineRepresentation(html!, imgSrcs, urlList, false);
                editor.dangerouslyInsertHtml(html ?? '');
                // 阻止默认的粘贴行为
                event.preventDefault();
                return false;
            });
            event.preventDefault();
            return false;
        } else {
            return true;
        }
    };

    // 提交表单时删除上传的图片
    const deleteUploadedFile = () => {
        const imageList = editorRef.value?.getElemsByType('image') ?? [];
        const videoList = editorRef.value?.getElemsByType('video') ?? [];
        const attachmentList = editorRef.value?.getElemsByType('attachment') ?? [];
        const imageSrcList: LinkList = imageList.map((item) => (item as any).src);
        const videoSrcList: LinkList = videoList.map((item) => (item as any).src);
        const attachmentSrcList: LinkList = attachmentList.map((item) => (item as any).link);
        const deleteImageList = uploadImgList.value.filter((item) => !imageSrcList.includes(item));
        const deleteVideoList = uploadVideoList.value.filter((item) => !videoSrcList.includes(item));
        const deleteAttachmentList = uploadAttachmentList.value.filter((item) => !attachmentSrcList.includes(item));
        deleteImageList.forEach(async (item) => {
            const { data = false } = await API_MAP[ARTICLE_API.IS_THUMBNAIL]({ id: getFileIdByUrl(item) });
            if (data) {
                return false;
            }
            const { data: isExist = false } = await API_MAP[ARTICLE_API.IS_EXIST_FILE]({ id: getFileIdByUrl(item) });
            if (!isExist) {
                return false;
            }
            API_MAP[ARTICLE_API.DELETE_FILE]({ id: getFileIdByUrl(item) })
                .then(() => {
                    uploadImgList.value = [...imageSrcList];
                })
                .catch(() => {});
        });
        deleteVideoList.forEach(async (item) => {
            const { data: isExist = false } = await API_MAP[ARTICLE_API.IS_EXIST_FILE]({ id: getFileIdByUrl(item) });
            if (!isExist) {
                return false;
            }
            API_MAP[ARTICLE_API.DELETE_FILE]({ id: getFileIdByUrl(item) })
                .then(() => {
                    uploadVideoList.value = [...videoSrcList];
                })
                .catch(() => {});
        });
        deleteAttachmentList.forEach(async (item) => {
            const { data: isExist = false } = await API_MAP[ARTICLE_API.IS_EXIST_FILE]({ id: getFileIdByUrl(item) });
            if (!isExist) {
                return false;
            }
            API_MAP[ARTICLE_API.DELETE_FILE]({ id: getFileIdByUrl(item) })
                .then(() => {
                    uploadAttachmentList.value = [...attachmentSrcList];
                })
                .catch(() => {});
        });
    };
    const goAnchor = (id: string) => {
        const anchor = document.getElementById(id);
        anchor?.scrollIntoView();
    };

    const getTitleText = computed(() => {
        return ({ children }: any) => {
            return children[0].text;
        };
    });

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value;
        if (editor == null) return;
        editor.destroy();
    });

    return {
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
        handleMaxLength,
        customAlert,
        customPaste,
        deleteUploadedFile,
        goAnchor,
        getTitleText,
    };
};
