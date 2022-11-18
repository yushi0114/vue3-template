export interface PlainObject<T = any> {
    [key: string]: T;
}
export interface PlainOption<T = any> {
    name: string;
    value: T;
}

export interface ListResponse<T = any> {
    pageTotal: number,
    total: number,
    data: T[]
}
