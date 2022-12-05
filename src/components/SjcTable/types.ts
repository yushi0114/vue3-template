/*
 * @Description:Table
 * @FilePath: \dms-web\src\components\SjcTable\types.ts
 * @Author: zys
 * @Date: 2022-11-03 14:59:33
 * @LastEditTime: 2022-11-30 10:08:45
 * @LastEditors: zys
 * @Reference:
 */
import type { TableProps, PaginationProps } from 'element-plus';
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';

// eslint-disable-next-line no-undef
export type ITableData<T = Recordable> = T[];
// eslint-disable-next-line no-undef
export interface ITableConfig<DataType = Recordable> extends Partial<TableProps<DataType>> {
    rowKey?: string | ((row: DataType) => string);
    showSelection?: boolean;
    showSelectionOpt?: boolean;
    showIndexColumn?: boolean;
    indexLabel?: string;
    isCheckMemory?: boolean;
    showHandler?: boolean;
    showExpand?: boolean;
    showAppend?: boolean;
    appendLabel?: string;
    handlerConfig?: IColumn;
}

export type ITableColumnCtx<T> = Partial<
    Omit<TableColumnCtx<T>, 'children'> & {
        slotName?: string;
        children?: ITableColumnCtx<T>[];
    }
>;
// eslint-disable-next-line no-undef
export type IColumn<ColumnTypes = Recordable> = Omit<ITableColumnCtx<ColumnTypes>, 'children'> & {
    slotName?: string;
    children?: IColumn<ColumnTypes>[];
};

export type IPaginationConfig = PaginationProps;
