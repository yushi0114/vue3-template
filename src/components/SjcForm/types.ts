/*
 * @Description:
 * @FilePath: \dms-web\src\components\SjcForm\types.ts
 * @Author: zys
 * @Date: 2022-10-28 10:51:15
 * @LastEditTime: 2022-11-10 11:32:58
 * @LastEditors: zys
 * @Reference:
 */
import type { CSSProperties } from 'vue';

type DefItemType = 'select' | 'input' | 'date-picker' | 'tree';
type DefItemValue = string | number | string[] | null | undefined;
interface Tree {
    id: number | string;
    label: string;
    children?: Tree[];
}
import type { FormItemRule } from 'element-plus';

export interface DefItem {
    style?: CSSProperties;
    label?: string;
    type: DefItemType;
    keyName: string;
    placeholder?: string;
    borderless?: boolean;
    span?: number;
    defaultValue?: DefItemValue;
    selectOptions?: { title: string; value: string | number }[];
    treeData?: Tree[];
    fieldNames?: { label: string; value: string; children: string };
    value?: DefItemValue;
    rules?: FormItemRule[];
}

type IFormValues<K extends string = string> = Record<K, DefItemValue>;
export type { DefItemValue, IFormValues };
