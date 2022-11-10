import type {TreeItemType} from '@/views/system-manage/type/route-list.type';


export const routeTree: TreeItemType[] = [
    {
        id: 1,
        label: 'Level one 1',
        children: [
            {
                id: 4,
                label: 'Level two 1-1',
                children: [
                    {
                        id: 9,
                        label: 'Level three 1-1-1'
                    },
                    {
                        id: 10,
                        label: 'Level three 1-1-2'
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: 'Level one 2',
        children: [
            {
                id: 5,
                label: 'Level two 2-1',
            },
            {
                id: 6,
                label: 'Level two 2-2',
            },
        ],
    },
    {
        id: 3,
        label: 'Level one 3',
        children: [
            {
                id: 7,
                label: 'Level two 3-1',
            },
            {
                id: 8,
                label: 'Level two 3-2',
            },
        ],
    },
];


export const tableData = [
    {
        id: '1',
        createAt: '2016-05-03',
        name: 'Tom',
        phone: '13342422781',
        roleId: '1'
    },
    {
        id: '2',
        createAt: '2016-05-02',
        name: 'Tom',
        phone: '13342422781',
        roleId: '1'
    },
    {
        id: '3',
        createAt: '2016-05-04',
        name: 'Tom',
        phone: '13342422781',
        roleId: '1'
    },
    {
        id: '4',
        createAt: '2016-05-01',
        name: 'Tom',
        phone: '13342422781',
        roleId: '1'
    },
];


export const roleList = [
    {
        id: '1',
        name: '管理员'
    }
];

