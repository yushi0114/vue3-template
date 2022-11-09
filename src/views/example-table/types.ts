/*
 * @Description:
 * @FilePath: \dms-web\src\views\example-table\types.ts
 * @Author: zys
 * @Date: 2022-11-09 14:16:13
 * @LastEditTime: 2022-11-09 14:23:44
 * @LastEditors: zys
 * @Reference:
 */
type IColumnTypes = {
    id: string;
    name: string;
    province: string;
    area: string;
    county: string;
    amount: number;
};
type IColumnKeys = keyof IColumnTypes;
export type { IColumnTypes, IColumnKeys };
