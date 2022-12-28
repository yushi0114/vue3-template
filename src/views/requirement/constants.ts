/*
 * @Description:
 * @FilePath: \dms-web\src\views\requirement\constants.ts
 * @Author: zys
 * @Date: 2022-11-30 09:29:36
 * @LastEditTime: 2022-12-27 16:48:39
 * @LastEditors: zys
 * @Reference:
 */
import type { ITableConfig } from '@/components/SjcTable/types';
// 表格列配置
export const TABLE_COLUMNS = [
    // 自定义索引
    {
        label: '',
        prop: 'reqLogo',
        slotName: 'reqLogo',
        width: 90,
    },
];

// 表格配置项
export const TABLE_CONFIG: ITableConfig = reactive({
    showHandler: true,
    showAppend: true,
    showSelection: true,
    appendLabel: '',
    handlerConfig: {
        width: 120,
        label: '',
    },
});

export const PAGE_CONFIG = reactive({
    pageIndex: 1,
    pageSize: 10,
    total: 0,
});
