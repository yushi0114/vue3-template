import { PlatformType, FormType } from '@/enums';
import type { DefItem } from '@/components/SjcForm/types';
import { NOT_LOGO_TIPS, resolveArrayByKey } from '@/utils';
import { useApi } from '@/composables';
import { cloneDeep, isFunction, isArray } from 'lodash';
import { getTopOrgs, getProductFilters, getProduct, getOrgLogo } from '@/api';
import type { PlainOption, ProductFilterEntity, OrgEntity, ProductEntity } from '@/types';
import type { Ref } from 'vue';
import { PRODUCT_FORM_MAP } from '../constants';

export const useProductForm = (platform: Ref<PlatformType>, id?: Ref<string>) => {
    const { request: requestOrgOptions } = useApi(getTopOrgs, {
        cache: true,
        onSuccess({ data }) {
            topOrgList.value = data;
            topOrgOptions.value = data.map(({ orgId, orgName }) => ({ name: orgName, value: orgId }));
            PRODUCT_FORM.value[0].selectOptions = topOrgOptions.value;
            PRODUCT_FORM_ALL.value[0].selectOptions = topOrgOptions.value;
        },
    });
    const { request: requestProductFilters } = useApi(
        () => getProductFilters({ platform: platform.value }),
        {
            onSuccess(data) {
                dynamicForm.value = generateProductForm(data.data);
                updateForm(dynamicForm.value);
            },
        }
    );
    const { request: requestProduct } = useApi(() => getProduct({ id: id?.value ?? '', platform: platform.value }), {
        onSuccess(data) {
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
            PRODUCT_FORM_ALL.value.forEach((formItem) => {
                if (
                    data[formItem.keyName as keyof ProductEntity] || data[formItem.keyName as keyof ProductEntity] === 0 ||
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
    const PRODUCT_FORM = ref<typeof PRODUCT_FORM_MAP[PlatformType]>(cloneDeep(PRODUCT_FORM_MAP[platform.value]));
    const dynamicForm = ref<DefItem[]>([]);
    const PRODUCT_FORM_ALL = ref(PRODUCT_FORM.value);
    const updateForm = (dynamicForm?: DefItem[]) => {
        if (isArray(dynamicForm)) {
            PRODUCT_FORM_ALL.value = [...PRODUCT_FORM.value, ...dynamicForm];
        }
    };

    const resetForm = () => {
        PRODUCT_FORM.value = cloneDeep(PRODUCT_FORM_MAP[platform.value]);
        PRODUCT_FORM_ALL.value = PRODUCT_FORM.value;
        PRODUCT_FORM.value[0].selectOptions = topOrgOptions.value;
        PRODUCT_FORM_ALL.value[0].selectOptions = topOrgOptions.value;
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
        resetForm();
        requestProductFilters();
    });

    watch(
        () => id?.value,
        () => {
            id?.value && requestProduct();
        },
        { immediate: true }
    );

    onBeforeMount(() => {
        requestProductFilters();
        requestOrgOptions();
    });
    return { PRODUCT_FORM, formValueChange, dynamicForm, PRODUCT_FORM_ALL };
};
