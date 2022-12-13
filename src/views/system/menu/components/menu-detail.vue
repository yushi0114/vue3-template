<script lang="ts" setup>
import type { PropType } from 'vue';
import type { MenuItemType } from '@/types/system-manage';

defineProps({
    dataDetail: {
        type: Object as PropType<MenuItemType>,
        default: () => ({})
    }
});

</script>
<template>
    <el-form :model="dataDetail" label-width="135px">
        <el-form-item label="菜单名称" prop="name">
            <span>{{ dataDetail.name }}</span>
        </el-form-item>
        <el-form-item label="菜单标题" prop="title">
            <span>{{ dataDetail.title }}</span>
        </el-form-item>
        <el-form-item label="菜单路径" prop="path">
            <span>{{ dataDetail.path }}</span>
        </el-form-item>
        <el-form-item v-if="dataDetail.desc" label="描述" prop="desc">
            <span>{{ dataDetail.desc }}</span>
        </el-form-item>
        <el-form-item label="菜单图标" prop="desc">
            <span>{{ dataDetail.icon }}</span>
        </el-form-item>
        <el-form-item label="菜单排序" prop="sort">
            <span>{{ dataDetail.sort }}</span>
        </el-form-item>
        <el-form-item label="组件名称" prop="component">
            <span>{{ dataDetail.component }}</span>
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
</template>

<style scoped>
.el-form {
    padding: 0 7%;
}
</style>
