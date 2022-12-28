<script lang="ts" setup>
import type { PropType } from 'vue';
import type { FinanceCodeListItemType } from '@/types/finance';

const props = defineProps({
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
    (e: 'update:drawerVisible', visible: boolean): void
}>();

const innerModel = computed({
    get: () => props.drawerVisible,
    set: (val) => emit('update:drawerVisible', val)
});

const handleClose = () => {
    emit('close', false);
};

</script>
<template>
    <el-drawer
        v-model="innerModel"
        title="机构编码详情"
        size="50%"
        :before-close="handleClose"
    >
        <el-form :model="dataDetail" label-width="135px">
            <el-form-item label="机构分类" prop="orgTypeName">
                <Text size="sm" color="regular">{{ dataDetail.orgTypeName }}</Text>
            </el-form-item>
            <el-form-item label="所属城市" prop="cityName">
                <Text size="sm" color="regular">{{ dataDetail.cityName }}</Text>
            </el-form-item>
            <el-form-item label="机构名称" prop="orgName">
                <Text size="sm" color="regular">{{ dataDetail.orgName }}</Text>
            </el-form-item>
            <el-form-item label="机构编码" prop="orgCode">
                <Text size="sm" color="regular">{{ dataDetail.orgCode }}</Text>
            </el-form-item>
            <el-form-item label="机构地址" prop="address">
                <Text size="sm" color="regular">{{ dataDetail.address }}</Text>
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
