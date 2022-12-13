<template>
    <PagePanel>
        <Board full>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="征信端" name="cre">
                    <user-config v-if="activeName === 'cre'"></user-config>
                </el-tab-pane>
                <el-tab-pane label="DMS" name="dms">
                    <user-config v-if="activeName === 'dms'"></user-config>
                </el-tab-pane>
            </el-tabs>
        </Board>
    </PagePanel>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import UserConfig from '@/views/system/user/components/user-config.vue';
import type { TabsPaneContext } from 'element-plus';
import {
    activeName,
    getRoleListData,
    getUserListData,
    mode,
    userFilterObject
} from '@/views/system/user/components/user-list';
import type { UserTabType } from '@/types/system-manage';

async function handleClick(tab: TabsPaneContext) {
    mode.value = 'list';
    userFilterObject.value.searchInput = '';
    await getUserListData({
        tab: tab.paneName as UserTabType
    });
}

onMounted(async() => {
    await getUserListData({
        tab: activeName.value
    });
    await getRoleListData({
        tab: activeName.value
    });
});

onUnmounted(() => {
    mode.value = 'list';
    userFilterObject.value.searchInput = '';
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
