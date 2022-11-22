import type { AcceptProgressType, ExpectTimeType, LoanTermType } from '@/enums';
import type { OrgAcceptProgress } from './org';

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
    dataFirst: OrgAcceptProgress[]
    dataSecond: OrgAcceptProgress[]
    firstEnd: boolean
    loanAmount: string
    loanRate: string
    loanTerm: LoanTermType
    productName: string
}

export interface AgileReqEntity extends RequirementEntity {

}

export interface ExactReqEntity extends RequirementEntity {

}
