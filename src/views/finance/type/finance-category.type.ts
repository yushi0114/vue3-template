

export type FinanceCategoryFormType = {
    name: string;
    desc?: string;
    sort: number;
    typeModuleId: string;
    menuIdArr: string[];
};

export type AddFinanceCategoryType = FinanceCategoryFormType & {
    menuName: string;
};

export type DeleteFinanceCategoryType = {
    id: string;
    menuName: string;
}

export type UpdateFinanceCategoryType = AddFinanceCategoryType & {
    id: string;
    menuName: string;
}

export type GetFinanceCategoryListType = {
    searchInput?: string;
    sortField: 'create_time';
    sortType: 'desc';
    pageIndex: number;
    pageSize: number;
    menuName: string;
}

export type FinanceCategoryListItemType = {
    id: string,
    name: string,
    code: string,
    desc?: string,
    sort: number,
    typeModuleId: string,
    createBy: string,
    createTime: string,
    updateBy: string,
    updateTime: string
}


export type AllSystemMenuTreeItem = {
    id: string;
    parentId: string;
    label: string;
    sort: string;
    children?: AllSystemMenuTreeItem[]
}

export type OrgTypeMenuItem = {
    id: string;
    title: string;
    name: string;
}
