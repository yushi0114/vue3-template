<script lang="ts" setup>
import type { PropType } from 'vue';
import type { FinanceCodeListItemType } from '@/types/finance';

defineProps({
    drawerVisible: {
        type: Boolean,
        default: false,
    },
    dataDetail: {
        type: Object as PropType<FinanceCodeListItemType>,
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
        title="机构编码详情"
        size="50%"
        :before-close="handleClose"
    >
        <el-form :model="dataDetail" label-width="135px">
            <el-form-item label="机构分类" prop="orgTypeName">
                <span>{{ dataDetail.orgTypeName }}</span>
            </el-form-item>
            <el-form-item label="所属城市" prop="cityName">
                <span>{{ dataDetail.cityName }}</span>
            </el-form-item>
            <el-form-item label="机构名称" prop="orgName">
                <span>{{ dataDetail.orgName }}</span>
            </el-form-item>
            <el-form-item label="机构编码" prop="orgCode">
                <span>{{ dataDetail.orgCode }}</span>
            </el-form-item>
            <el-form-item label="机构地址" prop="address">
                <span>{{ dataDetail.address }}</span>
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
