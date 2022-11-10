/*
 * @Description:
 * @FilePath: \dms-web\src\components\SjcTable\constants.ts
 * @Author: zys
 * @Date: 2022-11-04 09:12:54
 * @LastEditTime: 2022-11-09 14:28:25
 * @LastEditors: zys
 * @Reference:
 */
import type { IPaginationConfig } from './types';

export const INIT_PAGINATION_CONFIG: Partial<IPaginationConfig> = {
    total: 0,
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 50],
    layout: 'total, sizes, prev, pager, next, jumper',
};

export const INIT_TABLE_CONFIG = {
    rowKey: 'id', //   行数据的 Key，用来优化 Table 的渲染
    showSelection: false, // 是否多选
    showIndexColumn: false, // 是否显示自定义索引
    indexLabel: '序号', // 自定义索引名
    isCheckMemory: false, // 是否需要跨页勾选
    showHandler: false, // 是否需要显示操作栏
    showExpand: false, // 是否是展开行
    showAppend: false, // 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上
    appendLabel: '自定义', // 自定义默认内容
};
