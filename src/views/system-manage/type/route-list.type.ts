export type TreeItemType = {
    id: string;
    label: string;
    status?: boolean;
    children?: TreeItemType[]
}


export type RouteFormType = {
    name: string,
    title: string,
    path: string,
    desc: string,
    sort: number,
    component: string,
    status: boolean
}


export type RouteTabType = 'dms' | 'cre' | 'fin';

export type AddRouteType = Omit<RouteFormType, 'status'> & {
    status: 0 | 1;
    tab: RouteTabType;
    parentId?: string;
    menuName: string;
}

export type UpdateMenuType = Omit<RouteFormType, 'status'> & {
    status: 0 | 1;
    id: string;
    tab: RouteTabType;
    parentId?: string;
    menuName: string;
}

export type DeleteMenuType = {
    idArr: string[];
    tab: RouteTabType;
    menuName: string;
}
