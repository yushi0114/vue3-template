<template>
    <PagePanel>
        <Board full>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="征信端" name="cre"></el-tab-pane>
                <el-tab-pane label="DMS" name="dms"></el-tab-pane>
            </el-tabs>
            <user-list-content></user-list-content>
        </Board>
    </PagePanel>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import {
    activeName,
    getRoleListData,
    getUserListData,
    userFilterObject
} from '@/views/system/user/components/user-list';
import type { UserTabType } from '@/types/system-manage';
import UserListContent from '@/views/system/user/components/user-list-content.vue';

async function handleClick(tab: TabsPaneContext) {
    userFilterObject.value.searchInput = '';
    await getUserListData({
        tab: tab.paneName as UserTabType
    });
    await getRoleListData({
        tab: activeName.value
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
    userFilterObject.value.searchInput = '';
});
</script>
