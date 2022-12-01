/*
 * @Description:
 * @FilePath: \dms-web\src\types\org.ts
 * @Author: zys
 * @Date: 2022-11-22 17:30:51
 * @LastEditTime: 2022-12-01 14:31:26
 * @LastEditors: zys
 * @Reference:
 */
import type { OrgProgressStatusType } from '@/enums';

export interface OrgEntity {
    orgId: string;
    orgLogoId: string;
    orgName: string;
    sort: number;
}

export interface OrgLogoEntity {
    id: string;
    orgId: string;
    logoContent: string;
}

export interface OrgAcceptProgress {
    orgName: string;
    orgProgress: number;
    orgProgressOpinion: string;
    orgProgressStatus: OrgProgressStatusType;
    orgType: number;
    orgUpdateBy: string;
    orgUpdateTime: string;
}
