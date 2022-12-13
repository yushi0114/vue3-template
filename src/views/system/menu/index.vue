<template>
    <PagePanel full>
        <Board focus-full v-loading="loading">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="金融端" name="fin">
                    <menu-config v-if="activeName === 'fin'"></menu-config>
                </el-tab-pane>
                <el-tab-pane label="征信端" name="cre">
                    <menu-config v-if="activeName === 'cre'"></menu-config>
                </el-tab-pane>
                <el-tab-pane label="DMS" name="dms">
                    <menu-config v-if="activeName === 'dms'"></menu-config>
                </el-tab-pane>
            </el-tabs>
        </Board>
    </PagePanel>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import MenuConfig from '@/views/system/menu/components/menu-config.vue';
import { activeName, getTreeData, setFormType, loading } from './components/menu-list';
import type { MenuTabType } from '@/types/system-manage';

async function handleClick(tab: TabsPaneContext) {
    setFormType('empty');
    await getTreeData({ tab: tab.paneName as MenuTabType });
}

onMounted(async() => {
    await getTreeData();
    setFormType('empty');
});
</script>

<style scoped lang="scss">
.el-tabs {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    overflow-y: auto;

    &::v-deep(.el-tabs__header) {
        height: 40px;
        min-height: 40px;
        width: 100%;
    }

    &::v-deep(.el-tabs__content) {
        flex: 1;
        width: 100%;
    }
}

.el-tab-pane {
    height: 100%;
}

</style>
