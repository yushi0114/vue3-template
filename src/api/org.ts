import type { OrgEntity, OrgLogoEntity, ListResponse } from '@/types';
import { DMS_DOMAIN } from './const';
import { api } from './http';

// #region 获取产品申请列表
export type GetTopOrgsPayload = {};

export type GetTopOrgsResponse = ListResponse<OrgEntity>;

export function getTopOrgs(payload?: GetTopOrgsPayload): Promise<GetTopOrgsResponse> {
    return api.post(`${DMS_DOMAIN}/v1/first/level/org/logo/all`, payload);
}

// #endregion

// #region 根据orgId获取产品logo
export type GetOrgLogoPayload = Pick<OrgLogoEntity, 'orgId'>;

export type GetOrgLogoResponse = OrgLogoEntity[];

export function getOrgLogo(payload?: GetOrgLogoPayload): Promise<GetOrgLogoResponse> {
    return api.get(`${DMS_DOMAIN}/v1/org/logo`, { params: payload });
}

// #endregion
