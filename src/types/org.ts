import type { OrgProgressStatusType } from '@/enums';

export interface OrgEntity {
    id: string,
    orgName: string
}

export interface OrgAcceptProgress {
    orgName: string
    orgProgress: number
    orgProgressOpinion: string
    orgProgressStatus: OrgProgressStatusType
    orgType: number
    orgUpdateBy: string
    orgUpdateTime: string
}
