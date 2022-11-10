import {ref} from 'vue';
import type {TreeItemType} from '@/views/system-manage/type/route-list.type';
import type {RoleFormType} from '@/views/system-manage/type/role-list.type';
import {routeTree} from '@/views/system-manage/mock/route-tree';

export const dataSource = ref<TreeItemType[]>();

export const mode = ref<'form' | 'list'>('list');
export const currentRoleId = ref();

export const roleForm = ref<RoleFormType>();
export const formType = ref<'create' | 'edit'>('edit');


export async function getTreeData(): Promise<void> {
    dataSource.value = routeTree;
}


