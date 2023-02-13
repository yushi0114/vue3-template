export interface CorpUserTable {
    id: string,
    account: string,
    createTime: string,
    updateTime: string,
    status: number
}

export interface ShopCartTable {
    id: string;
    guarantyStyle: string,
    loanDue: string,
    loanLimit: string,
    name: string,
    orgName: string,
    productId: string,
    referenceRate: string,
    status: number
}

export enum CorpUserTabType {
    lxt = 'lxt',
    zjfw = 'zjfw'
}

export interface CorpUserListItemType {
    tab: string,
    id: string,
    account: string,
    createTime: string,
    updateTime: string,
    status: number
}

export interface ListResponse<T = any> {
    total: number,
    data: T[]
}
