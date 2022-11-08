<template>
  <div class="route-container">
    <div class="route-tree">
      <route-tree :data-source="dataSource"></route-tree>
    </div>
   <div class="route-content">
     <el-form :model="form" :rules="rules" label-width="120px" ref="ruleFormRef" style="width: 700px;">
       <el-form-item label="菜单名称:" required prop="name">
         <el-input v-model="form.name" placeholder="请输入菜单名称"/>
       </el-form-item>
       <el-form-item label="菜单标题:"  required prop="title">
         <el-input v-model="form.title" placeholder="请输入菜单标题" />
       </el-form-item>
       <el-form-item label="菜单路径:"  required prop="path">
         <el-input v-model="form.path" placeholder="请输入菜单路径" />
       </el-form-item>
       <el-form-item label="菜单描述:"  required prop="desc">
         <el-input v-model="form.desc" placeholder="请输入菜单描述" />
       </el-form-item>
       <el-form-item label="排序字段:"  required prop="sort">
         <el-input v-model.number="form.sort" placeholder="请输入排序字段" />
       </el-form-item>
       <el-form-item label="组件名称:" required prop="component">
         <el-input v-model="form.component" placeholder="请输入菜组件称" />
       </el-form-item>
       <el-form-item label="是否启用:" required prop="status">
         <el-switch v-model="form.status" />
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="submitForm(ruleFormRef)"
         >创建</el-button
         >
         <el-button @click="resetForm(ruleFormRef)">重置</el-button>
       </el-form-item>
     </el-form>
   </div>
  </div>
</template>

<script lang="ts" setup>
import RouteTree from './route-tree.vue';
import {ref, reactive} from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const dataSource = ref<Tree[]>([
    {
        id: 1,
        label: 'Level one 1',
        children: [
            {
                id: 4,
                label: 'Level two 1-1',
                children: [
                    {
                        id: 9,
                        label: 'Level three 1-1-1',
                    },
                    {
                        id: 10,
                        label: 'Level three 1-1-2',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: 'Level one 2',
        children: [
            {
                id: 5,
                label: 'Level two 2-1',
            },
            {
                id: 6,
                label: 'Level two 2-2',
            },
        ],
    },
    {
        id: 3,
        label: 'Level one 3',
        children: [
            {
                id: 7,
                label: 'Level two 3-1',
            },
            {
                id: 8,
                label: 'Level two 3-2',
            },
        ],
    },
]);

const form = reactive({
    name: '',
    title: '',
    path: '',
    desc: '',
    sort: '',
    component: '',
    status: false
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入菜单名称', trigger: 'blur' },
        { min: 3, max: 255, message: '菜单名称不能超过255个字符', trigger: 'blur' },
    ],
    title: [
        { required: true, message: '请输入菜单标题', trigger: 'blur' },
        { min: 3, max: 32, message: '菜单标题不能超过32个字符', trigger: 'blur' },
    ],
    path: [
        { required: true, message: '请输入菜单路径', trigger: 'blur' },
        { min: 3, max: 255, message: '菜单路径不能超过255个字符', trigger: 'blur' },
    ],
    desc: [
        { required: true, message: '请输入菜单描述', trigger: 'blur' },
        { min: 3, max: 255, message: '菜单描述不能超过255个字符', trigger: 'blur' },
    ],
    sort: [
        { required: true, message: '请输入排序字段', trigger: 'blur' },
      { type: 'number', message: '排序字段只能是数字' },
    ],
    component: [
        { required: true, message: '请输入组件名称', trigger: 'blur' },
        { min: 3, max: 255, message: '组件名称不能超过255个字符', trigger: 'blur' },
    ],
});

const submitForm = async(formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!');
        } else {
            console.log('error submit!', fields);
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

// const onSubmit = () => {
//     console.log('submit!');
// };
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
