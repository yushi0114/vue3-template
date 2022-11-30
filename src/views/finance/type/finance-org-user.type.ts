export type FinanceOrgUserListItemType = {
    id: string;
    name: string;
    account: string;
    orgName: string;
    status: number;
    createBy: string;
    createTime: string;
    updateTime: string;
}


export type GetFinanceOrgUserListType = {
    sortField: 'create_time',
    sortType: 'asc' | 'desc'
    searchInput?: string,
    menuName: string;
    pageIndex: number;
    pageSize: number;
}