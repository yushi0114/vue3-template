export interface ICityTable {
    id: string,
    name: string,
    code: string,
    sort: number,
    createBy: string,
    createTime: string,
    updateBy: string,
    updateTime: string
}

export interface OperateCityEntity {
    name: string,
    code: string,
    sort: number | string
    id: string
}
