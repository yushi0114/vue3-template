/*
 * @Description:
 * @FilePath: \dms-web\src\views\article\hooks\useTable.ts
 * @Author: zys
 * @Date: 2022-11-04 14:45:20
 * @LastEditTime: 2022-12-05 17:09:35
 * @LastEditors: zys
 * @Reference:
 */
import type { IPaginationConfig } from '@/components/SjcTable/types';
import { ElMessageBox } from 'element-plus';
import { debounce, cloneDeep } from 'lodash';
import {
    SORT_TYPE,
    ARTICLE_STATUS,
    ARTICLE_OPERATE_MODE,
    ARTICLE_OPERATE_MODE_LABEL,
    ARTICLE_MODULE,
    ARTICLE_API,
    ARTICLE_PAGE,
} from '@/enums';
import { getFileIdByUrl } from './../../../utils/file/util';
import type { NewsItem, PolicyItem, NewsListParams, ArticleSortItem, TAB_ITEM } from '@/types';
import { useApi } from '@/composables';
import { useApiManage } from './useApiManage';
import { useJumpLink } from './useRouterLinkManage';
import { useArticleDetail } from './useDetail';
import { noop, getUrlListFromText } from '@/utils';
import { ARTICLE_TYPE } from '../constants';
import { useUserStore } from '@/stores';
import type { ComputedRef } from 'vue';

const {
    state: { user },
} = useUserStore();

export const useTable = (
    tab: TAB_ITEM,
    module: ARTICLE_MODULE,
    page: ARTICLE_PAGE = ARTICLE_PAGE.LIST,
    emit?: any,
    activeId?: ComputedRef<string>
) => {
    const { tabItem, articleStatus } = useArticleDetail();
    const INITIAL_PARAMS = {
        status: ARTICLE_STATUS.ALL,
        ...tab.queryParams,
        searchInput: ref(''),
        sortType: SORT_TYPE.NONE,
        sortField: 'sort',
        pageIndex: 1,
        pageSize: 20,
    };
    const params = reactive(cloneDeep(INITIAL_PARAMS));

    const ARTICLE_API_MAP = useApiManage(module);
    const { handleToEdit } = useJumpLink({
        tab: tab,
        module: module,
    });
    const ARTICLE_TYPE_LABEL = ARTICLE_TYPE[module];
    const { loading, request: loadNewsList } = useApi(ARTICLE_API_MAP[ARTICLE_API.LOAD_LIST], {
        onSuccess(data, [params]) {
            if (page === ARTICLE_PAGE.DETAIL) {
                if (params.pageIndex === INITIAL_PARAMS.pageIndex) {
                    state.data = [];
                    state.disabled = false;
                    state.noMore = false;
                }
                state.data.push(...(data.data as any));
                if (state.data.length >= data.pageTotal) {
                    state.disabled = true;
                    state.noMore = true;
                }
                pageConfig.total = data.pageTotal;
            } else {
                state.data = data.data;
                pageConfig.total = data.pageTotal;
            }
        },
        onError() {},
    });

    const { request: _updateNewsStatus } = useApi(ARTICLE_API_MAP[ARTICLE_API.UPDATE_ARTICLE_STATUS], {
        onSuccess(data, params) {
            ElMessage({
                type: 'success',
                message: '操作成功',
            });
            if (page === ARTICLE_PAGE.DETAIL && params[0].id === activeId!.value) {
                emit('refresh');
            }
            fetchTableData();
        },
        onError(error) {
            console.log('error: ', error);
        },
    });

    const { request: updateSort } = useApi(ARTICLE_API_MAP[ARTICLE_API.UPDATE_ARTICLE_SORT], {
        onSuccess() {
            ElMessage({
                type: 'success',
                message: '操作成功',
            });
            fetchTableData();
        },
        onError(error) {
            console.log('error: ', error);
        },
    });

    const { request: deleteArticle } = useApi(ARTICLE_API_MAP[ARTICLE_API.DELETE_ARTICLE], {
        onSuccess(data) {
            ElMessage({
                type: 'success',
                message: '操作成功',
            });
            clearArticleActiveId();
            fetchTableData();
            return Promise.resolve(data);
        },
        onError(error) {
            console.log('error: ', error);
        },
    });

    const { request: deleteFile } = useApi(ARTICLE_API_MAP[ARTICLE_API.DELETE_FILE], {
        onSuccess() {},
        onError() {},
    });

    // 表格配置项
    const tableConfig = reactive({
        showHandler: true,
        showAppend: true,
        handlerConfig: {
            width: 120,
        },
    });

    const state: {
        data: NewsItem[] | PolicyItem[];
        loading: boolean;
        loadingMore: boolean;
        disabled: boolean;
        noMore: boolean;
    } = reactive({
        data: [],
        loading,
        loadingMore: false,
        disabled: false,
        noMore: false,
    });
    const pageConfig = reactive({
        currentPage: 1,
        pageSize: 10,
        total: 0,
    });

    const initParams = (all: boolean = false, fields: (keyof typeof params)[] = []) => {
        if (all) {
            Object.assign(params, cloneDeep(INITIAL_PARAMS));
        } else {
            fields.forEach((field) => {
                if (params[field]) {
                    (params as any)[field] = INITIAL_PARAMS[field];
                }
            });
        }
    };

    const clearArticleActiveId = () => {
        if (page === ARTICLE_PAGE.DETAIL) {
            emit('update:activeId', '');
        }
    };

    const handleSearch = () => {
        initParams(false, ['pageIndex']);
        fetchTableData();
    };

    const handleDebounceSearch = debounce(() => {
        clearArticleActiveId();
        handleSearch();
    }, 500);

    // 删除静态服务器的文件
    const deleteFileOnServer = (params: any) => {
        // 删除新闻成功后清除文件服务器中的静态文件
        params.thumbnail && deleteFile({ id: getFileIdByUrl(params.thumbnail) });
        const deleteList = getUrlListFromText(params.content);
        deleteList.forEach((src: string) => {
            deleteFile({ id: getFileIdByUrl(src) });
        });
    };

    // 删除操作
    async function handleDelete({ row }: { row: NewsItem | PolicyItem }) {
        try {
            await ElMessageBox.confirm(`确认删除“${row.title}”的${ARTICLE_TYPE_LABEL}？`, '删除', {
                type: 'warning',
            });
            await deleteArticle({ id: row.id });
            deleteFileOnServer(row);
        } catch {
            noop;
        }
    }
    // 切换分页
    function pageSizeChange({ currentPage, pageSize }: IPaginationConfig) {
        pageConfig.currentPage = currentPage ?? 1;
        pageConfig.pageSize = pageSize ?? 10;
        params.pageIndex = pageConfig.currentPage;
        params.pageSize = pageConfig.pageSize;
        fetchTableData();
    }

    const loadMore = () => {
        params.pageIndex += 1;
        fetchTableData(true);
    };

    // 筛选项变化
    const handleFilterChange = (filter?: { status: ARTICLE_STATUS }) => {
        Object.assign(params, filter);
        initParams(false, ['searchInput', 'pageIndex']);
        clearArticleActiveId();
        fetchTableData();
    };
    // 排序变化
    const handleSortChange = (sort: Omit<ArticleSortItem, 'label'>) => {
        params.sortType = sort.sortType;
        params.sortField = sort.sortField;
        initParams(false, ['pageIndex']);
        fetchTableData();
    };
    // 加载数据
    function fetchTableData(isLoadingMore: boolean = false) {
        state.loadingMore = isLoadingMore;
        const queryParams: NewsListParams = {};
        if (params.status === ARTICLE_STATUS.MY_PUBLISHED) {
            queryParams.status = ARTICLE_STATUS.PUBLISHED;
            queryParams.updateBy = user?.id ?? '';
        }
        const _params = { ...params, ...queryParams };
        loadNewsList(_params);
    }

    const handleMoreOperate = (command: ARTICLE_OPERATE_MODE, row: NewsItem | PolicyItem) => {
        switch (command) {
            case ARTICLE_OPERATE_MODE.EDIT:
                handleToEdit({ row });
                break;

            case ARTICLE_OPERATE_MODE.PUBLISH:
                updateArticleStatus({
                    row,
                    status: ARTICLE_STATUS.PUBLISHED,
                    operateLabel: ARTICLE_OPERATE_MODE_LABEL.PUBLISH,
                });
                break;
            case ARTICLE_OPERATE_MODE.OFFLINE:
                updateArticleStatus({
                    row,
                    status: ARTICLE_STATUS.OFFLINE,
                    operateLabel: ARTICLE_OPERATE_MODE_LABEL.OFFLINE,
                });
                break;
            case ARTICLE_OPERATE_MODE.SORT:
                updateArticleSort({ row });
                break;
            case ARTICLE_OPERATE_MODE.DELETE:
                handleDelete({ row });
        }
    };

    const updateArticleStatus = async ({ row, status, operateLabel }: any) => {
        try {
            await ElMessageBox.confirm(`确定${operateLabel}标题为“${row.title}”的${ARTICLE_TYPE_LABEL}吗？`, {
                type: 'warning',
            });
            _updateNewsStatus({ id: row.id, status });
        } catch {
            return;
        }
    };

    const updateArticleSort = async ({ row }: any) => {
        try {
            const { value } = await ElMessageBox.prompt('请输入新的序号', '修改排序', {
                showInput: true,
                inputValue: row.sort || '',
                inputValidator: (val) => {
                    if (val.length === 0) {
                        return '序号不能为空';
                    } else if (!/^[1-9]\d*$/.test(val)) {
                        return '序号只能为1-999的整数';
                    } else {
                        return true;
                    }
                },
                confirmButtonText: '修改',
            });
            updateSort({ id: row.id, sort: Number(value) });
        } catch {
            return;
        }
    };
    onMounted(() => {
        if (page === ARTICLE_PAGE.DETAIL && tabItem!.value === tab.value) {
            params.status = articleStatus.value ? Number(articleStatus.value) : articleStatus.value;
        }
        fetchTableData();
    });
    return {
        ARTICLE_API_MAP,
        params,
        tableConfig,
        state,
        pageConfig,
        handleSearch,
        handleDebounceSearch,
        handleFilterChange,
        handleSortChange,
        handleDelete,
        pageSizeChange,
        fetchTableData,
        loadMore,
        handleMoreOperate,
        _updateNewsStatus,
    };
};
