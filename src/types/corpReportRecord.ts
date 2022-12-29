export interface CorpRepoteRecordTable {
    id: string,
    corpCode: string,
    corpName: string,
    createTime: string,
    inquiry: string
}

export enum CorpReportRecordTabType {
    lxt = 'lxt',
    zjfw = 'zjfw'
}

export interface CorpReportRecordListItemType {
    tab: string,
    id: string,
    corpCode: string,
    corpName: string,
    createTime: string,
    inquiry: string
}

export interface ListResponse<T = any> {
    total: number,
    data: T[]
}
