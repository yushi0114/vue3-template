/*
 * @Description:
 * @FilePath: \dms-web\src\views\finance\code\constants.ts
 * @Author: zys
 * @Date: 2022-12-28 10:12:06
 * @LastEditTime: 2022-12-28 11:28:06
 * @LastEditors: zys
 * @Reference:
 */
import type { ITableConfig } from '@/components/SjcTable/types';
import type { FinanceCodeListItemType } from '@/types/finance';
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import { cityCodeList, orgTypeCodeList } from './components/code-list';

// 表格列配置
export const CODE_TABLE_COLUMNS = computed<any[]>(() => ([
    {
        label: '机构名称',
        prop: 'orgName',
        slotName: 'orgName',
    },
    {
        label: '机构编码',
        prop: 'orgCode',
    },
    {
        label: '机构分类',
        prop: 'orgTypeName',
        columnKey: 'orgTypeCodeArr',
        filters: orgTypeCodeList.value,
        filterMethod: (
            value: string,
            row: FinanceCodeListItemType,
            column: TableColumnCtx<FinanceCodeListItemType>
        ) => {
            return row[column.property as keyof FinanceCodeListItemType] === value;
        },
    },
    {
        label: '所属城市',
        prop: 'cityName',
        columnKey: 'cityCodeArr',
        filters: cityCodeList.value,
        filterMethod: (
            value: string,
            row: FinanceCodeListItemType,
            column: TableColumnCtx<FinanceCodeListItemType>
        ) => {
            return row[column.property as keyof FinanceCodeListItemType] === value;
        },
    },
    {
        label: '创建者',
        prop: 'createBy',
    },
    {
        label: '创建时间',
        prop: 'createTime',
        sortable: true,
    },
    {
        label: '更新时间',
        prop: 'updateTime',
        sortable: true,
    },
]));

// 表格配置项
export const CODE_TABLE_CONFIG: ITableConfig = reactive({
    showHandler: true,
    appendLabel: '',
    handlerConfig: {
        width: 120,
        label: '操作',
    },
});
