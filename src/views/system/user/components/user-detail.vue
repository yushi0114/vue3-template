<script lang="ts" setup>
import type { PropType } from 'vue';
import type { UserListItemType } from '@/types/system-manage';

defineProps({
    drawerVisible: {
        type: Boolean,
        default: false,
    },
    dataDetail: {
        type: Object as PropType<UserListItemType>,
        default: () => ({})
    }
});

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
        title="机构分类详情"
        size="50%"
        :before-close="handleClose"
    >
        <el-form :model="dataDetail" label-width="135px">
            <el-form-item label="手机号码" prop="account">
                <span>{{ dataDetail.account }}</span>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <span>{{ dataDetail.name }}</span>
            </el-form-item>
            <el-form-item label="角色" prop="roleName">
                <span>{{ dataDetail.roleName }}</span>
            </el-form-item>
            <el-form-item label="启用" prop="status">
                <el-switch
                    v-model="dataDetail.status"
                    :active-value="1"
                    :inactive-value="0"
                    disabled
                ></el-switch>
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
        </el-form>
    </el-drawer>
</template>

<style scoped>
.el-form {
    padding: 0 7%;
}
</style>
