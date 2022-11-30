<template>
    <div class="menu-container" v-if="mode === 'board'">
        <div class="menu-tree">
            <institution-tree></institution-tree>
        </div>
        <div class="menu-content" v-if="institutionItemData">
            <institution-desc style="margin-bottom: 24px;"></institution-desc>
            <el-tabs
                v-model="activeInstitutionName"
                type="card"
                @tab-click="handleInstitutionTabClick"
                class="list-tab">
                <el-tab-pane label="机构菜单" name="menuList">
                    <institution-menu></institution-menu>
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
            <el-empty description="暂无数据"/>
        </div>
    </div>
    <div class="menu-container" style="overflow-y: auto" v-if="mode === 'form'">
        <institution-form></institution-form>
    </div>
</template>

<script lang="ts" setup>
import InstitutionMenu from './institution-menu/index.vue';
import InstitutionTree from '@/views/finance/institution/components/institution-tree.vue';
import InstitutionDesc from '@/views/finance/institution/components/institution-desc.vue';
import InstitutionRole from '@/views/finance/institution/components/institution-role/index.vue';
import InstitutionUser from '@/views/finance/institution/components/institution-user/index.vue';
import { activeInstitutionName, institutionItemData, mode } from './finance-institution';
import InstitutionForm from '@/views/finance/institution/components/institution-form.vue';

function handleInstitutionTabClick() {

}
</script>

<style scoped lang="scss">
.menu-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    .menu-tree {
        width: 350px;
        height: 100%;
        overflow-y: auto;
        min-width: 350px;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 15px;
    }

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
            border: 1px solid #ebeef5;
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
</style>
