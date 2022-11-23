import type { RequirementEntity } from './requirement';

export interface ProductFilter {
    filterId: string,
    filterValue: string,
    filterCode: number
    typeCode: number,
    typeValue: string
}

export interface ProductEntity {
    guarantyStyle: string
    id: string
    loanDue: string
    loanLimit: string
    name: string
    orgId: string
    orgName: string
    referenceRate: string
    status: number
    successRate: string

    loan: string
    loanEnd: string
    guarantee: string
    logoContent: string
    description: string
    feature: string
    customer: string
    repayment: string
    applicationConditions: string
    requiredMaterials: string
    supportTel: string

    createBy: string
    createTime: string
    updateBy: string
    updateTime: string
    filterList: ProductFilter[]
}

export interface ProductRequirementEntity extends RequirementEntity {
    productName: string,
    orgName: ProductEntity['orgName'],
}
