

export type RoleFormType = {
    name: string;
    desc: string;
    menuIdArr: string[]
}

export type RoleListItemType = {
    id: string;
    name: string;
    desc?: string;
    roleIds?: string[]
}


export enum RoleTabType {
    dms = 'dms',
    credit = 'cre'
}


export type AddRoleType = {
    name: string;
    menuIdArr: string[];
    desc: string;
    tab: RoleTabType;
}

export type UpdateRoleType = AddRoleType & {
    roleId: string;
}

export type DeleteRoleType = {
    roleId: string;
    tab: RoleTabType;
}
