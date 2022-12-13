export type TreeItemType = {
    id: string;
    label: string;
    status?: boolean;
    children?: TreeItemType[]
}


export type MenuFormType = {
    name: string,
    title: string,
    path: string,
    desc: string,
    icon: string,
    sort: number,
    component: string,
    status: boolean
}

export type MenuItemType = {
    name: string,
    title: string,
    path: string,
    desc: string,
    icon: string,
    sort: number,
    component: string,
    status: number
    parentId: string,
    createBy: string,
    createTime: string,
    updateBy: string,
    updateTime: string
}


export type MenuTabType = 'dms' | 'cre' | 'fin';

export type MenuRouteType = Omit<MenuFormType, 'status'> & {
    status: 0 | 1;
    tab: MenuTabType;
    parentId?: string;
    menuName: string;
}

export type UpdateMenuType = Omit<MenuFormType, 'status'> & {
    status: 0 | 1;
    id: string;
    tab: MenuTabType;
    parentId?: string;
    menuName: string;
}

export type DeleteMenuType = {
    idArr: string[];
    tab: MenuTabType;
    menuName: string;
}
