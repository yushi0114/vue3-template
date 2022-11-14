/*
 * @Description:
 * @FilePath: \dms-web\src\components\SjcForm\types.ts
 * @Author: zys
 * @Date: 2022-10-28 10:51:15
 * @LastEditTime: 2022-11-11 09:56:53
 * @LastEditors: zys
 * @Reference:
 */
import type { CSSProperties } from 'vue';
import type { FILE_TYPE } from '@/enums';

type DefItemType =
    | 'select'
    | 'input'
    | 'date-picker'
    | 'tree'
    | 'input-number'
    | 'textarea'
    | 'time-picker'
    | 'switch'
    | 'radio'
    | 'checkbox'
    | 'text'
    | 'unit'
    | 'upload';
type DefItemValue = string | number | string[] | null | undefined;
interface Tree {
    id: number | string;
    label: string;
    children?: Tree[];
}
import type { FormItemRule } from 'element-plus';

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
    autosize?: boolean | { minRows: number; maxRows: number };
};
type TreeForm = {
    treeData?: Tree[];
    fieldNames?: { label: string; value: string; children: string };
};
type SelectForm = {
    selectOptions?: { title: string; value: string | number }[];
};
type DatePicker = {
    datePickerType?: string;
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
        placeholder?: string;
        disabled?: boolean;
        borderless?: boolean;
        span?: number;
        defaultValue?: DefItemValue;
        value?: DefItemValue;
        rules?: FormItemRule[];
    };

type IFormValues<K extends string = string> = Record<K, DefItemValue>;
export type { DefItemValue, IFormValues };
