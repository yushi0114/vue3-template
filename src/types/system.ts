export enum NavStatusType {
    default = 1,
}
export interface NavEntity {
    id: string,
    parentId: NavEntity['id'],
    sort: number,
    title: string,
    path: string,
    status: NavStatusType,
    desc?: string,
    component?: string,
    icon?: string,
    children?: NavEntity[],
}

export interface DynamicNavEntity extends NavEntity {
    defaultPath?: string,
    children?: DynamicNavEntity[]
}
