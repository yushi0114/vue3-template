export interface NavEntity {
    id: string,
    parentId: NavEntity['id'],
    sort: number,
    label: string,
    children?: NavEntity[],
}

export interface DynamicNavEntity extends NavEntity {
    defaultPath?: string,
    permission?: number
}

