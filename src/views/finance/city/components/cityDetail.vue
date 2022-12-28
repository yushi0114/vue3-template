<script lang="ts" setup>
const props = defineProps({
    drawerVisible: {
        type: Boolean,
        default: false,
    },
    dataDetail: {
        type: Object,
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
        title="城市详情"
        size="50%"
        :before-close="handleClose"
    >
        <el-form :model="dataDetail" label-width="135px">
            <el-form-item label="城市名称" prop="name">
                <Text size="sm" color="regular">{{ dataDetail.name }}</Text>
            </el-form-item>
            <el-form-item label="行政区划代码" prop="code">
                <Text size="sm" color="regular">{{ dataDetail.code }}</Text>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <Text size="sm" color="regular">{{ dataDetail.sort }}</Text>
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
