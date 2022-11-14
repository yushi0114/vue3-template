export type UserListItemType = {
    id: string;
    account: string;
    name: string;
    roleId: string;
    status: 0 | 1;
}


export type UserFormType = {
    name: string;
    roleId: string;
    status: boolean;
}
export type UserTabType = 'dms' | 'cre';

export type AddUserType = {
    name: string;
    roleId: string;
    status: boolean;
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