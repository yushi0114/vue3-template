<template>
    <PagePanel>
        <Board full>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="辽信通" :name="PlatformType.LiaoXinTong">
                </el-tab-pane>
                <el-tab-pane label="市综服" :name="PlatformType.ShiZongFu">
                </el-tab-pane>
            </el-tabs>
            <partner-config v-if="activeName === PlatformType.LiaoXinTong"></partner-config>
            <partner-config v-else-if="activeName === PlatformType.ShiZongFu"></partner-config>
        </Board>
    </PagePanel>
</template>

<script lang="ts" setup>
import { activeName, getPageList, filterObject, mode, resetFilterObject } from './components/partner';
import type { TabsPaneContext } from 'element-plus';
import { onMounted } from 'vue';
import { PlatformType } from '@/enums';
import PartnerConfig from './components/partner-config.vue';

async function handleClick(tab: TabsPaneContext) {
    mode.value = 'list';
    filterObject.value.searchInput = '';
    await getPageList({
        tab: tab.paneName as PlatformType
    });
}

onBeforeMount(() => {
    mode.value = 'list';
    activeName.value = PlatformType.LiaoXinTong;
});

onMounted(async() => {
    await getPageList({
        tab: activeName.value
    });
});
onUnmounted(() => {
    resetFilterObject();
});
</script>

<style scoped lang="scss">
</style>
