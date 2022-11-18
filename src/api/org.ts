import type { OrgEntity } from '@/types';
import { DMS_DOMAIN } from './const';
import { api } from './http';

// #region 获取产品申请列表
export type GetTopOrgsPayload = {
}

export type GetTopOrgsResponse = OrgEntity[];

export function getTopOrgs(payload?: GetTopOrgsPayload): Promise<GetTopOrgsResponse> {
    return api.get(`${DMS_DOMAIN}/v1/first/level/org/all`, payload);
}

// #endregion
