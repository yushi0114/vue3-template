

export type FinanceCategoryFormType = {
    name: string;
    desc?: string;
    sort: number;
    typeModuleId: string;
    menuIdArr: string[];
};

export type AddFinanceCategoryType = FinanceCategoryFormType;

export type DeleteFinanceCategoryType = {
    id: string;
}

export type UpdateFinanceCategoryType = AddFinanceCategoryType & {
    id: string;
}

export type GetFinanceCategoryListType = {
    searchInput?: string;
    sortField: 'create_time' | 'update_time';
    sortType: 'desc' | 'asc';
    pageIndex: number;
    pageSize: number;
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

export type FinanceCategoryItemType = FinanceCategoryListItemType & {
    menuIdArr: string[];
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
