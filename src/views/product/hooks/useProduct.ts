import { PlatformType, FormType } from '@/enums';
import type { DefItem } from '@/components/SjcForm/types';
import { validatorLogo, NOT_LOGO_TIPS, resolveArrayByKey } from '@/utils';
import { useApi } from '@/composables';
import { cloneDeep, isArray, isFunction } from 'lodash';
import { getTopOrgs, getProductFilters, getProduct, getOrgLogo } from '@/api';
import type { PlainOption, ProductFilterEntity, OrgEntity, ProductEntity } from '@/types';
import type { Ref } from 'vue';

export const useProductForm = (platform: Ref<PlatformType>, id?: Ref<string>) => {
    const { request: requestOrgOptions } = useApi(getTopOrgs, {
        cache: true,
        onSuccess({ data }) {
            topOrgList.value = data;
            topOrgOptions.value = data.map(({ orgId, orgName }) => ({ name: orgName, value: orgId }));
            PRODUCT_FORM.value[0].selectOptions = topOrgOptions.value;
        },
    });
    const { request: requestProductFilters, data: productFilters } = useApi(
        () => getProductFilters({ platform: platform.value }),
        {
            onSuccess(data) {
                dynamicForm.value = generateProductForm(data.data);
                updateForm(dynamicForm.value);
            },
        }
    );
    const { request: requestProduct } = useApi(() => getProduct({ id: id?.value ?? '', platform: platform.value }), {
        ready: productFilters,
        onSuccess(data) {
            console.log('data: ', data);
            const ignoreList = ['贷款额度', '贷款期限', '担保方式'];
            const filterList = resolveArrayByKey(data.filterList, 'typeValue', ignoreList);
            filterList.forEach((item: any) => {
                if (!item.origin) {
                    (data as any)[item.typeCode] = item.filterId;
                } else if (item.origin && item.origin.length) {
                    const prop = item.origin[0].typeCode || '';
                    const value = item.origin.map((_item: any) => _item.filterId) || [];
                    (data as any)[prop] = value;
                }
            });
            PRODUCT_FORM.value.forEach((formItem) => {
                if (
                    data[formItem.keyName as keyof ProductEntity] ||
                    (formItem.formatter && isFunction(formItem.formatter))
                ) {
                    if (formItem.formatter && isFunction(formItem.formatter)) {
                        formItem.defaultValue = formItem.formatter(data, formItem);
                    } else {
                        formItem.defaultValue = data[formItem.keyName as keyof ProductEntity];
                    }
                }
            });
        },
    });

    const { request: requestOrgLogo } = useApi(getOrgLogo, {});
    const topOrgOptions = ref<PlainOption[]>([]);
    const topOrgList = ref<OrgEntity[]>([]);
    // 新建表单
    const PRODUCT_FORM_MAP: { [key in PlatformType]: DefItem[] } = {
        [PlatformType.LiaoXinTong]: [
            {
                type: FormType.SELECT,
                label: '机构名称', // 字段
                keyName: 'orgId', // 字段名
                disabled: false, // 是否禁用
                selectOptions: topOrgOptions.value,
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
                            } else if (
                                formValues.referenceRateEnd &&
                                Number(formValues.referenceRateEnd) < Number(value)
                            ) {
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
                selectOptions: topOrgOptions.value,
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
                            } else if (
                                formValues.referenceRateEnd &&
                                Number(formValues.referenceRateEnd) < Number(value)
                            ) {
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

    const PRODUCT_FORM = ref<typeof PRODUCT_FORM_MAP[PlatformType]>(cloneDeep(PRODUCT_FORM_MAP[platform.value]));

    const dynamicForm = ref<DefItem[]>([]);
    const updateForm = (dynamicForm?: DefItem[]) => {
        if (isArray(dynamicForm)) {
            PRODUCT_FORM.value = [...PRODUCT_FORM.value, ...dynamicForm];
        }
    };

    const resetForm = () => {
        PRODUCT_FORM.value = cloneDeep(PRODUCT_FORM_MAP[platform.value]);
    };

    const multipleList = ['贷款额度', '贷款期限', '担保方式'];
    const isMultiple = (type: string) => {
        return !multipleList.includes(type);
    };

    const generateProductForm = (list: ProductFilterEntity[]): DefItem[] => {
        if (!Array.isArray(list) || list.length === 0) {
            return [];
        }
        return list
            .filter((item) => item.isFilterShow)
            .map((item) => {
                const options = item.filter
                    ?.filter((item) => item.isFilterShow)
                    .map((option) => {
                        let name;
                        switch (option.typeValue) {
                            case '贷款期限':
                                name = option.filterValue === '不限' ? option.filterValue : option.filterValue + '个月';
                                break;
                            case '贷款额度':
                                name = option.filterValue === '不限' ? option.filterValue : option.filterValue + '万元';
                                break;
                            default:
                                name = option.filterValue;
                                break;
                        }
                        return {
                            value: option.id,
                            name,
                        };
                    });

                return {
                    type: FormType.SELECT,
                    keyName: item.typeCode + '',
                    label: item.typeValue,
                    multiple: isMultiple(item.typeValue),
                    selectOptions: options,
                    placeholder: '请选择', // 提示内容
                    disabled: false, // 是否禁用
                    rules: [
                        {
                            required: true,
                            message: `${item.typeValue}不能为空`,
                            trigger: ['blur'],
                        },
                    ],
                };
            });
    };

    // 表单更改时操作
    const formValueChange = (formItem: DefItem, form?: DefItem[]) => {
        // eslint-disable-next-line no-undef
        const noLimitOption: PlainOption | Recordable =
            (formItem.selectOptions && formItem.selectOptions.find((option) => option.name === '不限')) || {};
        formItem.type === FormType.SELECT &&
            formItem.multiple &&
            formItem.selectOptions &&
            formItem.selectOptions.forEach((item) => {
                if (
                    ((formItem.value as string[]).includes(noLimitOption.value) && item.name === '不限') ||
                    (!(formItem.value as string[]).includes(noLimitOption.value) &&
                        (formItem.value as string[]).length > 0 &&
                        item.name !== '不限') ||
                    !(formItem.value as string[]).length
                ) {
                    item.disabled = false;
                } else {
                    item.disabled = true;
                }
            });

        // 机构名称变化时获取机构logo
        if (formItem.keyName === 'orgId') {
            // eslint-disable-next-line no-undef
            const orgLogoForm: Recordable = form?.find((item) => item.keyName === 'logoContent') ?? {};
            const { orgLogoId, orgId } =
                topOrgList.value.find((item) => {
                    return item.orgId === formItem.value;
                }) ?? {};
            if (!orgLogoId) {
                orgLogoForm.value = NOT_LOGO_TIPS;
            } else {
                requestOrgLogo({ orgId: orgId ?? '' }).then((data) => {
                    orgLogoForm.value = data?.[0]?.logoContent || NOT_LOGO_TIPS;
                });
            }
        }
    };

    watch(platform, () => {
        console.log('platform: ', platform);
        resetForm();
        requestProductFilters();
    });

    watch(() => id?.value, () => {
        id?.value && requestProduct();
        console.log('id?.value: ', id?.value);
    });

    onBeforeMount(() => {
        requestProductFilters();
        requestOrgOptions();
        id?.value && requestProduct();
    });
    return { PRODUCT_FORM, formValueChange, dynamicForm };
};
