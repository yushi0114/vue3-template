<template>
  <div class="route-container">
    <div class="route-tree" v-if="formType !== 'create'">
      <RouteTree
        :data-source="dataSource"
        @create="handleCreateRoute"
        @operateTreeItem="handleOperateTreeItem($event)"></RouteTree>
    </div>
     <div class="route-content">
       <RouteForm
           @goBack="handleGoBack"
           :form-type="formType" ></RouteForm>
     </div>
  </div>
</template>

<script lang="ts" setup>
import RouteTree from './route-tree.vue';
import RouteForm from './route-form.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
    dataSource,
    getRouteData,
    routeForm,
    setParentId,
    setCurrentRouteId,
    formType,
    removeRoutes
} from './route-list';

async function handleOperateTreeItem(params: {
  id: string,
  type: 'edit' | 'remove' | 'create',
  willDeleteList?: {id: string}[]
}) {
    if (params.type === 'edit'){
        setCurrentRouteId(params.id);
        await getRouteData(params.id);
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
                await removeRoutes(params.willDeleteList.map(item => item.id));
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
        routeForm.value = {
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
    routeForm.value = undefined;
}

function handleCreateRoute(){
    formType.value = 'create';
    routeForm.value = {
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
.route-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .route-tree {
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

  .route-content {
    padding-left: 24px;
    height: 100%;
    flex: 1;
    box-sizing: border-box;
    display: flex;
    overflow-y: auto;
  }
}


</style>
