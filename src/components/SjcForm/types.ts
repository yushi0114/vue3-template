/*
 * @Description:
 * @FilePath: \dms-web\src\components\SjcForm\types.ts
 * @Author: zys
 * @Date: 2022-10-28 10:51:15
 * @LastEditTime: 2022-12-01 17:06:23
 * @LastEditors: zys
 * @Reference:
 */
import type { CSSProperties } from 'vue';
import type { PlainOption } from '@/types';
import type { FILE_TYPE, FormType, FILE_SERVER } from '@/enums';
import type { FormItemRule } from 'element-plus';

type DefItemType = FormType;
type DefItemValue = any;
interface Tree {
    id: number | string;
    label: string;
    children?: Tree[];
}

type InputForm = {
    maxlength?: number | string;
    showWordLimit?: boolean;
    readonly?: boolean;
};

type InputNumberForm = {
    min?: number;
    max?: number;
    controls?: boolean;
};

type TextareaForm = {
    autosize?: boolean | { minRows?: number; maxRows?: number };
};
type TreeForm = {
    treeData?: Tree[];
    fieldNames?: { label: string; value: string; children: string };
};
type SelectForm = {
    multiple?: boolean;
    selectOptions?: PlainOption[];
};
type DatePicker = {
    datePickerType?:
        | 'year'
        | 'month'
        | 'date'
        | 'dates'
        | 'datetime'
        | 'week'
        | 'datetimerange'
        | 'daterange'
        | 'monthrange';
    valueFormat?: string;
    disabledDate?: (time: Date) => boolean;
    startPlaceholder?: string;
    endPlaceholder?: string;
    rangeSeparator?: string;
};
type TimePickerForm = {
    isRange?: boolean;
};
type SwitchForm = {
    activeValue?: boolean | number | string;
    inactiveValue?: boolean | number | string;
};
type RadioForm = {
    radioOptions?: { label: number | string; value: number | string }[];
};

type CheckboxForm = {
    checkboxOptions?: { label: number | string; value: number | string }[];
};
type UploadForm = {
    uploadObj?: Partial<UploadObj>;
};
export type UploadObj = {
    limit: number;
    hideUpload: boolean;
    showFileList: boolean;
    listType: 'text' | 'picture' | 'picture-card';
    fileType: FILE_TYPE;
    tips: string;
};
export type DefItem = InputForm &
    InputNumberForm &
    TextareaForm &
    TreeForm &
    SelectForm &
    DatePicker &
    TimePickerForm &
    SwitchForm &
    RadioForm &
    CheckboxForm &
    UploadForm & {
        labelWidth?: string;
        style?: CSSProperties;
        label?: string;
        type: DefItemType;
        keyName: string;
        isIgnoreKey?: boolean;
        placeholder?: string;
        disabled?: boolean;
        borderless?: boolean;
        span?: number;
        defaultValue?: DefItemValue;
        value?: DefItemValue;
        rules?: FormItemRule[] | ((...args: any) => FormItemRule[]);
        formatter?: <T = any, K = DefItem>(data: T, formItem: K) => any;
        fileServer?: FILE_SERVER;
    };

type IFormValues<K extends string = string> = Record<K, DefItemValue>;
export type { DefItemValue, IFormValues };
