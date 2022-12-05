<template>
    <PageContent :title="'用户管理'">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="DMS" name="dms">
                <user-config v-if="activeName === 'dms'"></user-config>
            </el-tab-pane>
            <el-tab-pane label="征信端" name="cre">
                <user-config v-if="activeName === 'cre'"></user-config>
            </el-tab-pane>
        </el-tabs>
    </PageContent>
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
import { LoadingService } from '@/views/system/loading-service';


async function handleClick(tab: TabsPaneContext) {
    LoadingService.getInstance().loading();
    mode.value = 'list';
    userFilterObject.value.searchInput = '';
    await getUserListData({
        tab: tab.paneName as UserTabType
    });
    LoadingService.getInstance().stop();
}

onMounted(async () => {
    LoadingService.getInstance().loading();
    await getUserListData({
        tab: activeName.value
    });
    await getRoleListData({
        tab: activeName.value
    });
    LoadingService.getInstance().stop();
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
