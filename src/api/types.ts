import type { SORT_TYPE } from '@/enums';
type HttpError = {
    code: number;
    msg: String;
};
interface IListCommonQueryParams {
    pageIndex?: number;
    pageSize?: number;
    sortType?: SORT_TYPE;
    sortField?: string;
}
type IListQueryParams<T> = IListCommonQueryParams & {
    [P in keyof T]: T[P];
};

type ICommonResult = {
    id: string;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
};

type IListCommonResult<T> = {
    pageTotal: number;
    data: T[];
};
export type { HttpError, IListQueryParams, IListCommonResult, ICommonResult };
