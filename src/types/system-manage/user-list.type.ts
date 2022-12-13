export type UserListItemType = {
    id: string;
    account: string;
    desc?: string;
    name: string;
    roleId: string;
    roleName: string;
    status: 0 | 1;
    createBy: string,
    createTime: string,
    updateBy: string,
    updateTime: string
}


export type UserFormType = {
    account: string;
    name: string;
    roleId: string;
    status: boolean;
}
export type UserTabType = 'dms' | 'cre';

export type AddUserType = {
    name: string;
    roleId: string;
    status: number;
    menuName: string;
    tab: UserTabType;
}

export type UpdateUserType = AddUserType & {
    id: string;
}


export type DeleteUserType = {
    idList: string[];
    accountList: string[];
    tab: UserTabType;
    menuName: string;
}