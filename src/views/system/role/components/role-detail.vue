<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RoleListItemType, TreeItemType } from '@/types/system-manage';
import { roleMenuTreeData } from '@/views/system/role/components/role-list';

defineProps({
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
        title="角色信息"
        size="50%"
        :before-close="handleClose"
    >
        <el-form :model="dataDetail" label-width="135px">
            <el-form-item label="角色名称" prop="name">
                <span>{{ dataDetail.name }}</span>
            </el-form-item>
            <el-form-item v-if="dataDetail.desc" label="描述" prop="desc">
                <span>{{ dataDetail.desc }}</span>
            </el-form-item>
            <el-form-item label="创建者" prop="createBy">
                <span>{{ dataDetail.createBy }}</span>
            </el-form-item>
            <el-form-item label="创建时间" prop="createdTime">
                <span>{{ dataDetail.createTime }}</span>
            </el-form-item>
            <el-form-item label="更新者" prop="updateBy">
                <span>{{ dataDetail.updateBy }}</span>
            </el-form-item>
            <el-form-item label="更新时间" prop="updatedTime">
                <span>{{ dataDetail.updateTime }}</span>
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
