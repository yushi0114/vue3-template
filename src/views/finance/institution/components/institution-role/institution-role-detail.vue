<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RoleListItemType, TreeItemType } from '@/types/system-manage';
import { roleMenuTreeData } from './institution-role';

defineProps({
    drawerVisible: {
        type: Boolean,
        default: false,
    },
    dataDetail: {
        type: Object as PropType<RoleListItemType & { menuIdArr: string[] }>,
        default: () => ({})
    }
});

function setData(list: TreeItemType[]) {
    return list.map(item => {
        let newItem: any;
        if (item.children) {
            newItem = {
                ...item,
                disabled: true,
                children: setData(item.children)
            };
        } else {
            newItem = {
                ...item,
                disabled: true
            };
        }
        return newItem;
    });
}

const disabledUITree = computed(() => setData(roleMenuTreeData.value ?? []));
const emit = defineEmits<{
    (e: 'close', flag: boolean): void
}>();

const handleClose = () => {
    emit('close', false);
};

</script>
<template>
    <el-drawer
        v-model="drawerVisible"
        title="角色详情"
        size="50%"
        :before-close="handleClose"
    >
        <el-form :model="dataDetail" label-width="135px">
            <el-form-item label="角色名称" prop="name">
                <Text size="sm" color="regular">{{ dataDetail.name }}</Text>
            </el-form-item>
            <el-form-item v-if="dataDetail.desc" label="描述" prop="desc">
                <Text size="sm" color="regular">{{ dataDetail.desc }}</Text>
            </el-form-item>
            <el-form-item label="创建者" prop="createBy">
                <Text size="sm" color="regular">{{ dataDetail.createBy }}</Text>
            </el-form-item>
            <el-form-item label="创建时间" prop="createdTime">
                <Text size="sm" color="regular">{{ dataDetail.createTime }}</Text>
            </el-form-item>
            <el-form-item label="更新者" prop="updateBy">
                <Text size="sm" color="regular">{{ dataDetail.updateBy }}</Text>
            </el-form-item>
            <el-form-item label="更新时间" prop="updatedTime">
                <Text size="sm" color="regular">{{ dataDetail.updateTime }}</Text>
            </el-form-item>
            <el-form-item label="配置菜单" prop="updatedTime">
                <div style="margin-top: 10px; width: 100%">
                    <el-tree
                        disabled
                        v-if="disabledUITree?.length"
                        ref="menuTree"
                        :data="disabledUITree"
                        show-checkbox
                        node-key="id"
                        :default-checked-keys="dataDetail.menuIdArr"
                        :default-expand-all="true">
                    </el-tree>
                    <div v-else class="empty-tree"></div>
                </div>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<style scoped>
.el-form {
    padding: 0 7%;
}
</style>
