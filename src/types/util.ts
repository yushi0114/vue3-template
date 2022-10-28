export interface PlainObject<T = any> {
    [key: string]: T
}
export interface PlainOption<T = any> {
    name: string,
    value: T,
}
