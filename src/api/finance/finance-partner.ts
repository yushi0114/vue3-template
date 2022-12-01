import type {
    AddFinancePartnerType,
    DeleteFinancePartnerType, FinancePartnerListItemType, GetFinancePartnerListType,
    UpdateFinancePartnerType
} from '@/types/finance';
import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';

abstract class BaseFinancePartner {
    abstract add(params: AddFinancePartnerType): Promise<void>;
    abstract update(params: UpdateFinancePartnerType): Promise<void>;
    abstract delete(params: DeleteFinancePartnerType): Promise<void>;
    abstract getList(params: GetFinancePartnerListType): Promise<{
        data: FinancePartnerListItemType[],
        total: number
    }>;
}

class FinancePartner extends BaseFinancePartner {
    add(params: AddFinancePartnerType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/add/partner`, params);
    }

    delete(params: DeleteFinancePartnerType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/del/partner`, params);
    }

    getList(params: GetFinancePartnerListType): Promise<{
        data: FinancePartnerListItemType[],
        total: number
    }> {
        return api.post(`${DMS_DOMAIN}/v1/partner/list`, params);
    }

    update(params: UpdateFinancePartnerType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/update/partner`, params);
    }
}

class FinancePartnerZJFW extends BaseFinancePartner {
    add(params: AddFinancePartnerType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/zjfw/add/partner`, params);
    }

    delete(params: DeleteFinancePartnerType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/zjfw/del/partner`, params);
    }

    getList(params: GetFinancePartnerListType): Promise<{
        data: FinancePartnerListItemType[],
        total: number
    }> {
        return api.post(`${DMS_DOMAIN}/v1/zjfw/partner/list`, params);
    }

    update(params: UpdateFinancePartnerType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/zjfw/update/partner`, params);
    }
}

export class FinancePartnerService {
    private readonly strategy: BaseFinancePartner;

    constructor(type: 'zjfw' | 'sjzx') {
        if (type === 'zjfw'){
            this.strategy = new FinancePartner();
        } else {
            this.strategy = new FinancePartnerZJFW();
        }
    }
    getInstance() {
        return this.strategy;
    }
}
