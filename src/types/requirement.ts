import type { AcceptProgressType, ExpectTimeType, LoanTermType, SwitchType, TaxGradeType, SteType, LoanEndType, LongestOverdueType, ExpectRateType } from '@/enums';
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
    expectRate: ExpectRateType,
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

    mseType: SwitchType,
    pawnType: SwitchType,
    guaranteeType: SwitchType,
    taxGrade: TaxGradeType,
    steType: SteType,
    gpType: SwitchType,
    financingType: SwitchType,
    loanEnd: LoanEndType,
    longestOverdue: LongestOverdueType,
}

export interface AgileReqEntity extends RequirementEntity {

}

export interface ExactReqEntity extends RequirementEntity {

}
