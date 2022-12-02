import { api } from '@/api';
import { DMS_DOMAIN } from '@/api/const';
import type { CityItemType } from '@/types/finance';


export function getAllCityListApi(): Promise<{ data: CityItemType[] }> {
    return api.post(`${DMS_DOMAIN}/v1/city/all`, {
        menuName: ''
    });
}
