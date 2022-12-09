export type FinanceCodeFormType = {
    orgName: string;
    orgCode: string;
    orgTypeCode:string;
    cityCode: string;
    address: string;
}

export type GetFinanceCodeListType = {
    sortField: 'create_time' | 'update_time',
    sortType: 'desc' | 'asc',
    searchInput?: string,
    orgTypeCodeArr: number[],
    cityCodeArr: string[];
    pageIndex: number;
    pageSize: number;
}

export type DeleteFinanceCodeType = {
    id: string;
}


export type AddFinanceCodeType = FinanceCodeFormType;


export type UpdateFinanceCodeType = AddFinanceCodeType & {
    id: string;
}


export type ImportFinanceCodeType = {
    file: File;
}

export type ExportFinanceCodeType = {
    searchInput?: string;
    sortField: 'create_time' | 'update_time';
    sortType: 'desc'| 'asc';
    // pageIndex: number;
    // pageSize: number;
    // orgTypeCodeArr: number[],
    // cityCodeArr: string[]
};


export type FinanceCodeListItemType = FinanceCodeFormType & {
    id: string;
    cityName: string;
    orgTypeName: string;
    createBy: string,
    createTime: string,
    updateBy: string,
    updateTime: string
}
