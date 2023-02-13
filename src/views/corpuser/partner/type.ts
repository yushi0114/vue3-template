export type PartnerFormType = {
    name: string,
    imgUrl: string,
    status: boolean,
}

export type PartnerListItemType = {
    status: number,
    name: string,
    imgUrl: string,
    id: string;
}
export type AddPartnerType = {
    name: string,
    imgUrl: string,
    status: number,
    menuName: string
}

export type UpdatePartnerType = {
    id: string,
    name: string,
    imgUrl: string,
    status: number,
    menuName: string
}

export type DeletePartnerType = {
    id: string,
    menuName: string
}

export type GetPartnerListType = {
    sortField: 'updateTime' | 'createTime',
    sortType: 'asc' | 'desc'
    searchInput?: string,
    menuName: string;
    pageIndex: number;
    pageSize: number;
}
