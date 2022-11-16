import type { AcceptProgressType, ExpectTimeType } from '@/enums';

export interface RequirementEntity {
    barCode: number
    barMsg: string
    contactMobile: string
    contactPerson: string
    corpCode: string
    corpName: string
    createTime: string
    expectFinancing: string
    expectTime: ExpectTimeType
    id: string
    progress: AcceptProgressType
    updateTime: string
}

export interface AgileReqEntity extends RequirementEntity {

}

export interface ExactReqEntity extends RequirementEntity {

}
