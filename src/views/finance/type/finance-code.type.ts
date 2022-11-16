export type FinanceCodeFormType = {
    orgName: string;
    orgCode: string;
    orgTypeCode:string;
    cityCode: string;
    address: string;
}

export type GetFinanceCodeListType = {
    sortField: 'create_time',
    sortType: 'desc',
    searchInput?: string,
    orgTypeCodeArr: number[],
    cityCodeArr: string[];
    menuName: string;
    pageIndex: number;
    pageSize: number;
}

export type DeleteFinanceCodeType = {
    id: string;
    menuName: string;
}


export type AddFinanceCodeType = FinanceCodeFormType & {
    menuName: string;
};


export type UpdateFinanceCodeType = AddFinanceCodeType & {
    id: string;
    menuName: string;
}


export type ImportFinanceCodeType = {
    file: File;
    menuName: string;
}

export type ExportFinanceCodeType = {
    searchInput?: string;
    sortField: 'create_time';
    sortType: 'desc';
    pageIndex: number;
    pageSize: number;
    menuName: string;
    orgTypeCodeArr: number[],
    cityCodeArr: string[]
};


export type FinanceCodeListItemType = FinanceCodeFormType & {
    id: string;
    createBy: string,
    createTime: string,
    updateBy: string,
    updateTime: string
}
