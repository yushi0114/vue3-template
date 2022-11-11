import type { TodayIndicatorEntity, TotalIndicatorEntity, SuccessRateEntity, ApplyCountEntity } from '@/types';
import { DMS_DOMAIN } from './const';
import { api } from './http';

export type GetHomepageCountResponse = TodayIndicatorEntity & TotalIndicatorEntity & {
    successRate: SuccessRateEntity[],
    ezjfwSuccessRate: SuccessRateEntity[],
    reqSuccessRate: SuccessRateEntity[],
    reqEzjfwSuccessRate: SuccessRateEntity[],
    countProduct: ApplyCountEntity[],
    countEzjfwProduct: ApplyCountEntity[]
};

export function getHomepageCount(): Promise<GetHomepageCountResponse> {
    return api.get(`${DMS_DOMAIN}/v1/count/home/page`);
}
