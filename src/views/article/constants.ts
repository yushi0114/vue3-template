/*
 * @Description:
 * @FilePath: \dms-web\src\views\article\constants.ts
 * @Author: zys
 * @Date: 2022-11-14 11:26:22
 * @LastEditTime: 2022-11-18 10:30:16
 * @LastEditors: zys
 * @Reference:
 */
import {
    FormType,
    ARTICLE_STATUS,
    ARTICLE_STATUS_LABEL,
    ARTICLE_STATUS_TAG,
    SORT_TYPE,
    ARTICLE_MODULE,
    ARTICLE_TYPE_LABEL,
    FILE_TYPE,
    FILE_SERVER,
} from '@/enums';
import type { DefItem } from '@/components/SjcForm/types';
import { useUserStore } from '@/stores';
const {
    state: { user },
} = useUserStore();
export const TAB_LIST = [
    {
        title: ARTICLE_STATUS_LABEL.ALL,
        value: ARTICLE_STATUS.ALL,
        queryParams: {
            status: ARTICLE_STATUS.ALL,
        },
    },
    {
        title: ARTICLE_STATUS_LABEL.DRAFT,
        value: ARTICLE_STATUS.DRAFT,
        queryParams: {
            status: ARTICLE_STATUS.DRAFT,
            updateBy: user?.id ?? '',
        },
    },
];

export const ARTICLE_TYPE = Object.freeze({
    [ARTICLE_MODULE.NEWS_LXT]: ARTICLE_TYPE_LABEL.NEWS,
    [ARTICLE_MODULE.NEWS_ZJFW]: ARTICLE_TYPE_LABEL.NEWS,
    [ARTICLE_MODULE.POLICY_LXT]: ARTICLE_TYPE_LABEL.POLICY,
    [ARTICLE_MODULE.POLICY_ZJFW]: ARTICLE_TYPE_LABEL.POLICY,
});

export const ARTICLE_STATUS_TAG_MAP = {
    [ARTICLE_STATUS.PUBLISHED]: {
        status: 'success',
        label: ARTICLE_STATUS_TAG.PUBLISHED,
    },
    [ARTICLE_STATUS.OFFLINE]: {
        status: 'info',
        label: ARTICLE_STATUS_TAG.OFFLINE,
    },
    [ARTICLE_STATUS.DRAFT]: {
        status: 'warning',
        label: ARTICLE_STATUS_TAG.DRAFT,
    },
};
export const ARTICLE_STATUS_SELECT_OPTIONS = [
    {
        label: ARTICLE_STATUS_LABEL.ALL,
        value: ARTICLE_STATUS.ALL,
    },
    {
        label: ARTICLE_STATUS_LABEL.PUBLISHED,
        value: ARTICLE_STATUS.PUBLISHED,
    },
    {
        label: ARTICLE_STATUS_LABEL.OFFLINE,
        value: ARTICLE_STATUS.OFFLINE,
    },
    {
        label: ARTICLE_STATUS_LABEL.MY_PUBLISHED,
        value: ARTICLE_STATUS.MY_PUBLISHED,
    },
];

export const INIT_ARTICLE_SORT_LIST = [
    {
        sortType: SORT_TYPE.NONE,
        sortField: 'sort',
        label: ' 文章序号',
    },
    {
        sortType: SORT_TYPE.NONE,
        sortField: 'updateTime',
        label: ' 更新时间',
    },
    {
        sortType: SORT_TYPE.NONE,
        sortField: 'publishDate',
        label: ' 发布日期',
    },
];

// 表格列配置
export const TABLE_COLUMNS = [
    // 自定义索引
    {
        label: '缩略图',
        keyName: 'thumbnail',
        slotName: 'thumbnail',
        width: 100,
    },
    {
        keyName: 'title',
        label: '内容',
        slotName: 'content',
    },
];

// 新建表单
export const ARTICLE_FORM_MAP: { [key in ARTICLE_TYPE_LABEL]: DefItem[] } = {
    [ARTICLE_TYPE_LABEL.NEWS]: [
        {
            type: FormType.INPUT,
            label: '一级标题', // 字段
            keyName: 'title', // 字段名
            placeholder: '请填写一级标题', // 提示内容
            span: 8, // 参考el-col
            disabled: false, // 是否禁用
            rules: [
                {
                    required: true,
                    message: '一级标题不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '一级标题不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.INPUT,
            label: '二级标题', // 字段
            keyName: 'subTitle', // 字段名
            placeholder: '请填写二级标题', // 提示内容
            span: 8, // 参考el-col
            disabled: false, // 是否禁用
            rules: [
                {
                    max: 255,
                    message: '二级标题不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.UPLOAD,
            label: '新闻缩略图',
            keyName: 'thumbnail',
            disabled: false,
            span: 8, // 参考el-col
            style: { height: '63px' },
            uploadObj: {
                fileType: FILE_TYPE.IMAGE,
                limit: 1, // 上传长度限制
                hideUpload: false, // 是否隐藏上传框
                listType: 'picture',
                showFileList: true,
                tips: '只能上传jpg/jpeg/png文件，且不超过2MB',
            },
            rules: [
                {
                    required: true,
                    message: '新闻缩略图不能为空',
                },
            ],
        },
        {
            type: FormType.INPUT,
            label: '信息来源', // 字段
            keyName: 'origin', // 字段名
            placeholder: '请填写信息来源', // 提示内容
            span: 8, // 参考el-col
            disabled: false, // 是否禁用
            rules: [
                {
                    required: true,
                    message: '信息来源不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '信息来源不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.DATA_PICKER,
            label: '发布日期',
            keyName: 'publishDate',
            placeholder: '请选择',
            span: 8, // 参考el-col
            disabled: false,
            disabledDate(time) {
                return time.getTime() > Date.now();
            },
            rules: [
                {
                    required: true,
                    message: '发布日期不能为空',
                    trigger: 'blur',
                },
            ],
        },
        {
            type: FormType.RADIO,
            label: '热点新闻',
            keyName: 'hotNews',
            placeholder: '请选择',
            span: 8, // 参考el-col
            disabled: false,
            radioOptions: [
                { label: '是', value: 1 },
                { label: '否', value: 0 },
            ],
            rules: [
                {
                    required: true,
                    message: '热点新闻不能为空',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: FormType.TEXTAREA,
            label: '摘要', // 字段
            keyName: 'summary', // 字段名
            placeholder: '请填写摘要', // 提示内容
            span: 8, // 参考el-col
            disabled: false, // 是否禁用
            rules: [
                {
                    required: true,
                    message: '摘要不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '摘要不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.EDITOR,
            fileServer: FILE_SERVER.LXT, // 辽信通
            label: '文章内容',
            keyName: 'content',
            disabled: false,
            rules: [
                {
                    required: true,
                    message: '文章内容不能为空',
                    trigger: ['blur', 'change'],
                },
            ],
        },
    ],
    [ARTICLE_TYPE_LABEL.POLICY]: [
        {
            type: FormType.INPUT,
            label: '一级标题', // 字段
            keyName: 'title', // 字段名
            placeholder: '请填写一级标题', // 提示内容
            span: 8, // 参考el-col
            disabled: false, // 是否禁用
            rules: [
                {
                    required: true,
                    message: '一级标题不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '一级标题不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.INPUT,
            label: '二级标题', // 字段
            keyName: 'subTitle', // 字段名
            placeholder: '请填写二级标题', // 提示内容
            span: 8, // 参考el-col
            disabled: false, // 是否禁用
            rules: [
                {
                    max: 255,
                    message: '二级标题不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.UPLOAD,
            label: '新闻缩略图',
            keyName: 'thumbnail',
            disabled: false,
            span: 8, // 参考el-col
            style: { height: '63px' },
            uploadObj: {
                fileType: FILE_TYPE.IMAGE,
                limit: 1, // 上传长度限制
                hideUpload: false, // 是否隐藏上传框
                listType: 'picture',
                showFileList: true,
                tips: '只能上传jpg/jpeg/png文件，且不超过2MB',
            },
            rules: [
                {
                    required: true,
                    message: '新闻缩略图不能为空',
                },
            ],
        },
        {
            type: FormType.INPUT,
            label: '信息来源', // 字段
            keyName: 'origin', // 字段名
            placeholder: '请填写信息来源', // 提示内容
            span: 8, // 参考el-col
            disabled: false, // 是否禁用
            rules: [
                {
                    required: true,
                    message: '信息来源不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '信息来源不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.DATA_PICKER,
            label: '发布日期',
            keyName: 'publishDate',
            placeholder: '请选择',
            span: 8, // 参考el-col
            disabled: false,
            disabledDate(time) {
                return time.getTime() > Date.now();
            },
            rules: [
                {
                    required: true,
                    message: '发布日期不能为空',
                    trigger: 'blur',
                },
            ],
        },
        {
            type: FormType.RADIO,
            label: '热点新闻',
            keyName: 'hotNews',
            placeholder: '请选择',
            span: 8, // 参考el-col
            disabled: false,
            radioOptions: [
                { label: '是', value: 1 },
                { label: '否', value: 0 },
            ],
            rules: [
                {
                    required: true,
                    message: '热点新闻不能为空',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: FormType.TEXTAREA,
            label: '摘要', // 字段
            keyName: 'summary', // 字段名
            placeholder: '请填写摘要', // 提示内容
            span: 8, // 参考el-col
            disabled: false, // 是否禁用
            rules: [
                {
                    required: true,
                    message: '摘要不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '摘要不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.EDITOR,
            fileServer: FILE_SERVER.ZJFW, // 市综服
            label: '文章内容',
            keyName: 'content',
            disabled: false,
            rules: [
                {
                    required: true,
                    message: '文章内容不能为空',
                    trigger: ['blur', 'change'],
                },
            ],
        },
    ],
};
