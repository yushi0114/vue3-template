<template>
    <PagePanel>
        <Board full v-loading="loading">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="征信端" name="cre">
                    <role-config v-if="activeName === 'cre'"></role-config>
                </el-tab-pane>
                <el-tab-pane label="DMS" name="dms">
                    <role-config v-if="activeName === 'dms'"></role-config>
                </el-tab-pane>
            </el-tabs>
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

<style lang="scss" scoped>
.el-tabs {
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    background: #ffffff;
    overflow-y: auto;
}

.el-tabs ::v-deep .el-tabs__header {
    height: 40px;
    min-height: 40px;
    width: 100%;
}

.el-tabs ::v-deep .el-tabs__content {
    flex: 1;
    width: 100%;
}

.el-tab-pane {
    height: 100%;
}
</style>
