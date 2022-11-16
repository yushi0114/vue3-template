<template>
  <div class="menu-container">
    <div class="menu-tree" v-if="formType !== 'create'">
      <MenuTree
        :data-source="dataSource"
        @create="handleCreateMenu"
        @operateTreeItem="handleOperateTreeItem($event)"></MenuTree>
    </div>
     <div class="menu-content">
       <MenuForm
           @goBack="handleGoBack"
           :form-type="formType" ></MenuForm>
     </div>
  </div>
</template>

<script lang="ts" setup>
import MenuTree from './menu-tree.vue';
import MenuForm from './menu-form.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
    dataSource,
    getMenuData,
    menuForm,
    setParentId,
    setCurrentMenuId,
    formType,
    removeMenus
} from './menu-list';

async function handleOperateTreeItem(params: {
  id: string,
  type: 'edit' | 'remove' | 'create',
  willDeleteList?: {id: string}[]
}) {
    if (params.type === 'edit'){
        setCurrentMenuId(params.id);
        await getMenuData(params.id);
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
            .then(async() => {
                if (!params?.willDeleteList || !params.willDeleteList.length) {
                    return;
                }
                await removeMenus(params.willDeleteList.map(item => item.id));
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                });
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消删除',
                });
            });
    } else if (params.type === 'create'){
        formType.value = 'create';
        setParentId(params.id);
        menuForm.value = {
            name: '',
            title: '',
            path: '',
            desc: '',
            sort: 0,
            component: '',
            status: false
        };
    }
}


function handleGoBack(){
    formType.value = 'edit';
    menuForm.value = undefined;
}

function handleCreateMenu(){
    formType.value = 'create';
    menuForm.value = {
        name: '',
        title: '',
        path: '',
        desc: '',
        sort: 0,
        component: '',
        status: false
    };
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
    padding-left: 24px;
    height: 100%;
    flex: 1;
    box-sizing: border-box;
    display: flex;
    overflow-y: auto;
  }
}


</style>
