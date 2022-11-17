export type FinanceInstitutionTreeItemType = {
    id: string;
    orgName: string;
    sort: number;
    parentId?: string;
    children?: FinanceInstitutionTreeItemType[]
};

export type FinanceInstitutionMenuTreeItemType = {
    id: string;
    label: string;
    selected: number;
    sort: number;
    parentId?: string;
    children?: FinanceInstitutionMenuTreeItemType[]
};

export type FinanceInstitutionType = {
    id: string;
    orgName: string;
    orgCode: string;
    orgDictionaryId: string;
    parentId: string;
    orgLevel: number;
    secretKey: string;
    desc: string;
    sort: number;
    status: number;
    menuIdArr: string[]
}
