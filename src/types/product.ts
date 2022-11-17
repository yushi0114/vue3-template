import type { RequirementEntity } from './requirement';

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
}

export interface ProductRequirementEntity extends RequirementEntity {
    productName: string,
    orgName: ProductEntity['orgName'],
}
