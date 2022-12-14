<template>
    <div class="menu-container">
        <div class="menu-tree" v-if="formType !== 'create'">
            <MenuTree ref="menuTreeRef"></MenuTree>
        </div>
        <div
            :class="[{'menu-content': formType !== 'create', 'menu-create-content': formType === 'create'}, 'form-content']">
            <div class="empty-box" v-if="formType === 'empty'">
                <el-empty :image="emptyImg" :image-size="483" description="请在左侧选择菜单~"/>
            </div>
            <menu-detail v-else-if="formType === 'detail'" :data-detail="menuDetailData"></menu-detail>
            <MenuForm @editToDetail="handleEditToDetail" v-else></MenuForm>
        </div>
    </div>
</template>

<script lang="ts" setup>
import emptyImg from '@/assets/images/no-data.png';
import MenuTree from './menu-tree.vue';
import MenuForm from './menu-form.vue';
import { currentMenuId, formType, goDetailFormView, menuDetailData } from './menu-list';
import MenuDetail from '@/views/system/menu/components/menu-detail.vue';

const menuTreeRef = ref();

async function handleEditToDetail() {
    menuDetailData.value = await goDetailFormView(currentMenuId.value);
    await nextTick(() => {
        menuTreeRef.value.treeRef.setCurrentKey(currentMenuId.value);
    });
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
        padding: 24px 24px 24px;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        flex: 1;
    }

    .menu-create-content {
        margin-left: 24px;
        padding: 24px 24px 24px;
        flex: 1;
        justify-content: center !important;
    }

    .empty-box {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .form-content {
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
}


</style>
