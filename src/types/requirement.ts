import type { AcceptProgressType, ExpectTimeType } from '@/enums';

export interface RequirementEntity {
    barCode: AcceptProgressType
    barMsg: string
    contactMobile: string
    contactPerson: string
    corpCode: string
    corpName: string
    createTime: string
    expectFinancing: string
    expectTime: ExpectTimeType
    id: string
    progress: number
    updateTime: string
}

export interface AgileReqEntity extends RequirementEntity {

}
