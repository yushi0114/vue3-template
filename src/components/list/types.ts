import type { PlainOption } from '@/types';

export type ListOperatorOption<T = any> = PlainOption<T> & {
    icon?: string;
    disabled?: boolean;
    hidden?: boolean;
};

export enum ItemOperate {
    detail = 'item-detail',
    offline = 'item-offline',
    online = 'item-online',
    edit = 'item-edit',
    delete = 'item-delete',
    reqDetail = 'item-req-detail',
    create = 'item-create',
}
