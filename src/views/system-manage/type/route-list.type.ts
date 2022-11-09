export type TreeItemType = {
    id: number;
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
