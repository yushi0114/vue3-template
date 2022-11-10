/*
 * @Description:
 * @FilePath: \dms-web\src\components\SjcForm\hooks\useTree.ts
 * @Author: zys
 * @Date: 2022-11-10 10:34:30
 * @LastEditTime: 2022-11-10 11:17:22
 * @LastEditors: zys
 * @Reference:
 */
import type { ElTree } from 'element-plus';
import type { DefItem } from '../types';
export const useTree = () => {
    const treeListMap = ref(new Map());
    const handleTreeCheckChange = (item: DefItem) => {
        item.value = treeListMap.value.get(item.keyName)?.getCheckedKeys(false);
    };
    const bindTreeRef = (el: InstanceType<typeof ElTree>, key: string) => {
        if (el) {
            treeListMap.value.set(key, el);
        }
    };
    return {
        treeProps: {
            label: 'label',
            children: 'children',
            disabled: 'disabled',
        },
        handleTreeCheckChange,
        bindTreeRef,
    };
};
