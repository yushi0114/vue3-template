import {api} from '@/api';
import {DMS_DOMAIN} from '@/api/const';

export type CityItemType = {
    id: string;
    code: string;
    name: string;
    sort: number;
    createBy: string,
    createTime: string,
    updateBy: string,
    updateTime: string
}

export function getAllCityList(): Promise<{data: CityItemType[]}> {
    return api.post(`${DMS_DOMAIN}/v1/city/all`, {
        menuName: ''
    });
}
