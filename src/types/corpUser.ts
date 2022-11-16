export interface CorpUserTable {
    id: string,
    account: string,
    createTime: string,
    updateTime: string,
    status: number
}

export interface ShopCartTable {
    guarantyStyle: string,
    loanDue: string,
    loanLimit: string,
    name: string,
    orgName: string,
    productId: string,
    referenceRate: string,
    status: number
}
