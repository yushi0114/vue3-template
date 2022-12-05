export type FinanceReportListItemType = {
    id: string;
    name: string;
    desc: string;
    create_by: string;
    create_time: string;
    update_by: string;
    update_time: string;
};


export type GetFinanceReportListType = {
    sortField: 'create_time',
    sortType: 'asc' | 'desc'
    searchInput?: string,
    pageIndex: number;
    pageSize: number;
}