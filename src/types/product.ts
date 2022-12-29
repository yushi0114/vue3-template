import type { ProductRecommandType, SwitchType, PRODUCT_STEPS } from '@/enums';
import type { EpPropMergeType } from 'element-plus/es/utils';
import type { RequirementEntity } from './requirement';

export interface ProductFilterEntity {
    id: string;
    filterId: ProductFilterEntity['id'];
    filterValue: string;
    filterCode: number;
    typeCode: number;
    typeValue: string;
    editable: boolean;
    isFilterShow: SwitchType;
    filter?: ProductFilterEntity[];
}

export interface ProductEntity {
    guarantyStyle: string;
    id: string;
    loanDue: string;
    loanLimit: string;
    name: string;
    orgId: string;
    orgName: string;
    referenceRate: string;
    status: number;
    successRate: string;

    loan: string;
    loanEnd: string;
    guarantee: string;
    logoContent: string;
    description: string;
    feature: string;
    customer: string;
    repayment: string;
    applicationConditions: string;
    requiredMaterials: string;
    supportTel: string;

    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    filterList: ProductFilterEntity[];
}

export interface ProductRequirementEntity extends RequirementEntity {
    productName: string;
    orgName: ProductEntity['orgName'];
}

export interface ProductRecommandEntity {
    id: string;
    name: string;
    orgProductId: string;
    productPoster: string;
    productType: ProductRecommandType;
    status: SwitchType;
}

export type ProductStepsMap = Record<
    PRODUCT_STEPS,
    {
        title: PRODUCT_STEPS;
        leftBtnText: string;
        rightBtnText: string;
        updateSubmit: number;
        processStatus: EpPropMergeType<StringConstructor, 'success' | 'error' | 'wait' | 'process' | 'finish', unknown>;
    }
>;
