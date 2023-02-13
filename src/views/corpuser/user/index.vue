<script lang="ts" setup>
import { CorpUserTabType } from '@/types/corpUser';
import { activeName, loading, getPageList, resetFilterObject } from '@/views/corpuser/user/components/userTable';
import type { TabsPaneContext } from 'element-plus';
import UserTable from './components/CorpUserTable.vue';

const handleClick = async(tab: TabsPaneContext) => {
    resetFilterObject();
    await getPageList({
        tab: tab.paneName as CorpUserTabType
    });
};

onMounted(async() => {
    resetFilterObject();
    await getPageList({
        tab: activeName.value
    });
});

onUnmounted(() => {
    activeName.value = CorpUserTabType.lxt;
});
</script>

<template>
    <PagePanel>
        <Board full v-loading="loading">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="辽信通" name="lxt"></el-tab-pane>
                <el-tab-pane label="市综服" name="zjfw"></el-tab-pane>
            </el-tabs>
            <UserTable v-if="activeName==='lxt'"></UserTable>
            <UserTable v-if="activeName==='zjfw'"></UserTable>
        </Board>
    </PagePanel>
</template>
