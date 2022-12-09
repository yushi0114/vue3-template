<template>
    <div class="menu-container">
        <div class="menu-tree" v-if="formType !== 'create'">
            <MenuTree
                :data-source="menuTreeData"
                @operateTreeItem="handleOperateTreeItem($event)"></MenuTree>
        </div>
        <div class="menu-content">
            <el-empty v-if="formType === 'empty'" description="请在左侧选择菜单~"/>
            <MenuForm v-else></MenuForm>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MenuTree from './menu-tree.vue';
import MenuForm from './menu-form.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { formType, goCreateFormView, goEditFormView, goTreeView, menuTreeData, removeMenus } from './menu-list';
import { LoadingService } from '@/views/system/loading-service';

async function handleOperateTreeItem(params: {
    id: string,
    type: 'edit' | 'remove' | 'create',
    willDeleteList?: { id: string }[]
}) {
    if (params.type === 'edit') {
        LoadingService.getInstance().loading();
        await goEditFormView(params.id);
        LoadingService.getInstance().stop();
    } else if (params.type === 'remove') {
        ElMessageBox.confirm(
            '确定要删除当前菜单吗？',
            '警告',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(async () => {
                if (!params?.willDeleteList || !params.willDeleteList.length) {
                    return;
                }
                LoadingService.getInstance().loading();
                await removeMenus(params.willDeleteList.map(item => item.id));
                await goTreeView();
                LoadingService.getInstance().stop();
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消删除',
                });
            });
    } else if (params.type === 'create') {
        goCreateFormView(params.id);
    }
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

        &::-webkit-scrollbar {
            width: 0;
        }

        &:hover {
            &::-webkit-scrollbar {
                width: 8px;
            }
        }
    }

    .menu-content {
        margin-left: 24px;
        padding: 48px 24px 24px;
        height: 100%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        flex: 1;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        overflow-y: auto;
    }
}


</style>
