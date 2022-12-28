import type {
    ListResponse,
    CorpUserListItemType
} from '@/types/corpUser';
import { DMS_DOMAIN } from './const';
import { api } from './http';

export type CorpUserTabType = 'lxt' | 'zjfw';

export type GetUserListType = {
    pageIndex: number
    pageSize: number
    sortField: string
    sortType: string
    searchInput: string
}

export type updateStatusType = {
    account: string
    status: number
}

export type DeleteBatchUserType = {
    idArr: Array<string>
};

export type GetShopCartInfoType = {
    id: string,
    pageIndex: number
    pageSize: number,
    searchInput: string,
};

export interface ShopEntity {
    guarantyStyle: string,
    loanDue: string,
    loanLimit: string,
    name: string,
    orgName: string,
    productId: string,
    referenceRate: string,
    status: number
}

export type GetShopCartInfoResponse = ListResponse<ShopEntity>

abstract class BaseCorpUser {
    abstract update(params: updateStatusType): Promise<void>;
    abstract delete(params: DeleteBatchUserType): Promise<void>;
    abstract getList(params: GetUserListType): Promise<{
        data: CorpUserListItemType[],
        total: number
    }>;
    abstract getInfo(params: GetShopCartInfoType): Promise<GetShopCartInfoResponse>;
}

class CorpUser extends BaseCorpUser {
    update(params: updateStatusType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/update/corp/user/status`, params);
    }

    delete(params: DeleteBatchUserType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/del/corp/user`, params);
    }

    getList(params: GetUserListType): Promise<{
        data: CorpUserListItemType[],
        total: number
    }> {
        return api.get(`${DMS_DOMAIN}/v1/corp/user/list`, { params });
    }

    getInfo(params:GetShopCartInfoType): Promise<GetShopCartInfoResponse> {
        return api.get(`${DMS_DOMAIN}/v1/Cart/products`, { params });
    }
}

class CorpUserZJFW extends BaseCorpUser {
    update(params: updateStatusType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/zjfw/update/corp/user/status`, params);
    }

    delete(params: DeleteBatchUserType): Promise<void> {
        return api.post(`${DMS_DOMAIN}/v1/zjfw/del/corp/user`, params);
    }

    getList(params: GetUserListType): Promise<{
        data: CorpUserListItemType[],
        total: number
    }> {
        return api.get(`${DMS_DOMAIN}/v1/zjfw/corp/user/list`, { params });
    }

    getInfo(params:GetShopCartInfoType): Promise<GetShopCartInfoResponse> {
        return api.get(`${DMS_DOMAIN}/v1/zjfw/Cart/products`, { params });
    }
}

export class CorpUserService {
    private readonly strategy: BaseCorpUser;

    constructor(type: 'lxt' | 'zjfw') {
        if (type === 'lxt'){
            this.strategy = new CorpUser();
        } else {
            this.strategy = new CorpUserZJFW();
        }
    }
    getInstance() {
        return this.strategy;
    }
}
