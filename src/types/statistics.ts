export interface statistics {
    registerCorp: number,
    financeProduct: number,
    successFinance: number,
    solveFinance: number
}

export interface zjfwStatistics {
    registerEnterprise: number,
    financialProduct: number,
    releaseRequirement: number,
    registerOrg: number,
    financeResolve: number,
    propertyFinanceResolve: number
}

export enum StatisticsTabType {
    lxt = 'lxt',
    zjfw = 'zjfw'
}
