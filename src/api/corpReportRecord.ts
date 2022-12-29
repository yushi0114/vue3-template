import type {
    CorpReportRecordListItemType
} from '@/types/corpReportRecord';
import { DMS_DOMAIN } from './const';
import { api } from './http';

export type GetReportRecordListType = {
    pageIndex: number
    pageSize: number
    sortField: string
    sortType: string
    searchInput: string
}

export interface ReportRecordEntity {
    id: string,
    corpCode: string,
    corpName: string,
    createTime: string,
    inquiry: string
}

export type DeleteReportRecordType = {
    idArr: Array<string>
};

abstract class BaseReportRecord {
    abstract delete(params: DeleteReportRecordType): Promise<void>;
    abstract getList(params: GetReportRecordListType): Promise<{
        data: CorpReportRecordListItemType[],
        total: number
    }>;
}

class ReportRecord extends BaseReportRecord {
    delete(params: DeleteReportRecordType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/del/corp/report/log`, params);
    }

    getList(params: GetReportRecordListType): Promise<{
        data: CorpReportRecordListItemType[],
        total: number
    }> {
        return api.get(`${DMS_DOMAIN}/v1/corp/log/list`, { params });
    }
}

class ReportRecordZjfw extends BaseReportRecord {
    delete(params: DeleteReportRecordType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/zjfw/del/corp/report/log`, params);
    }

    getList(params: GetReportRecordListType): Promise<{
        data: CorpReportRecordListItemType[],
        total: number
    }> {
        return api.get(`${DMS_DOMAIN}/v1/zjfw/corp/log/list`, { params });
    }
}

export class ReportRecordService {
    private readonly strategy: BaseReportRecord;

    constructor(type: 'lxt' | 'zjfw') {
        if (type === 'lxt'){
            this.strategy = new ReportRecord();
        } else {
            this.strategy = new ReportRecordZjfw();
        }
    }
    getInstance() {
        return this.strategy;
    }
}
