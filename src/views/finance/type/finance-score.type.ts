export type FinanceScoreListItemType = {
    id: string;
    name: string;
    desc: string;
    create_by: string;
    create_time: string;
    update_by: string;
    update_time: string;
}


export type GetFinanceScoreListType = {
    sortField: 'create_time',
    sortType: 'asc' | 'desc'
    searchInput?: string,
    menuName: string;
    pageIndex: number;
    pageSize: number;
}
