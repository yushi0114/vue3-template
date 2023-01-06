<script lang="ts" setup>
import type { PropType } from 'vue';
import type { UserListItemType } from '@/types/system-manage';

defineProps({
    dataDetail: {
        type: Object as PropType<UserListItemType>,
        default: () => ({})
    }
});

</script>
<template>
    <el-drawer
        title="用户信息"
        size="50%"
    >
        <el-form :model="dataDetail" label-width="135px">
            <el-form-item label="手机号码" prop="account">
                <Text size="sm" color="regular">{{ dataDetail.account }}</Text>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <Text size="sm" color="regular">{{ dataDetail.name }}</Text>
            </el-form-item>
            <el-form-item label="角色" prop="roleName">
                <Text size="sm" color="regular">{{ dataDetail.roleName }}</Text>
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
        </el-form>
    </el-drawer>
</template>

<style scoped>
.el-form {
    padding: 0 7%;
}
</style>
