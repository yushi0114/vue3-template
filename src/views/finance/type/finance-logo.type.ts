export type FinanceLogoListItemType = {
    orgName: string;
    orgLogoId: string;
    orgId: string;
    logoContent: string;
    sort: number;
}


export type GetFinanceLogoListType = {
    sortField: 'create_time',
    sortType: 'asc' | 'desc'
    searchInput?: string,
    menuName: string;
    pageIndex: number;
    pageSize: number;
}
