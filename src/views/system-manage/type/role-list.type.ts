

export type RoleFormType = {
    name: string;
    desc: string;
}

export type RoleListItemType = {
    id: string;
    name: string;
    desc?: string;
    roleIds?: string[]
}
