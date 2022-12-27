<template>
    <div class="menu-container" v-if="mode === 'board'">
        <institution-tree></institution-tree>
        <div class="menu-content" v-if="institutionItemData" v-loading="loading.detailLoading">
            <institution-desc style="margin-bottom: 24px;"></institution-desc>
            <el-tabs
                v-model="activeInstitutionName"
                type="card"
                @tab-click="handleInstitutionTabClick"
                class="list-tab">
                <el-tab-pane label="机构菜单" name="menuList">
                    <institution-menu v-if="activeInstitutionName === 'menuList'"></institution-menu>
                </el-tab-pane>
                <el-tab-pane label="角色列表" name="roleList">
                    <institution-role></institution-role>
                </el-tab-pane>
                <el-tab-pane label="用户列表" name="userList">
                    <institution-user></institution-user>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div v-else class="noDataContainer">
            <el-empty :image="emptyImg" :image-size="483" description="请在左侧选择机构~"/>
        </div>
    </div>
    <div class="menu-container" style="overflow-y: auto" v-if="mode === 'form'">
        <institution-form></institution-form>
    </div>
</template>

<script lang="ts" setup>
import emptyImg from '@/assets/images/institution-tree-empty.png';
import InstitutionMenu from './institution-menu/index.vue';
import InstitutionTree from '@/views/finance/institution/components/institution-tree.vue';
import InstitutionDesc from '@/views/finance/institution/components/institution-desc.vue';
import InstitutionRole from '@/views/finance/institution/components/institution-role/index.vue';
import InstitutionUser from '@/views/finance/institution/components/institution-user/index.vue';
import { activeInstitutionName, changeOrgDetailTabView, institutionItemData, mode, loading } from './finance-institution';
import InstitutionForm from '@/views/finance/institution/components/institution-form.vue';
import type { TabsPaneContext } from 'element-plus';
import type { OrgDetailTabViewType } from '@/types/finance';


async function handleInstitutionTabClick(tab: TabsPaneContext) {
    await changeOrgDetailTabView(tab.paneName as OrgDetailTabViewType);
}
</script>

<style scoped lang="scss">
.menu-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    .menu-content {
        padding-left: 24px;
        height: 100%;
        flex: 1;
        box-sizing: border-box;
        display: flex;
        flex-flow: column nowrap;
        overflow-y: auto;

        .el-tabs {
            flex: 1;
        }

        .list-tab {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-flow: column nowrap;
        }

        .list-tab ::v-deep .el-tabs__header {
            margin: 0;
            border-bottom: none;
            box-sizing: border-box;
        }

        .list-tab ::v-deep .el-tabs__content {
            border: $border;
            box-sizing: border-box;
            border-radius: 0 4px 4px 4px;
        }
    }

    .noDataContainer {
        width: 100%;
        height: 100%;
        flex: 1;
        box-sizing: border-box;
        margin-left: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column nowrap;
        font-size: 14px;
        color: #909399;

        .noData {
            background-size: 100% 100%;
            width: 483px;
            height: 430px;
        }
    }


}

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
