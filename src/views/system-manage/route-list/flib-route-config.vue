<template>
  <div class="route-container">
    <div class="route-tree" v-if="formType !== 'create'">
      <RouteTree
        :data-source="dataSource"
        @create="handleCreateRoute"
        @operateTreeItem="handleOperateTreeItem($event)"></RouteTree>
    </div>
     <div class="route-content">
       <route-form @save="handleSaveForm($event)" :type="formType" :form="form"></route-form>
     </div>
  </div>
</template>

<script lang="ts" setup>
import RouteTree from './route-tree.vue';
import {ref} from 'vue';
import {routeTree} from '@/views/system-manage/mock/route-tree';
import type {RouteFormType, TreeItemType} from '@/views/system-manage/type/route-list.type';
import RouteForm from '@/views/system-manage/route-list/route-form.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const dataSource = ref<TreeItemType[]>();

const form = ref<RouteFormType>();
const formType = ref<'create' | 'edit'>('edit');
const parentId = ref();
async function getTreeData(): Promise<void> {
    dataSource.value = routeTree;
}

async function getRouteData(id?: string): Promise<void>{
    if (id){
        form.value = {
            name: '123' + Math.random(),
            title: '123',
            path: '12',
            desc: '123',
            sort: 1,
            component: '123',
            status: false
        };
    } else {
        form.value = undefined;
    }
}

async function handleOperateTreeItem(params: {id: string, type: 'edit' | 'remove' | 'create'}) {
    if (params.type === 'edit'){
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
            .then(() => {
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
        parentId.value = params.id;
        form.value = {
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

function handleSaveForm(params: {
  id?: string;
  form: RouteFormType,
  type: 'create' | 'edit'
}){
    if (params.type === 'create'){
        createRoute(params.form);
    }
    if (params.type === 'edit' && params.id){
        editRoute(params.id, params.form);
    }
}

function handleCreateRoute(){
    formType.value = 'create';
    form.value = {
        name: '',
        title: '',
        path: '',
        desc: '',
        sort: 0,
        component: '',
        status: false
    };
}

async function createRoute(routeForm: RouteFormType) {
    console.log(parentId.value);
    // todo
}

async function editRoute(id: string, routeForm: RouteFormType) {
    // todo
}

onMounted(async() => {
    await getTreeData();
    await getRouteData();
});
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
    min-width: 350px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 15px;
    overflow-y: auto;
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
    //flex-flow: column nowrap;
    overflow-y: auto;
  }
}


</style>
