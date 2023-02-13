import type {
    AddPartnerType,
    DeletePartnerType, PartnerListItemType, GetPartnerListType,
    UpdatePartnerType
} from './type';
import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import { PlatformType } from '@/enums';

abstract class BasePartner {
    abstract add(params: AddPartnerType): Promise<void>;
    abstract update(params: UpdatePartnerType): Promise<void>;
    abstract delete(params: DeletePartnerType): Promise<void>;
    abstract getList(params: GetPartnerListType): Promise<{
        data: PartnerListItemType[],
        total: number
    }>;
}

class Partner extends BasePartner {
    add(params: AddPartnerType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/add/partner`, params);
    }

    delete(params: DeletePartnerType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/del/partner`, params);
    }

    getList(params: GetPartnerListType): Promise<{
        data: PartnerListItemType[],
        total: number
    }> {
        return api.post(`${DMS_DOMAIN}/v1/partner/list`, params);
    }

    update(params: UpdatePartnerType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/update/partner`, params);
    }
}

class PartnerZJFW extends BasePartner {
    add(params: AddPartnerType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/zjfw/add/partner`, params);
    }

    delete(params: DeletePartnerType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/zjfw/del/partner`, params);
    }

    getList(params: GetPartnerListType): Promise<{
        data: PartnerListItemType[],
        total: number
    }> {
        return api.post(`${DMS_DOMAIN}/v1/zjfw/partner/list`, params);
    }

    update(params: UpdatePartnerType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/zjfw/update/partner`, params);
    }
}

export class PartnerService {
    private readonly strategy: BasePartner;

    constructor(type: PlatformType) {
        if (type === PlatformType.LiaoXinTong){
            this.strategy = new Partner();
        } else {
            this.strategy = new PartnerZJFW();
        }
    }
    getInstance() {
        return this.strategy;
    }
}
