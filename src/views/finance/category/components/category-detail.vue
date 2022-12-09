<script lang="ts" setup>
import type { PropType } from 'vue';
import type { FinanceCategoryListItemType } from '@/types/finance';

defineProps({
    drawerVisible: {
        type: Boolean,
        default: false,
    },
    dataDetail: {
        type: Object as PropType<FinanceCategoryListItemType>,
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
            <el-form-item label="分类名称" prop="name">
                <span>{{ dataDetail.name }}</span>
            </el-form-item>
            <el-form-item label="分类编码" prop="code">
                <span>{{ dataDetail.code }}</span>
            </el-form-item>
            <el-form-item v-if="dataDetail.desc" label="分类描述" prop="desc">
                <span>{{ dataDetail.desc }}</span>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <span>{{ dataDetail.sort }}</span>
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
