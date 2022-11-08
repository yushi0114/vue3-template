/*
 * @Description:
 * @FilePath: \dms-web\src\views\example-table\hooks\useTable.ts
 * @Author: zys
 * @Date: 2022-11-04 14:45:20
 * @LastEditTime: 2022-11-08 15:28:31
 * @LastEditors: zys
 * @Reference:
 */
import type { IColumnTypes } from '../constants';
import type { Ref } from 'vue';

export const useTable = (sjcTableRef: Ref, addDialog: Ref) => {
    // 表格配置项
    const tableConfig = reactive({
        showSelection: true,
        showHandler: true,
        showIndexColumn: true,
        isCheckMemory: true,
        showExpand: true,
        showAppend: true,
        handlerConfig: {
            width: 120,
        },
    });
    const state: {
        data: IColumnTypes[];
        loading: boolean;
    } = reactive({
        data: [],
        loading: false,
    });
    const pageConfig = reactive({
        currentPage: 1,
        pageSize: 10,
        total: 0,
    });

    const handleAddRole = () => {
        addDialog.value?.open({});
    };
    // 编辑操作
    function handlerEdit({ row }: { row: IColumnTypes}) {
        console.log(row);
        addDialog?.value.open(row);
    }
    // 删除操作
    function handleDelete(row: IColumnTypes) {
        console.log(row);
    }
    // 自定义索引
    function indexMethod(index: number) {
        return index * 5;
    }
    // 切换分页
    function pageSizeChange({ currentPage, pageSize }) {
        pageConfig.currentPage = currentPage;
        pageConfig.pageSize = pageSize;
        initData();
    }
    // 批量删除
    function batchDelete(selection: IColumnTypes[]) {
        console.log(selection);
    }
    // 批量导出
    function batchExport(selection: IColumnTypes[]) {
        console.log(selection);
    }
    // 清除多选
    function clearSelection() {
        console.log(sjcTableRef.value);
        // @ts-ignore
        sjcTableRef.value.clearSelection();
    }
    // 模拟数据
    function fetchData() {
        const result = [];
        for (let i = 0; i < 50; i++) {
            result.push({
                id: String(i),
                name: `李白${i + 1}`,
                province: '广东',
                area: '深圳',
                county: '南山',
                amount: i * 100,
            });
        }
        return result;
    }
    // 初始化数据
    function initData() {
        state.loading = true;
        setTimeout(() => {
            state.data = fetchData().slice(
                (pageConfig.currentPage - 1) * pageConfig.pageSize,
                pageConfig.currentPage * pageConfig.pageSize
            );
            state.loading = false;
        }, 1000);
    }
    // 多选选中时触发
    function multiSelection(selection: IColumnTypes[]) {
        console.log(selection);
    }
    onMounted(() => {
        pageConfig.total = fetchData().length;
        initData();
    });
    // 行点击事件 测试事件绑定
    function rowClick(row: IColumnTypes[]) {
        console.log(row);
    }

    const handleSearch = (values) => {
        console.log('values: ', values);
    };
    return {
        tableConfig,
        state,
        pageConfig,
        handleAddRole,
        handlerEdit,
        handleDelete,
        indexMethod,
        pageSizeChange,
        batchDelete,
        batchExport,
        clearSelection,
        multiSelection,
        rowClick,
        handleSearch,
    };
};
