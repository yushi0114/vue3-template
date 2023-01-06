export type FinancePartnerFormType = {
    name: string,
    imgUrl: string,
    status: boolean,
}

export type FinancePartnerListItemType = {
    status: number,
    name: string,
    imgUrl: string,
    id: string;
}
export type AddFinancePartnerType = {
    name: string,
    imgUrl: string,
    status: number,
    menuName: string
}

export type UpdateFinancePartnerType = {
    id: string,
    name: string,
    imgUrl: string,
    status: number,
    menuName: string
}

export type DeleteFinancePartnerType = {
    id: string,
    menuName: string
}

export type GetFinancePartnerListType = {
    sortField: 'updateTime' | 'createTime',
    sortType: 'asc' | 'desc'
    searchInput?: string,
    menuName: string;
    pageIndex: number;
    pageSize: number;
}
