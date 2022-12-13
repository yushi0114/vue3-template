<template>
    <PagePanel>
        <Board full v-loading="loading">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="征信端" name="cre"></el-tab-pane>
                <el-tab-pane label="DMS" name="dms"></el-tab-pane>
            </el-tabs>
            <role-config></role-config>
        </Board>
    </PagePanel>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import RoleConfig from '@/views/system/role/components/role-config.vue';
import type { TabsPaneContext } from 'element-plus';
import type { RoleTabType } from '@/types/system-manage';
import {
    activeName,
    getRolePageList,
    mode,
    resetRoleFilterObject,
    roleFilterObject,
    loading
} from '@/views/system/role/components/role-list';

const handleClick = async(tab: TabsPaneContext) => {
    mode.value = 'list';
    resetRoleFilterObject();
    await getRolePageList({
        tab: tab.paneName as RoleTabType
    });
};

onMounted(async() => {
    mode.value = 'list';
    roleFilterObject.value.currentSize = 10;
    roleFilterObject.value.currentPage = 0;
    await getRolePageList({
        tab: activeName.value
    });
});

onUnmounted(() => {
    mode.value = 'list';
    resetRoleFilterObject();
});
</script>
