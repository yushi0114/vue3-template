import { validatorLogo } from '@/utils';
import { PlatformType, FormType } from '@/enums';
import type { DefItem } from '@/components/SjcForm/types';

// 产品表单
export const PRODUCT_FORM_MAP: { [key in PlatformType]: DefItem[] } = {
    [PlatformType.LiaoXinTong]: [
        {
            type: FormType.SELECT,
            label: '机构名称', // 字段
            keyName: 'orgId', // 字段名
            disabled: false, // 是否禁用
            selectOptions: [],
            rules: [
                {
                    required: true,
                    message: '机构名称不能为空',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: FormType.IMAGE,
            label: '机构LOGO', // 字段
            keyName: 'logoContent', // 字段名
            disabled: false, // 是否禁用
            placeholder: '请选择机构',
            isIgnoreKey: true,
            rules: [
                {
                    validator: validatorLogo,
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: FormType.INPUT,
            label: '产品名称', // 字段
            keyName: 'name', // 字段名
            placeholder: '请填写产品名称', // 提示内容
            maxlength: 32,
            disabled: false, // 是否禁用
            rules: [
                {
                    required: true,
                    message: '产品名称不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 32,
                    message: '产品名称不能超过32个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXTAREA,
            label: '产品简介', // 字段
            keyName: 'description', // 字段名
            placeholder: '请填写产品简介', // 提示内容
            disabled: false, // 是否禁用
            autosize: { minRows: 2 },
            rules: [
                {
                    required: true,
                    message: '产品简介不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '产品简介不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXTAREA,
            label: '产品特点', // 字段
            keyName: 'feature', // 字段名
            placeholder: '请填写产品特点', // 提示内容
            disabled: false, // 是否禁用
            autosize: { minRows: 2 },
            rules: [
                {
                    required: true,
                    message: '产品特点不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '产品特点不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXTAREA,
            label: '适用客户', // 字段
            keyName: 'customer', // 字段名
            placeholder: '请填写适用客户', // 提示内容
            disabled: false, // 是否禁用
            autosize: { minRows: 2 },
            rules: [
                {
                    required: true,
                    message: '适用客户不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '适用客户不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXTAREA,
            label: '还款方式', // 字段
            keyName: 'repayment', // 字段名
            placeholder: '请填写还款方式', // 提示内容
            disabled: false, // 是否禁用
            autosize: { minRows: 2 },
            rules: [
                {
                    required: true,
                    message: '还款方式不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '还款方式不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXTAREA,
            label: '申请条件', // 字段
            keyName: 'applicationConditions', // 字段名
            placeholder: '请填写申请条件', // 提示内容
            disabled: false, // 是否禁用
            autosize: { minRows: 2 },
            rules: [
                {
                    required: true,
                    message: '申请条件不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '申请条件不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXTAREA,
            label: '所需资料', // 字段
            keyName: 'requiredMaterials', // 字段名
            placeholder: '请填写所需资料', // 提示内容
            disabled: false, // 是否禁用
            autosize: { minRows: 2 },
            rules: [
                {
                    required: true,
                    message: '所需资料不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '所需资料不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXTAREA,
            label: '咨询电话', // 字段
            keyName: 'supportTel', // 字段名
            maxlength: 255,
            placeholder: '请填写咨询电话', // 提示内容
            disabled: false, // 是否禁用
            autosize: { minRows: 2 },
            rules: [
                {
                    required: true,
                    message: '咨询电话不能为空',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.INPUT,
            label: '参考利率范围', // 字段
            span: 8,
            keyName: 'referenceRateStart', // 字段名
            placeholder: '请填写参考利率范围起始值', // 提示内容
            disabled: false, // 是否禁用
            // maxlength: 4,
            showWordLimit: false,
            formatter(data) {
                const referenceRateArr = (data as any).referenceRate.split('-');
                return referenceRateArr[0].slice(0, referenceRateArr[0].length - 1);
            },
            rules: (formValues: any) => [
                {
                    required: true,
                    message: '请填写参考利率范围起始值',
                    trigger: ['blur', 'change'],
                },
                {
                    validator: (rule, value, callback) => {
                        if (Number(value) <= 0) {
                            callback(new Error('请输入0-100间的小数或整数，且不可为0'));
                        } else if (Number(value) >= 100) {
                            callback(new Error('请输入0-100间的小数或整数，且不可为100'));
                        } else if (!/^([0-9]{1,2}$)|(^[0-9]{1,2}\.[0-9]{1,2}$)|100$/.test(value)) {
                            // } else if (!/^[+-]?((\d*(\.\d{1,})$)|(\d+$))/.test(value)) {
                            callback(new Error('请输入0-100间的小数或整数，且最多保留两位小数'));
                        } else if (formValues.referenceRateEnd && Number(formValues.referenceRateEnd) < Number(value)) {
                            callback(new Error('参考利率范围开始值必须小于等于结束值'));
                        } else {
                            callback();
                        }
                    },
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: FormType.UNIT,
            labelWidth: '3px',
            span: 0.5,
            keyName: 'unit', // 字段名
            defaultValue: '%',
            isIgnoreKey: true,
        },
        {
            type: FormType.TEXT,
            label: '', // 字段
            labelWidth: '20px',
            keyName: 'space1',
            span: 0.5,
            defaultValue: '-',
            isIgnoreKey: true,
        },
        {
            type: FormType.INPUT,
            label: '', // 字段
            span: 6,
            keyName: 'referenceRateEnd', // 字段名
            labelWidth: '20px',
            placeholder: '请填写参考利率范围结束值', // 提示内容
            disabled: false, // 是否禁用
            showWordLimit: false,
            formatter(data) {
                const referenceRateArr = (data as any).referenceRate.split('-');
                if (referenceRateArr.length === 1) {
                    return referenceRateArr[0].slice(0, referenceRateArr[0].length - 1);
                }
                return referenceRateArr[1].slice(0, referenceRateArr[0].length - 1);
            },
            // maxlength: 4,
            rules: (formData) => [
                {
                    required: true,
                    message: '请填写参考利率范围结束值',
                    trigger: ['blur', 'change'],
                },
                {
                    validator: (rule, value, callback) => {
                        if (Number(value) <= 0) {
                            callback(new Error('请输入0-100间的小数或整数，且不可为0'));
                        } else if (Number(value) >= 100) {
                            callback(new Error('请输入0-100间的小数或整数，且不可为100'));
                            // } else if (!/^[+-]?((\d*(\.\d{1,})$)|(\d+$))/.test(value)) {
                        } else if (!/^([0-9]{1,2}$)|(^[0-9]{1,2}\.[0-9]{1,2}$)|100$/.test(value)) {
                            callback(new Error('请输入0-100间的小数或整数，且最多保留两位小数'));
                        } else if (Number(formData.referenceRateStart) > Number(value)) {
                            callback(new Error('参考利率范围结束值必须大于等于开始值'));
                        } else {
                            callback();
                        }
                    },
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.UNIT,
            labelWidth: '3px',
            span: 0.5,
            keyName: 'unit', // 字段名
            defaultValue: '%',
            isIgnoreKey: true,
        },
        {
            type: FormType.SWITCH,
            label: '产品状态', // 字段
            keyName: 'status', // 字段名
            span: 24,
            placeholder: '', // 提示内容
            disabled: false, // 是否禁用
            activeValue: 1,
            inactiveValue: 0,
            rules: [
                {
                    required: true,
                    message: '产品状态不能为空',
                    trigger: ['blur', 'change'],
                },
            ],
        },
    ],
    [PlatformType.ShiZongFu]: [
        {
            type: FormType.SELECT,
            label: '机构名称', // 字段
            keyName: 'orgId', // 字段名
            disabled: false, // 是否禁用
            selectOptions: [],
            rules: [
                {
                    required: true,
                    message: '机构名称不能为空',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: FormType.IMAGE,
            label: '机构LOGO', // 字段
            keyName: 'logoContent', // 字段名
            placeholder: '请选择机构',
            disabled: false, // 是否禁用
            isIgnoreKey: true,
            rules: [
                {
                    validator: validatorLogo,
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: FormType.INPUT,
            label: '产品名称', // 字段
            keyName: 'name', // 字段名
            placeholder: '请填写产品名称', // 提示内容
            maxlength: 32,
            disabled: false, // 是否禁用
            rules: [
                {
                    required: true,
                    message: '产品名称不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 32,
                    message: '产品名称不能超过32个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXTAREA,
            label: '产品简介', // 字段
            keyName: 'description', // 字段名
            placeholder: '请填写产品简介', // 提示内容
            disabled: false, // 是否禁用
            autosize: { minRows: 2 },
            rules: [
                {
                    required: true,
                    message: '产品简介不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '产品简介不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXTAREA,
            label: '产品特点', // 字段
            keyName: 'feature', // 字段名
            placeholder: '请填写产品特点', // 提示内容
            disabled: false, // 是否禁用
            autosize: { minRows: 2 },
            rules: [
                {
                    required: true,
                    message: '产品特点不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '产品特点不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXTAREA,
            label: '适用客户', // 字段
            keyName: 'customer', // 字段名
            placeholder: '请填写适用客户', // 提示内容
            disabled: false, // 是否禁用
            autosize: { minRows: 2 },
            rules: [
                {
                    required: true,
                    message: '适用客户不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '适用客户不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXTAREA,
            label: '还款方式', // 字段
            keyName: 'repayment', // 字段名
            placeholder: '请填写还款方式', // 提示内容
            disabled: false, // 是否禁用
            autosize: { minRows: 2 },
            rules: [
                {
                    required: true,
                    message: '还款方式不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '还款方式不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXTAREA,
            label: '申请条件', // 字段
            keyName: 'applicationConditions', // 字段名
            placeholder: '请填写申请条件', // 提示内容
            disabled: false, // 是否禁用
            autosize: { minRows: 2 },
            rules: [
                {
                    required: true,
                    message: '申请条件不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '申请条件不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXTAREA,
            label: '提交材料', // 字段
            keyName: 'requiredMaterials', // 字段名
            placeholder: '请填写提交材料', // 提示内容
            disabled: false, // 是否禁用
            autosize: { minRows: 2 },
            rules: [
                {
                    required: true,
                    message: '提交材料不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '提交材料不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXTAREA,
            label: '咨询电话', // 字段
            keyName: 'supportTel', // 字段名
            maxlength: 255,
            placeholder: '请填写咨询电话', // 提示内容
            disabled: false, // 是否禁用
            autosize: { minRows: 2 },
            rules: [
                {
                    required: true,
                    message: '咨询电话不能为空',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.INPUT,
            label: '参考利率范围', // 字段
            span: 8,
            keyName: 'referenceRateStart', // 字段名
            placeholder: '请填写参考利率范围起始值', // 提示内容
            disabled: false, // 是否禁用
            // maxlength: 4,
            showWordLimit: false,
            formatter(data) {
                const referenceRateArr = (data as any).referenceRate.split('-');
                return referenceRateArr[0].slice(0, referenceRateArr[0].length - 1);
            },
            rules: (formValues: any) => [
                {
                    required: true,
                    message: '请填写参考利率范围起始值',
                    trigger: ['blur', 'change'],
                },
                {
                    validator: (rule, value, callback) => {
                        if (Number(value) <= 0) {
                            callback(new Error('请输入0-100间的小数或整数，且不可为0'));
                        } else if (Number(value) >= 100) {
                            callback(new Error('请输入0-100间的小数或整数，且不可为100'));
                        } else if (!/^([0-9]{1,2}$)|(^[0-9]{1,2}\.[0-9]{1,2}$)|100$/.test(value)) {
                            // } else if (!/^[+-]?((\d*(\.\d{1,})$)|(\d+$))/.test(value)) {
                            callback(new Error('请输入0-100间的小数或整数，且最多保留两位小数'));
                        } else if (formValues.referenceRateEnd && Number(formValues.referenceRateEnd) < Number(value)) {
                            callback(new Error('参考利率范围开始值必须小于等于结束值'));
                        } else {
                            callback();
                        }
                    },
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: FormType.UNIT,
            labelWidth: '3px',
            span: 0.5,
            keyName: 'unit', // 字段名
            defaultValue: '%',
            isIgnoreKey: true,
        },
        {
            type: FormType.TEXT,
            label: '', // 字段
            labelWidth: '20px',
            keyName: 'space1',
            span: 0.5,
            defaultValue: '-',
            isIgnoreKey: true,
        },
        {
            type: FormType.INPUT,
            label: '', // 字段
            span: 6,
            keyName: 'referenceRateEnd', // 字段名
            labelWidth: '20px',
            placeholder: '请填写参考利率范围结束值', // 提示内容
            disabled: false, // 是否禁用
            showWordLimit: false,
            formatter(data) {
                const referenceRateArr = (data as any).referenceRate.split('-');
                if (referenceRateArr.length === 1) {
                    return referenceRateArr[0].slice(0, referenceRateArr[0].length - 1);
                }
                return referenceRateArr[1].slice(0, referenceRateArr[0].length - 1);
            },
            // maxlength: 4,
            rules: (formData) => [
                {
                    required: true,
                    message: '请填写参考利率范围结束值',
                    trigger: ['blur', 'change'],
                },
                {
                    validator: (rule, value, callback) => {
                        if (Number(value) <= 0) {
                            callback(new Error('请输入0-100间的小数或整数，且不可为0'));
                        } else if (Number(value) >= 100) {
                            callback(new Error('请输入0-100间的小数或整数，且不可为100'));
                            // } else if (!/^[+-]?((\d*(\.\d{1,})$)|(\d+$))/.test(value)) {
                        } else if (!/^([0-9]{1,2}$)|(^[0-9]{1,2}\.[0-9]{1,2}$)|100$/.test(value)) {
                            callback(new Error('请输入0-100间的小数或整数，且最多保留两位小数'));
                        } else if (Number(formData.referenceRateStart) > Number(value)) {
                            callback(new Error('参考利率范围结束值必须大于等于开始值'));
                        } else {
                            callback();
                        }
                    },
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.UNIT,
            label: '%',
            labelWidth: '3px',
            span: 0.5,
            keyName: 'unit', // 字段名
            isIgnoreKey: true,
        },
        {
            type: FormType.SWITCH,
            label: '产品状态', // 字段
            keyName: 'status', // 字段名
            span: 24,
            placeholder: '', // 提示内容
            disabled: false, // 是否禁用
            activeValue: 1,
            inactiveValue: 0,
            rules: [
                {
                    required: true,
                    message: '产品状态不能为空',
                    trigger: ['blur', 'change'],
                },
            ],
        },
    ],
};

// 筛选项大类别表单
export const FILTERS_FORM_MAP: { [key in PlatformType]: DefItem[] } = {
    [PlatformType.LiaoXinTong]: [
        {
            type: FormType.INPUT,
            label: '类别名称', // 字段
            keyName: 'typeValue', // 字段名
            placeholder: '请填写类别名称', // 提示内容
            disabled: false, // 是否禁用
            rules: [
                {
                    required: true,
                    message: '类别名称不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '类别名称不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.SWITCH,
            label: '状态', // 字段
            keyName: 'isFilterShow', // 字段名
            placeholder: '', // 提示内容
            disabled: false, // 是否禁用
            activeValue: 1,
            inactiveValue: 0,
            rules: [
                {
                    required: true,
                    message: '状态不能为空',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
    ],
    [PlatformType.ShiZongFu]: [
        {
            type: FormType.INPUT,
            label: '类别名称', // 字段
            keyName: 'typeValue', // 字段名
            placeholder: '请填写类别名称', // 提示内容
            disabled: false, // 是否禁用
            rules: [
                {
                    required: true,
                    message: '类别名称不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '类别名称不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.SWITCH,
            label: '状态', // 字段
            keyName: 'isFilterShow', // 字段名
            placeholder: '', // 提示内容
            disabled: false, // 是否禁用
            activeValue: 1,
            inactiveValue: 0,
            rules: [
                {
                    required: true,
                    message: '状态不能为空',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
    ],
};

// 筛选项小项表单
export const FILTERS_OPTIONS_FORM_MAP: { [key in PlatformType]: DefItem[] } = {
    [PlatformType.LiaoXinTong]: [
        {
            type: FormType.INPUT,
            label: '筛选项名称', // 字段
            keyName: 'filterValue', // 字段名
            placeholder: '请填写筛选项名称', // 提示内容
            disabled: false, // 是否禁用
            rules: [
                {
                    required: true,
                    message: '筛选项名称不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '筛选项名称不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.INPUT,
            label: '筛选项名称', // 字段
            keyName: 'filterValueStart', // 字段名
            placeholder: '请填写筛选项开始值', // 提示内容
            span: 12,
            maxlength: 6,
            disabled: false, // 是否禁用
            rules: (formValues: any) => [
                {
                    required: true,
                    message: '筛选项开始值不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 6,
                    message: '筛选项开始值不能超过6个字符',
                    trigger: ['blur', 'change'],
                },
                {
                    validator: (rule, value, callback) => {
                        if (!/^\d{1,6}$/.test(value)) {
                            callback(new Error('请输入1-6位数字'));
                        } else if (formValues.filterValueEnd && Number(formValues.filterValueEnd) <= Number(value)) {
                            callback(new Error('筛选项结束值必须大于开始值'));
                        } else {
                            callback();
                        }
                    },
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXT,
            keyName: 'constText',
            label: '', // 字段
            span: 1,
            labelWidth: '15px',
            isIgnoreKey: true,
            defaultValue: '-',
        },
        {
            type: FormType.INPUT,
            label: '', // 字段
            keyName: 'filterValueEnd', // 字段名
            placeholder: '请填写筛选项结束值', // 提示内容
            span: 8,
            maxlength: 6,
            disabled: false, // 是否禁用
            labelWidth: '10px',
            rules: (formValues: any) => [
                {
                    required: true,
                    message: '筛选项结束值不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 6,
                    message: '筛选项结束值不能超过6个字符',
                    trigger: ['blur', 'change'],
                },
                {
                    validator: (rule, value, callback) => {
                        if (!/^\d{1,6}$/.test(value)) {
                            callback(new Error('请输入1-6位数字'));
                        } else if (Number(formValues.filterValueStart) >= Number(value)) {
                            callback(new Error('筛选项结束值必须大于开始值'));
                        } else {
                            callback();
                        }
                    },
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.UNIT,
            keyName: 'unit',
            label: '', // 字段
            span: 2,
            labelWidth: '5px',
            isIgnoreKey: true,
            defaultValue: '个月',
        },
        {
            type: FormType.SWITCH,
            label: '状态', // 字段
            keyName: 'isFilterShow', // 字段名
            placeholder: '', // 提示内容
            disabled: false, // 是否禁用
            activeValue: 1,
            inactiveValue: 0,
            rules: [
                {
                    required: true,
                    message: '状态不能为空',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
    ],
    [PlatformType.ShiZongFu]: [
        {
            type: FormType.INPUT,
            label: '筛选项名称', // 字段
            keyName: 'filterValue', // 字段名
            placeholder: '请填写筛选项名称', // 提示内容
            disabled: false, // 是否禁用
            rules: [
                {
                    required: true,
                    message: '筛选项名称不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 255,
                    message: '筛选项名称不能超过255个字符',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.INPUT,
            label: '筛选项名称', // 字段
            keyName: 'filterValueStart', // 字段名
            placeholder: '请填写筛选项开始值', // 提示内容
            span: 12,
            maxlength: 6,
            disabled: false, // 是否禁用
            rules: (formValues: any) => [
                {
                    required: true,
                    message: '筛选项开始值不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 6,
                    message: '筛选项开始值不能超过6个字符',
                    trigger: ['blur', 'change'],
                },
                {
                    validator: (rule, value, callback) => {
                        if (!/^\d{1,6}$/.test(value)) {
                            callback(new Error('请输入1-6位数字'));
                        } else if (formValues.filterValueEnd && Number(formValues.filterValueEnd) <= Number(value)) {
                            callback(new Error('筛选项结束值必须大于开始值'));
                        } else {
                            callback();
                        }
                    },
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.TEXT,
            keyName: 'constText',
            label: '', // 字段
            span: 1,
            labelWidth: '20px',
            isIgnoreKey: true,
            defaultValue: '-',
        },
        {
            type: FormType.INPUT,
            label: '', // 字段
            keyName: 'filterValueEnd', // 字段名
            placeholder: '请填写筛选项结束值', // 提示内容
            span: 8,
            maxlength: 6,
            disabled: false, // 是否禁用
            labelWidth: '10px',
            rules: (formValues: any) => [
                {
                    required: true,
                    message: '筛选项结束值不能为空',
                    trigger: ['blur', 'change'],
                },
                {
                    max: 6,
                    message: '筛选项结束值不能超过6个字符',
                    trigger: ['blur', 'change'],
                },
                {
                    validator: (rule, value, callback) => {
                        if (!/^\d{1,6}$/.test(value)) {
                            callback(new Error('请输入1-6位数字'));
                        } else if (Number(formValues.filterValueStart) >= Number(value)) {
                            callback(new Error('筛选项结束值必须大于开始值'));
                        } else {
                            callback();
                        }
                    },
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
        {
            type: FormType.UNIT,
            keyName: 'unit',
            label: '', // 字段
            span: 2,
            labelWidth: '5px',
            isIgnoreKey: true,
            defaultValue: '个月',
        },
        {
            type: FormType.SWITCH,
            label: '状态', // 字段
            keyName: 'isFilterShow', // 字段名
            placeholder: '', // 提示内容
            disabled: false, // 是否禁用
            activeValue: 1,
            inactiveValue: 0,
            rules: [
                {
                    required: true,
                    message: '状态不能为空',
                    trigger: ['blur', 'change'],
                },
            ], // 验证
        },
    ],
};

// 无法更改的筛选项类别
export const CANT_CHANGE_FILTER_MAP: { [key in PlatformType]: string[] } = {
    [PlatformType.LiaoXinTong]: ['贷款额度', '贷款期限', '融资额度', '融资期限', '担保方式', '企业分类', '企业资产'],
    [PlatformType.ShiZongFu]: ['融资额度', '融资期限', '担保方式', '企业分类', '企业资产'],
};

// 筛选项单位
export const FILTER_UNIT_MAP = Object.freeze({
    '贷款额度': '万元',
    '融资额度': '万元',
    '贷款期限': '个月',
    '融资期限': '个月',
});
