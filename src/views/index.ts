import type { DynamicNavEntity } from '@/types/system';
const VITE_VIEW_PATTERN = import.meta.glob('./**/*.vue');

/**
 * HARD CODE
 * [dataId, [routePath, filePath]]
 **/
export const dynamicRouteMap = new Map<DynamicNavEntity['id'], [string, string]>([
    ['1', ['/dashboard', '/dashboard/index']],
    ['3', ['/demo-table', '/demo-table/index']],
    ['4', ['/demo-permission/:id', '/demo-permission/index']],
    ['6', ['/example-table', '/example-table/index']],
]);

export function genDynamicComponent(filePath: string) {
    return VITE_VIEW_PATTERN[`.${filePath}.vue`];
}
