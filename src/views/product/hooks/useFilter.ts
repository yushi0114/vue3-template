/*
 * @Description:
 * @FilePath: \dms-web\src\views\product\hooks\useFilter.ts
 * @Author: zys
 * @Date: 2022-12-02 11:22:14
 * @LastEditTime: 2023-02-10 16:40:51
 * @LastEditors: zys
 * @Reference:
 */

import type { PlatformType } from '@/enums';
import { useApi } from '@/composables';
import { cloneDeep } from 'lodash';
import {
    getProductFilters,
    updateProductFilter,
    addProductFilter,
    addProductFilterOptions,
    deleteProductFilter,
    updateProductFilterSort,
    type UpdateProductFilterSortPayload,
    type AddProductFilterOptionsPayload,
    type UpdateProductFilterPayload,
    type AddProductFilterPayload,
    type DeleteProductFilterPayload,
} from '@/api';
import type { ProductFilterEntity } from '@/types';
import type { Ref } from 'vue';
import { FILTERS_FORM_MAP, FILTERS_OPTIONS_FORM_MAP } from '../constants';

export const useFilter = (platform: Ref<PlatformType>) => {
    const { request: requestProductFilters, loading } = useApi(
        // eslint-disable-next-line no-undef
        (params: Recordable = {}) => getProductFilters({ platform: platform.value, ...params }),
        {
            onSuccess(data) {
                filters.value = data.data;
            },
        }
    );

    const { request: requestAddProductFilter, loading: loadingAddFilter } = useApi(
        // eslint-disable-next-line no-undef
        (params: AddProductFilterPayload) => addProductFilter({ platform: platform.value, ...params }),
        {
            onSuccess() {
                ElMessage({
                    type: 'success',
                    message: '操作成功',
                });
                requestProductFilters();
                return Promise.resolve();
            },
        }
    );

    const { request: requestAddProductFilterOptions, loading: loadingAddFilterOpt } = useApi(
        // eslint-disable-next-line no-undef
        (params: AddProductFilterOptionsPayload) => addProductFilterOptions({ platform: platform.value, ...params }),
        {
            onSuccess() {
                ElMessage({
                    type: 'success',
                    message: '操作成功',
                });
                requestProductFilters();
                return Promise.resolve();
            },
        }
    );

    const { request: requestUpdateProductFilter, loading: loadingEditFilter } = useApi(
        // eslint-disable-next-line no-undef
        (params: UpdateProductFilterPayload) => updateProductFilter({ platform: platform.value, ...params }),
        {
            onSuccess() {
                ElMessage({
                    type: 'success',
                    message: '操作成功',
                });
                requestProductFilters();
                return Promise.resolve();
            },
        }
    );

    const { request: requestDeleteProductFilter } = useApi(
        (params: DeleteProductFilterPayload) => deleteProductFilter({ platform: platform.value, ...params }),
        {
            onSuccess() {
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                });
                requestProductFilters();
            },
        }
    );

    const { request: requestUpdateProductFilterSort } = useApi(
        (params: UpdateProductFilterSortPayload) => updateProductFilterSort({ platform: platform.value, ...params }),
        {
            onSuccess() {
                ElMessage({
                    type: 'success',
                    message: '操作成功',
                });
                requestProductFilters();
                return Promise.resolve();
            },
            onError() {
                requestProductFilters();
            },
        }
    );

    const FILTERS_FORM = ref<typeof FILTERS_FORM_MAP[PlatformType]>(cloneDeep(FILTERS_FORM_MAP[platform.value]));
    const FILTERS_OPTIONS_FORM = ref<typeof FILTERS_OPTIONS_FORM_MAP[PlatformType]>(
        cloneDeep(FILTERS_OPTIONS_FORM_MAP[platform.value])
    );
    const filters = ref<ProductFilterEntity[]>([]);

    const loadingFilter = computed(() => {
        return loadingAddFilter.value || loadingEditFilter.value;
    });
    const loadingFilterOptions = computed(() => {
        return loadingAddFilterOpt.value || loadingEditFilter.value;
    });
    const resetForm = () => {
        FILTERS_FORM.value = cloneDeep(FILTERS_FORM_MAP[platform.value]);
    };

    watch(
        platform,
        () => {
            requestProductFilters();
            resetForm();
        },
        { immediate: true }
    );
    return {
        loading,
        loadingFilter,
        loadingFilterOptions,
        requestProductFilters,
        requestAddProductFilter,
        requestUpdateProductFilter,
        requestDeleteProductFilter,
        requestAddProductFilterOptions,
        requestUpdateProductFilterSort,
        filters,
        FILTERS_FORM,
        FILTERS_OPTIONS_FORM,
    };
};
