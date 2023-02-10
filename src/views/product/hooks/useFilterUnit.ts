import { FILTER_UNIT_MAP } from '../constants';
export const useFilterUnit = () => {
    const formatterFilterUnit = computed(() => {
        return (typeValue: keyof typeof FILTER_UNIT_MAP, filterValue: string) => {
            return FILTER_UNIT_MAP[typeValue] && filterValue !== '不限'
                ? filterValue + FILTER_UNIT_MAP[typeValue]
                : filterValue;
        };
    });
    return {
        formatterFilterUnit,
    };
};
